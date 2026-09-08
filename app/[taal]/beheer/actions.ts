"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { Inhoud } from "@/content/defaults";
import { bewaarInhoud, getInhoud, standaardVoor } from "@/lib/content";
import { isTaal, pad, type Taal } from "@/lib/i18n";
import {
  SESSIE_COOKIE,
  beheerGeconfigureerd,
  isIngelogd,
  maakSessieToken,
  wachtwoordCorrect,
} from "@/lib/auth";

/** Leest de taal van het beheerformulier (verborgen veld). */
function taalUitFormulier(formData: FormData): Taal {
  const waarde = formData.get("taal");
  return typeof waarde === "string" && isTaal(waarde) ? waarde : "nl";
}

export async function inloggen(formData: FormData): Promise<void> {
  const taal = taalUitFormulier(formData);
  const invoer = formData.get("wachtwoord");
  if (!beheerGeconfigureerd()) {
    redirect(pad(taal, "/beheer?fout=configuratie"));
  }
  if (typeof invoer !== "string" || !wachtwoordCorrect(invoer)) {
    // Kleine vertraging remt geautomatiseerd gokken af.
    await new Promise((klaar) => setTimeout(klaar, 800));
    redirect(pad(taal, "/beheer?fout=wachtwoord"));
  }
  const { token, maxAgeSeconden } = maakSessieToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSIE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconden,
  });
  redirect(pad(taal, "/beheer"));
}

export async function uitloggen(formData: FormData): Promise<void> {
  const taal = taalUitFormulier(formData);
  const cookieStore = await cookies();
  cookieStore.delete(SESSIE_COOKIE);
  redirect(pad(taal, "/beheer"));
}

/**
 * Bouwt de nieuwe inhoud op uit het formulier. Alleen paden die in de
 * standaardstructuur bestaan worden overgenomen (whitelist); ontbrekende of
 * niet-string-waarden vallen terug op de huidige inhoud.
 */
function bouwUitFormulier(
  huidig: unknown,
  formData: FormData,
  pad: string,
): unknown {
  if (typeof huidig === "string") {
    const waarde = formData.get(pad);
    if (typeof waarde === "string") {
      return waarde.replace(/\r\n/g, "\n").trim() || huidig;
    }
    return huidig;
  }
  if (Array.isArray(huidig)) {
    return huidig.map((item, i) =>
      bouwUitFormulier(item, formData, `${pad}.${i}`),
    );
  }
  if (typeof huidig === "object" && huidig !== null) {
    const resultaat: Record<string, unknown> = {};
    for (const [sleutel, waarde] of Object.entries(huidig)) {
      resultaat[sleutel] = bouwUitFormulier(
        waarde,
        formData,
        pad ? `${pad}.${sleutel}` : sleutel,
      );
    }
    return resultaat;
  }
  return huidig;
}

export async function bewaarTeksten(formData: FormData): Promise<void> {
  const taal = taalUitFormulier(formData);
  if (!(await isIngelogd())) {
    redirect(pad(taal, "/beheer?fout=sessie"));
  }
  const huidig = await getInhoud(taal);
  const nieuw = bouwUitFormulier(huidig, formData, "") as Inhoud;

  try {
    await bewaarInhoud(nieuw, taal);
  } catch {
    redirect(pad(taal, "/beheer?fout=opslag"));
  }

  // Wist de cache van alle pagina's in beide talen.
  revalidatePath("/", "layout");
  redirect(pad(taal, "/beheer?opgeslagen=1"));
}

/** Zet alle teksten terug naar de originele documentteksten. */
export async function herstelStandaard(formData: FormData): Promise<void> {
  const taal = taalUitFormulier(formData);
  if (!(await isIngelogd())) {
    redirect(pad(taal, "/beheer?fout=sessie"));
  }
  try {
    await bewaarInhoud(standaardVoor(taal), taal);
  } catch {
    redirect(pad(taal, "/beheer?fout=opslag"));
  }
  revalidatePath("/", "layout");
  redirect(pad(taal, "/beheer?opgeslagen=1"));
}
