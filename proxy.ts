import { NextResponse, type NextRequest } from "next/server";
import type { Taal } from "@/lib/i18n";

/**
 * Taalrouting:
 * - Paden zonder voorvoegsel zijn Nederlands (canoniek) en worden intern
 *   herschreven naar /nl/... (de app-structuur onder app/[taal]/).
 * - /en/... is Engels en wordt ongewijzigd doorgelaten.
 * - /nl/... wordt zichtbaar teruggestuurd naar het kale pad, zodat er maar
 *   één Nederlandse URL bestaat.
 * - Alleen bij een eerste bezoek (nog geen taal-cookie) kijken we naar de
 *   Accept-Language-header van de browser: wie Engels boven Nederlands
 *   verkiest, wordt eenmalig naar /en gestuurd. Daarna is de bezochte URL
 *   leidend en onthoudt de cookie de laatste keuze.
 */

const COOKIE_NAAM = "taal";
const COOKIE_MAX_LEEFTIJD = 60 * 60 * 24 * 365; // één jaar

function metTaalCookie(antwoord: NextResponse, taal: Taal): NextResponse {
  antwoord.cookies.set(COOKIE_NAAM, taal, {
    path: "/",
    maxAge: COOKIE_MAX_LEEFTIJD,
    sameSite: "lax",
  });
  return antwoord;
}

/** Kiest nl of en op basis van de Accept-Language-header (hoogste q wint). */
function detecteerTaal(header: string | null): Taal | null {
  if (!header) return null;
  const voorkeuren = header
    .split(",")
    .map((deel) => {
      const [tag, ...parameters] = deel.trim().split(";");
      let q = 1;
      for (const parameter of parameters) {
        const match = parameter.trim().match(/^q=(\d(?:\.\d+)?)$/);
        if (match) q = parseFloat(match[1]);
      }
      return { basis: tag.trim().toLowerCase().split("-")[0], q };
    })
    .sort((a, b) => b.q - a.q);
  for (const { basis } of voorkeuren) {
    if (basis === "nl") return "nl";
    if (basis === "en") return "en";
  }
  return null;
}

export function proxy(verzoek: NextRequest): NextResponse {
  const { pathname } = verzoek.nextUrl;

  // /nl/... zichtbaar terug naar het kale (canonieke) pad.
  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    const url = verzoek.nextUrl.clone();
    url.pathname = pathname.slice("/nl".length) || "/";
    return metTaalCookie(NextResponse.redirect(url), "nl");
  }

  // /en/... ongewijzigd doorlaten; keuze onthouden.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return metTaalCookie(NextResponse.next(), "en");
  }

  // Kaal pad: bij een allereerste bezoek de browsertaal volgen.
  const cookieTaal = verzoek.cookies.get(COOKIE_NAAM)?.value;
  if (!cookieTaal) {
    const voorkeur = detecteerTaal(verzoek.headers.get("accept-language"));
    if (voorkeur === "en") {
      const url = verzoek.nextUrl.clone();
      url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
      return metTaalCookie(NextResponse.redirect(url), "en");
    }
  }

  // Nederlands: intern herschrijven naar de app-structuur onder /nl.
  const url = verzoek.nextUrl.clone();
  url.pathname = pathname === "/" ? "/nl" : `/nl${pathname}`;
  return metTaalCookie(NextResponse.rewrite(url), "nl");
}

export const config = {
  // Alles behalve interne Next-paden, Vercel-meetpaden (Analytics/Speed
  // Insights) en bestanden met een extensie (afbeeldingen, sitemap.xml,
  // robots.txt, favicon enzovoort).
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
