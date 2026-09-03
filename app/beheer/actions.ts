"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { standaardInhoud, type Inhoud } from "@/content/defaults";
import { bewaarInhoud, getInhoud } from "@/lib/content";
import {
  SESSIE_COOKIE,
  beheerGeconfigureerd,
  isIngelogd,
  maakSessieToken,
  wachtwoordCorrect,
} from "@/lib/auth";

const PAGINAS = ["/", "/technologie", "/markt", "/patent", "/contact"];

export async function inloggen(formData: FormData): Promise<void> {
  const invoer = formData.get("wachtwoord");
  if (!beheerGeconfigureerd()) {
    redirect("/beheer?fout=configuratie");
  }
  if (typeof invoer !== "string" || !wachtwoordCorrect(invoer)) {
    // Kleine vertraging remt geautomatiseerd gokken af.
    await new Promise((klaar) => setTimeout(klaar, 800));
    redirect("/beheer?fout=wachtwoord");
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
  redirect("/beheer");
}

export async function uitloggen(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSIE_COOKIE);
  redirect("/beheer");
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
  if (!(await isIngelogd())) {
    redirect("/beheer?fout=sessie");
  }
  const huidig = await getInhoud();
  const nieuw = bouwUitFormulier(huidig, formData, "") as Inhoud;

  try {
    await bewaarInhoud(nieuw);
  } catch {
    redirect("/beheer?fout=opslag");
  }

  for (const pagina of PAGINAS) {
    revalidatePath(pagina);
  }
  revalidatePath("/beheer");
  redirect("/beheer?opgeslagen=1");
}

/** Zet alle teksten terug naar de originele documentteksten. */
export async function herstelStandaard(): Promise<void> {
  if (!(await isIngelogd())) {
    redirect("/beheer?fout=sessie");
  }
  try {
    await bewaarInhoud(standaardInhoud);
  } catch {
    redirect("/beheer?fout=opslag");
  }
  for (const pagina of PAGINAS) {
    revalidatePath(pagina);
  }
  revalidatePath("/beheer");
  redirect("/beheer?opgeslagen=1");
}
