import { promises as fs } from "fs";
import path from "path";
import { standaardInhoud, type Inhoud } from "@/content/defaults";

/**
 * Opslag van tekstwijzigingen uit de beheeromgeving.
 *
 * - Op Vercel: Upstash Redis via de REST-API (koppel "Upstash for Redis" in
 *   het Vercel-dashboard; de env-variabelen worden dan automatisch gezet).
 * - Lokaal / eigen server: het bestand data/content.json.
 *
 * Opgeslagen waarden worden veld-voor-veld over de standaardteksten gelegd,
 * zodat nieuwe velden in de code altijd een geldige standaardwaarde houden.
 */

const KV_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const KV_SLEUTEL = "pos2fa:inhoud";
const LOKAAL_BESTAND = path.join(process.cwd(), "data", "content.json");

export function kvGeconfigureerd(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

type OnbekendeStructuur = { [k: string]: unknown } | unknown[] | string;

/** Legt opgeslagen strings over de standaardstructuur; negeert onbekende sleutels/typen. */
function vervlecht<T extends OnbekendeStructuur>(basis: T, override: unknown): T {
  if (typeof basis === "string") {
    return (typeof override === "string" ? override : basis) as T;
  }
  if (Array.isArray(basis)) {
    if (!Array.isArray(override)) return basis;
    return basis.map((item, i) =>
      vervlecht(item as OnbekendeStructuur, override[i]),
    ) as T;
  }
  if (typeof override !== "object" || override === null || Array.isArray(override)) {
    return basis;
  }
  const resultaat: Record<string, unknown> = {};
  for (const [sleutel, waarde] of Object.entries(basis)) {
    resultaat[sleutel] = vervlecht(
      waarde as OnbekendeStructuur,
      (override as Record<string, unknown>)[sleutel],
    );
  }
  return resultaat as T;
}

async function leesOpgeslagen(): Promise<unknown | null> {
  if (kvGeconfigureerd()) {
    const antwoord = await fetch(`${KV_URL}/get/${KV_SLEUTEL}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!antwoord.ok) return null;
    const data = (await antwoord.json()) as { result: string | null };
    return data.result ? JSON.parse(data.result) : null;
  }
  try {
    return JSON.parse(await fs.readFile(LOKAAL_BESTAND, "utf8"));
  } catch {
    return null;
  }
}

/** De actuele websiteteksten: standaardteksten + opgeslagen wijzigingen. */
export async function getInhoud(): Promise<Inhoud> {
  try {
    const opgeslagen = await leesOpgeslagen();
    if (opgeslagen) return vervlecht(standaardInhoud, opgeslagen);
  } catch {
    // Bij een opslagstoring tonen we de standaardteksten.
  }
  return standaardInhoud;
}

/** Slaat de volledige inhoud op (alleen aan te roepen na sessiecontrole). */
export async function bewaarInhoud(inhoud: Inhoud): Promise<void> {
  const json = JSON.stringify(inhoud);
  if (kvGeconfigureerd()) {
    const antwoord = await fetch(`${KV_URL}/set/${KV_SLEUTEL}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: json,
    });
    if (!antwoord.ok) {
      throw new Error(`Opslaan in Redis mislukt (${antwoord.status})`);
    }
    return;
  }
  await fs.mkdir(path.dirname(LOKAAL_BESTAND), { recursive: true });
  await fs.writeFile(LOKAAL_BESTAND, JSON.stringify(inhoud, null, 2), "utf8");
}
