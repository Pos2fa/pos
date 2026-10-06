import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { isTaal, pad } from "@/lib/i18n";

/**
 * Bijlage bij de probleemkaart "Terugtrekkende politie" op de homepage:
 * het WODC-nieuwsbericht van 21 april 2026 over het onderzoek "Buiten
 * beeld", aangeleverd door de eigenaar. De bronverwijzingen zijn op zijn
 * aanwijzing hernummerd naar 1 t/m 5; de URL's komen uit zijn document
 * (de aanbiednota-link is ontdaan van het persoonlijke inlogtoken).
 */
const BRON_URLS = [
  "https://repository.wodc.nl/server/api/core/bitstreams/a63ea3fd-8d58-461c-8f6a-f58e08b23fef/content",
  "https://www.rijksoverheid.nl/documenten/2026/04/21/tkaanbiedingenbeleidsreactiewodconderzoeknaaraardomvangenmodioperandivanwinkeldiefstal",
  "https://www.wodc.nl/documenten/2026/04/21/buiten-beeld-de-aard-omvang-en-modi-operandi-van-winkeldiefstal-en-de-weerbaarheid-van-de-nederlandse-detailhandel",
  "https://bureaubeke.nl/publicaties/buiten-beeld-winkeldiefstal-in-nederland/",
  "https://www.ipsos-publiek.nl/actueel/veel-winkeldiefstal-blijft-buiten-beeld-maatwerk-nodig/",
] as const;

const UI = {
  nl: {
    metaTitel: "Geen pasklare oplossing voor winkeldiefstal",
    metaBeschrijving:
      "WODC-nieuwsbericht (21 april 2026) over het onderzoek 'Buiten beeld': het jaarlijkse aantal winkeldiefstallen ligt vele malen hoger dan de geregistreerde 40.000 — en er is niet één pasklare oplossing.",
    kicker: "Bijlage",
    titel: "Geen pasklare oplossing voor winkeldiefstal",
    bronregel: "WODC – Kennisinstituut voor de rechtstaat · Nieuwsbericht 21-04-2026 | 08:00",
    alinea1:
      "Het jaarlijks aantal gepleegde winkeldiefstallen is niet nauwkeurig vast te stellen; in 2024 ligt het volgens een indicatieve schatting tussen de bijna 650.000 en ruim 1.000.000. Dat is veel meer dan de 40.000 winkeldiefstallen die jaarlijks door de politie worden geregistreerd. Als winkeldieven worden betrapt, volgt er in de meeste gevallen geen aangifte. Volgens zowel winkeliers als experts werkt het begroeten of aanspreken van klanten het best om winkeldiefstal te voorkomen. Maar er zijn meer preventieve maatregelen, bijvoorbeeld op het gebied van technologie met AI, of door meer training van winkelpersoneel. Ook het beter registreren van dieven met een winkelverbod en het centraal organiseren van de aangifte van winkeldiefstal kunnen helpen. Er is echter niet één pasklare oplossing voor winkeldiefstal. Wat effectief is, hangt af van het type winkel én het type winkeldief.",
    alinea2Voor: "Bij dit rapport schreef het WODC deze aanbiednota.",
    alinea2Refs: [1],
    alinea3:
      "Minister Van Weel (Justitie en Veiligheid) stuurde op 21 april 2026 de Kamerbrief met beleidsreactie over het WODC-onderzoek ‘Buiten beeld’ naar de voorzitter van de Tweede Kamer.",
    alinea3Refs: [2, 3],
    kernpuntenTitel: "Kernpunten van het onderzoek en de brief",
    kernpunten: [
      {
        tekst:
          "Een aanzienlijk deel van de winkeldiefstal blijft onzichtbaar en wordt niet geregistreerd in de officiële politiecijfers.",
        refs: [4],
      },
      {
        tekst:
          "Het onderzoek (uitgevoerd door Ipsos I&O en Bureau Beke) laat zien dat er sprake is van zowel opportunistische diefstal als meer georganiseerde modi operandi.",
        refs: [5],
      },
      {
        tekst:
          "De overheid en detailhandel moeten inzetten op gerichte weerbaarheid en een betere samenwerking om heterdaadkracht en aangiftebereidheid te vergroten.",
        refs: [],
      },
    ],
    bronnenTitel: "Bronnen",
    bronnen: [
      "Aanbiednota (WODC)",
      "Kamerbrief met beleidsreactie (minister van Justitie en Veiligheid, 21 april 2026)",
      "Download rapport ‘Buiten beeld’",
      "Modi operandi van winkeldiefstal",
      "Maatwerk",
    ],
    bronAria: (nr: number) => `Bron ${nr}`,
    terug: "Terug naar de homepagina",
  },
  en: {
    metaTitel: "No one-size-fits-all solution to shoplifting",
    metaBeschrijving:
      "WODC news item (21 April 2026) on the study 'Buiten beeld' ('Out of sight'): the annual number of shoplifting cases is many times higher than the 40,000 registered by the police — and there is no single ready-made solution.",
    kicker: "Appendix",
    titel: "No one-size-fits-all solution to shoplifting",
    bronregel:
      "WODC – Research institute for the rule of law (Netherlands) · News item 21-04-2026 | 08:00",
    alinea1:
      "The annual number of shoplifting offences cannot be established precisely; for 2024 an indicative estimate puts it between almost 650,000 and over 1,000,000. That is far more than the 40,000 shoplifting cases registered by the police each year. When shoplifters are caught, in most cases no report is filed. According to both retailers and experts, greeting or addressing customers works best to prevent shoplifting. But there are more preventive measures, for example in the field of technology with AI, or through more training of store staff. Better registration of thieves with a store ban and centrally organising the reporting of shoplifting can also help. There is, however, no single ready-made solution to shoplifting. What is effective depends on the type of store and the type of shoplifter.",
    alinea2Voor:
      "The WODC wrote an accompanying memorandum (aanbiednota) with this report.",
    alinea2Refs: [1],
    alinea3:
      "On 21 April 2026, Minister Van Weel (Justice and Security) sent the parliamentary letter with the policy response to the WODC study ‘Buiten beeld’ (‘Out of sight’) to the President of the House of Representatives.",
    alinea3Refs: [2, 3],
    kernpuntenTitel: "Key points of the study and the letter",
    kernpunten: [
      {
        tekst:
          "A considerable share of shoplifting remains invisible and is not registered in the official police figures.",
        refs: [4],
      },
      {
        tekst:
          "The study (carried out by Ipsos I&O and Bureau Beke) shows that there is both opportunistic theft and more organised modi operandi.",
        refs: [5],
      },
      {
        tekst:
          "Government and retail must focus on targeted resilience and better cooperation to increase in-the-act enforcement and the willingness to report.",
        refs: [],
      },
    ],
    bronnenTitel: "Sources (in Dutch)",
    bronnen: [
      "Aanbiednota (WODC accompanying memorandum)",
      "Kamerbrief — parliamentary letter with policy response (Minister of Justice and Security, 21 April 2026)",
      "Download of the report ‘Buiten beeld’ (‘Out of sight’)",
      "Modi operandi van winkeldiefstal (modi operandi of shoplifting)",
      "Maatwerk (tailored approach)",
    ],
    bronAria: (nr: number) => `Source ${nr}`,
    terug: "Back to the homepage",
  },
} as const;

