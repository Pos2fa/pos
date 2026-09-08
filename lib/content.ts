import { promises as fs } from "fs";
import path from "path";
import { standaardInhoud, type Inhoud } from "@/content/defaults";
import { standaardInhoudEN } from "@/content/defaults-en";
import type { Taal } from "@/lib/i18n";

/**
 * Opslag van tekstwijzigingen uit de beheeromgeving, per taal.
 *
 * - Op Vercel: Upstash Redis via de REST-API (koppel "Upstash for Redis" in
 *   het Vercel-dashboard; de env-variabelen worden dan automatisch gezet).
 * - Lokaal / eigen server: de bestanden data/content.json (NL) en
 *   data/content-en.json (EN).
 *
 * Opgeslagen waarden worden veld-voor-veld over de standaardteksten gelegd,
 * zodat nieuwe velden in de code altijd een geldige standaardwaarde houden.
 */

const KV_URL =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const KV_SLEUTELS: Record<Taal, string> = {
  nl: "pos2fa:inhoud",
  en: "pos2fa:inhoud:en",
};
const LOKALE_BESTANDEN: Record<Taal, string> = {
  nl: path.join(process.cwd(), "data", "content.json"),
  en: path.join(process.cwd(), "data", "content-en.json"),
};

export function kvGeconfigureerd(): boolean {
  return Boolean(KV_URL && KV_TOKEN);
}

/** De onbewerkte standaardteksten voor de gegeven taal. */
export function standaardVoor(taal: Taal): Inhoud {
  return taal === "en" ? standaardInhoudEN : standaardInhoud;
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

async function leesOpgeslagen(taal: Taal): Promise<unknown | null> {
  if (kvGeconfigureerd()) {
    const antwoord = await fetch(`${KV_URL}/get/${KV_SLEUTELS[taal]}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!antwoord.ok) return null;
    const data = (await antwoord.json()) as { result: string | null };
    return data.result ? JSON.parse(data.result) : null;
  }
  try {
    return JSON.parse(await fs.readFile(LOKALE_BESTANDEN[taal], "utf8"));
  } catch {
    return null;
  }
}

/** De actuele websiteteksten: standaardteksten + opgeslagen wijzigingen. */
export async function getInhoud(taal: Taal = "nl"): Promise<Inhoud> {
  const standaard = standaardVoor(taal);
  try {
    const opgeslagen = await leesOpgeslagen(taal);
    if (opgeslagen) return vervlecht(standaard, opgeslagen);
  } catch {
    // Bij een opslagstoring tonen we de standaardteksten.
  }
  return standaard;
}

/** Slaat de volledige inhoud op (alleen aan te roepen na sessiecontrole). */
export async function bewaarInhoud(
  inhoud: Inhoud,
  taal: Taal = "nl",
): Promise<void> {
  const json = JSON.stringify(inhoud);
  if (kvGeconfigureerd()) {
    const antwoord = await fetch(`${KV_URL}/set/${KV_SLEUTELS[taal]}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      body: json,
    });
    if (!antwoord.ok) {
      throw new Error(`Opslaan in Redis mislukt (${antwoord.status})`);
    }
    return;
  }
  const bestand = LOKALE_BESTANDEN[taal];
  await fs.mkdir(path.dirname(bestand), { recursive: true });
  await fs.writeFile(bestand, JSON.stringify(inhoud, null, 2), "utf8");
}
