import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Eenvoudige, veilige eigenaar-login voor de beheeromgeving:
 * - Het wachtwoord staat in de omgevingsvariabele ADMIN_PASSWORD (nooit in de code).
 * - Na inloggen krijgt de browser een HMAC-gesigneerde, httpOnly sessiecookie.
 * - De signeersleutel wordt afgeleid van het wachtwoord: wachtwoord wijzigen
 *   maakt alle bestaande sessies direct ongeldig.
 */

export const SESSIE_COOKIE = "pos2fa_beheer";
const SESSIE_DUUR_MS = 7 * 24 * 60 * 60 * 1000; // 7 dagen

function wachtwoord(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export function beheerGeconfigureerd(): boolean {
  return Boolean(wachtwoord());
}

function signeerSleutel(): Buffer {
  return createHash("sha256")
    .update(`pos2fa-sessiesleutel:${wachtwoord()}`)
    .digest();
}

export function wachtwoordCorrect(invoer: string): boolean {
  const w = wachtwoord();
  if (!w) return false;
  const a = createHash("sha256").update(invoer).digest();
  const b = createHash("sha256").update(w).digest();
  return timingSafeEqual(a, b);
}

export function maakSessieToken(): { token: string; maxAgeSeconden: number } {
  const vervalt = Date.now() + SESSIE_DUUR_MS;
  const handtekening = createHmac("sha256", signeerSleutel())
    .update(String(vervalt))
    .digest("base64url");
  return {
    token: `${vervalt}.${handtekening}`,
    maxAgeSeconden: SESSIE_DUUR_MS / 1000,
  };
}

function sessieGeldig(token: string | undefined): boolean {
  if (!token || !beheerGeconfigureerd()) return false;
  const [vervaltTekst, handtekening] = token.split(".");
  const vervalt = Number(vervaltTekst);
  if (!Number.isFinite(vervalt) || vervalt < Date.now()) return false;
  const verwacht = createHmac("sha256", signeerSleutel())
    .update(vervaltTekst)
    .digest("base64url");
  const a = Buffer.from(handtekening ?? "", "utf8");
  const b = Buffer.from(verwacht, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isIngelogd(): Promise<boolean> {
  const cookieStore = await cookies();
  return sessieGeldig(cookieStore.get(SESSIE_COOKIE)?.value);
}