type UIStrings = (typeof UI)[keyof typeof UI];

/* Superscript-verwijzingen naar de bronnenlijst, zoals op de anti-liquid-pagina */
function Refs({ nrs, ui }: { nrs: readonly number[]; ui: UIStrings }) {
  if (nrs.length === 0) return null;
  return (
    <sup className="ml-0.5 whitespace-nowrap">
      {nrs.map((nr, i) => (
        <span key={nr}>
          {i > 0 && ", "}
          <a
            href={`#bron-${nr}`}
            className="font-semibold text-blue-700 hover:text-blue-800"
            aria-label={ui.bronAria(nr)}
          >
            [{nr}]
          </a>
        </span>
      ))}
    </sup>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/winkeldiefstal-onderzoek">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function WinkeldiefstalOnderzoekPage({
  params,
}: PageProps<"/[taal]/winkeldiefstal-onderzoek">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const ui = UI[taal];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          {ui.kicker}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
          {ui.titel}
        </h1>
        <p className="mt-4 text-sm font-medium text-slate-500">{ui.bronregel}</p>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <p className="text-base leading-7 text-slate-700">{ui.alinea1}</p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {ui.alinea2Voor}
              <Refs nrs={ui.alinea2Refs} ui={ui} />
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {ui.alinea3}
              <Refs nrs={ui.alinea3Refs} ui={ui} />
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
            <h2 className="text-2xl font-extrabold text-slate-950">
              {ui.kernpuntenTitel}
            </h2>
            <ul className="mt-5 space-y-3">
              {ui.kernpunten.map((punt) => (
                <li
                  key={punt.tekst.slice(0, 40)}
                  className="flex gap-3 text-base leading-7 text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                  />
                  <span>
                    {punt.tekst}
                    <Refs nrs={punt.refs} ui={ui} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Bronnen, genummerd 1 t/m 5 */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-extrabold text-slate-950">
            {ui.bronnenTitel}
          </h2>
          <ol className="mt-4 space-y-2">
            {ui.bronnen.map((bron, i) => (
              <li
                key={bron}
                id={`bron-${i + 1}`}
                className="flex gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="shrink-0 font-semibold text-slate-400">
                  {i + 1})
                </span>
                <a
                  href={BRON_URLS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-blue-700 hover:text-blue-800 hover:underline"
                >
                  {bron}
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12">
          <Link
            href={pad(taal, "/")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {ui.terug}
          </Link>
        </div>
      </div>
    </section>
  );
}
