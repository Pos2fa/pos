import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Languages,
  LogOut,
  RotateCcw,
  Save,
} from "lucide-react";
import { getInhoud, kvGeconfigureerd } from "@/lib/content";
import { beheerGeconfigureerd, isIngelogd } from "@/lib/auth";
import { isTaal, pad as taalPad, type Taal } from "@/lib/i18n";
import { bewaarTeksten, herstelStandaard, inloggen, uitloggen } from "./actions";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false },
};

/* ── Labels ───────────────────────────────────────────────── */

const SECTIE_LABELS: Record<string, string> = {
  algemeen: "Algemeen (footer & contactgegevens)",
  home: "Homepagina",
  technologie: "De technologie",
  markt: "Markt & innovatie",
  patent: "Patent & samenwerking",
  octrooi: "Octrooigegevens",
  contact: "Contactpagina",
};

const VELD_LABELS: Record<string, string> = {
  titel: "Titel",
  tekst: "Tekst",
  waarde: "Waarde",
  periode: "Periode",
  intro: "Introductie",
  punten: "Punten",
  footerTagline: "Footer-ondertitel",
  contactEmail: "Contact-e-mailadres",
  patentTitel: "Patenttitel",
  heroBadge: "Hero-badge",
  heroTitel: "Hero-titel",
  heroTekst: "Hero-tekst",
  statistieken: "Cijfers (donkere balk)",
  probleemTitel: "Probleem — titel",
  probleemTekst: "Probleem — inleiding",
  probleemKaarten: "Probleem — kaarten",
  oplossingTitel: "Oplossing — titel",
  oplossingTekst: "Oplossing — inleiding",
  stappen: "Stappen",
  kassiereNoot: "Notitie over de kassière",
  voordelenTitel: "Voordelen — titel",
  voordelen: "Voordelen — kaarten",
  ctaTitel: "Afsluitende oproep — titel",
  ctaTekst: "Afsluitende oproep — tekst",
  introTitel: "Introductie — titel",
  introTekst: "Introductie — tekst",
  introTekst1: "Introductie — eerste alinea",
  introTekst2: "Introductie — tweede alinea",
  stappenTitel: "Stappen — titel",
  verschilTitel: "Fundamentele verschil — titel",
  verschilTekst: "Fundamentele verschil — inleiding",
  huidigeKassaPunten: "Huidige zelfscankassa — punten",
  cpsKassaPunten: "CPS-zelfscankassa — punten",
  systeemTitel: "Systeem in beeld — titel",
  systeemTekst: "Systeem in beeld — inleiding",
  situatieBijschriften: "Bijschriften onder de tekening (per situatie)",
  situaties: "De vier situaties",
  stappenplannen: "Stappenplannen (aparte pagina)",
  alineas: "Stappen",
  octrooiNummer: "Octrooinummer",
  soort: "Soort",
  status: "Status",
  statiegeldTitel: "Statiegeld — titel",
  statiegeldTekst: "Statiegeld — inleiding",
  statiegeldPunten: "Statiegeld — punten",
  tijdlijn: "Tijdlijn",
  nederlandTitel: "Nederland — titel",
  nederlandTekst: "Nederland — tekst",
  inleverpuntTitel: "Inleverpunt-kaart — titel",
  inleverpuntTekst: "Inleverpunt-kaart — tekst",
  wereldwijdTitel: "Wereldwijd — titel",
  wereldwijdTekst: "Wereldwijd — tekst",
  kaarten: "Kaarten",
  patentLabel: "Label boven de patenttitel",
  patentTekst: "Patentomschrijving",
  kenmerken: "Kenmerken (drie chips)",
  partnerTitel: "Partnerkaart — titel",
  partnerTekst: "Partnerkaart — tekst",
  wereldwijdNoot: "Notitie wereldwijde implementatie",
  mailTitel: "E-mailkaart — titel",
  mailTekst: "E-mailkaart — tekst",
  patentKaartTitel: "Patentkaart — titel",
  patentKaartTekst: "Patentkaart — tekst",
  partnersTitel: "Partnerskaart — titel",
  partnersTekst: "Partnerskaart — tekst",
};

function label(sleutel: string): string {
  if (VELD_LABELS[sleutel]) return VELD_LABELS[sleutel];
  const woorden = sleutel.replace(/([A-Z])/g, " $1").toLowerCase();
  return woorden.charAt(0).toUpperCase() + woorden.slice(1);
}

/* ── Recursieve veldweergave ──────────────────────────────── */

function TekstVeld({ pad, waarde }: { pad: string; waarde: string }) {
  const lang = waarde.length > 70 || waarde.includes("\n");
  const rijen = Math.min(8, Math.max(2, Math.ceil(waarde.length / 90)));
  const klasse =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500";
  return lang ? (
    <textarea id={pad} name={pad} rows={rijen} defaultValue={waarde} className={klasse} />
  ) : (
    <input id={pad} name={pad} type="text" defaultValue={waarde} className={klasse} />
  );
}

function Velden({ pad, waarde }: { pad: string; waarde: unknown }) {
  if (typeof waarde === "string") {
    const naam = pad.split(".").pop() ?? pad;
    return (
      <div>
        <label htmlFor={pad} className="text-xs font-semibold text-slate-600">
          {/^\d+$/.test(naam) ? `${Number(naam) + 1}.` : label(naam)}
        </label>
        <TekstVeld pad={pad} waarde={waarde} />
      </div>
    );
  }
  if (Array.isArray(waarde)) {
    return (
      <div className="space-y-4">
        {waarde.map((item, i) => (
          <div
            key={`${pad}.${i}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="mb-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
              {i + 1}
            </p>
            <div className="space-y-3">
              <Velden pad={`${pad}.${i}`} waarde={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (typeof waarde === "object" && waarde !== null) {
    return (
      <div className="space-y-4">
        {Object.entries(waarde).map(([sleutel, kind]) => {
          const kindPad = pad ? `${pad}.${sleutel}` : sleutel;
          if (typeof kind === "string") {
            return <Velden key={kindPad} pad={kindPad} waarde={kind} />;
          }
          return (
            <div key={kindPad}>
              <p className="mb-2 text-sm font-bold text-slate-800">
                {label(sleutel)}
              </p>
              <Velden pad={kindPad} waarde={kind} />
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

/* ── Taaltabs ─────────────────────────────────────────────── */

function TaalTabs({ taal }: { taal: Taal }) {
  const tabs: { taal: Taal; label: string }[] = [
    { taal: "nl", label: "Nederlandse teksten" },
    { taal: "en", label: "Engelse teksten (English)" },
  ];
  return (
    <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
      <Languages className="ml-2 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
      {tabs.map((tab) => (
        <Link
          key={tab.taal}
          href={taalPad(tab.taal, "/beheer")}
          aria-current={tab.taal === taal ? "page" : undefined}
          className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold transition-colors ${
            tab.taal === taal
              ? "bg-blue-700 text-white shadow-sm"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

/* ── Inlogscherm ──────────────────────────────────────────── */

function InlogScherm({ taal, fout }: { taal: Taal; fout?: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10">
        <span className="inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-navy-950 text-white">
          <KeyRound className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          Beheer — inloggen
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Log in met het beheerwachtwoord om de teksten van de website aan te
          passen.
        </p>

        {fout === "wachtwoord" && (
          <p
            role="alert"
            className="mt-4 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Onjuist wachtwoord. Probeer het opnieuw.
          </p>
        )}
        {fout === "sessie" && (
          <p
            role="alert"
            className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Uw sessie is verlopen. Log opnieuw in.
          </p>
        )}
        {!beheerGeconfigureerd() && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-6 text-amber-800"
          >
            Het beheer is nog niet geconfigureerd: stel de omgevingsvariabele{" "}
            <code className="font-mono text-xs">ADMIN_PASSWORD</code> in (lokaal
            in <code className="font-mono text-xs">.env.local</code>, op Vercel
            via Project → Settings → Environment Variables).
          </p>
        )}

        <form action={inloggen} className="mt-6">
          <input type="hidden" name="taal" value={taal} />
          <label
            htmlFor="wachtwoord"
            className="text-sm font-semibold text-slate-800"
          >
            Wachtwoord
          </label>
          <input
            id="wachtwoord"
            name="wachtwoord"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-5 w-full cursor-pointer rounded-xl bg-blue-700 px-5 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
          >
            Inloggen
          </button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">
        <Link
          href={taalPad(taal, "/")}
          className="font-medium text-blue-700 hover:text-blue-800"
        >
          ← Terug naar de website
        </Link>
      </p>
    </div>
  );
}

/* ── Beheerpagina ─────────────────────────────────────────── */

export default async function BeheerPagina({
  params,
  searchParams,
}: PageProps<"/[taal]/beheer">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const zoekParams = await searchParams;
  const fout = typeof zoekParams.fout === "string" ? zoekParams.fout : undefined;

  if (!(await isIngelogd())) {
    return <InlogScherm taal={taal} fout={fout} />;
  }

  const inhoud = await getInhoud(taal);
  const opgeslagen = zoekParams.opgeslagen === "1";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-950">
            Teksten beheren
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Pas de teksten aan en klik onderaan op &lsquo;Wijzigingen
            opslaan&rsquo; — ze staan daarna direct op de website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={taalPad(taal, "/")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Bekijk website
          </Link>
          <form action={uitloggen}>
            <input type="hidden" name="taal" value={taal} />
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Uitloggen
            </button>
          </form>
        </div>
      </div>

      <TaalTabs taal={taal} />
      <p className="mt-3 text-xs leading-5 text-slate-500">
        U bewerkt nu de{" "}
        <strong>{taal === "nl" ? "Nederlandse" : "Engelse"}</strong> teksten.
        Wissel hierboven van taal om de andere versie aan te passen.
      </p>

      {opgeslagen && (
        <p
          role="status"
          className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          Opgeslagen — de wijzigingen staan nu op de website.
        </p>
      )}
      {fout === "opslag" && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800"
        >
          Opslaan is mislukt. Op Vercel is een gekoppelde opslag nodig: voeg via
          het Vercel-dashboard de integratie &lsquo;Upstash for Redis&rsquo; toe
          (Storage → Create Database) en deploy opnieuw.
        </p>
      )}
      {!kvGeconfigureerd() && (
        <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
          Opslag: lokaal bestand (
          <code className="font-mono">
            {taal === "nl" ? "data/content.json" : "data/content-en.json"}
          </code>
          ). Voor de live site op Vercel: koppel eenmalig &lsquo;Upstash for
          Redis&rsquo; via het Vercel-dashboard, dan werkt het opslaan daar ook.
        </p>
      )}

      <form action={bewaarTeksten} className="mt-8">
        <input type="hidden" name="taal" value={taal} />
        <div className="space-y-4">
          {Object.entries(inhoud).map(([sectie, waarde], i) => (
            <details
              key={sectie}
              open={i === 0}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <summary className="cursor-pointer list-none rounded-2xl px-6 py-4 text-base font-bold text-slate-900 select-none hover:bg-slate-50 group-open:border-b group-open:border-slate-100">
                {SECTIE_LABELS[sectie] ?? label(sectie)}
              </summary>
              <div className="space-y-5 px-6 py-5">
                <Velden pad={sectie} waarde={waarde} />
              </div>
            </details>
          ))}
        </div>

        <div className="sticky bottom-0 mt-6 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              formAction={herstelStandaard}
              formNoValidate
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Herstel originele teksten
            </button>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              Wijzigingen opslaan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
