import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Droplets, Beef, Euro } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Anti-liquid RFID-tag: stand van de techniek",
  description:
    "Samenvatting van de huidige stand van de techniek rond source-tagging van natte en vloeibare producten en vleeswaren, met verwijzingen naar bronnen.",
};

/* Bronnen uit de bijlage, in volgorde van eerste vermelding */
const BRONNEN = [
  { url: "https://www.rfidlabel.com/on-liquid-rfid-labels-liquid-interference/", label: "RFID Label — On-liquid RFID labels & liquid interference" },
  { url: "https://checkpointsystems.com/nl/blog/source-tagging-made-easy-with-checkpoint/", label: "Checkpoint Systems — Source tagging made easy" },
  { url: "https://checkpointsystems.com/rfid-solutions/bottleid/", label: "Checkpoint Systems — BottleID" },
  { url: "https://www.eaminc.com/blog/what-is-source-tagging/", label: "EAM — What is source tagging?" },
  { url: "https://checkpointsystems.com/nl/security-labels-tagging/source-tagging/", label: "Checkpoint Systems — Source tagging (NL)" },
  { url: "https://www.bloovi.be/artikels/insights/2017/hoe-rfid-technologie-winkeldiefstal-en-voedselverspilling-tegengaat", label: "Bloovi — Hoe RFID-technologie winkeldiefstal en voedselverspilling tegengaat" },
  { url: "https://www.foodpersonality.nl/nieuws/nieuws/17887/lidl-werkt-met-beveiligingsstickers-op-diefstalgevoelige-prod", label: "FoodPersonality — Lidl werkt met beveiligingsstickers op diefstalgevoelige producten" },
  { url: "https://www.talkingretail.com/news/industry-news/rfid-tags-target-meat-theives-24-03-2005/", label: "Talking Retail — RFID tags target meat thieves" },
  { url: "https://www.coveris.com/en-gb/news/coveris-extends-sourcetag-security-technology-to-carton-packaging-to-tackle-rising-retail-theft", label: "Coveris — SourceTag security technology for carton packaging" },
  { url: "http://www.labelsandlabeling.com/news/interactive-technology/coveris-extends-sourcetag-security-technology-carton-packaging", label: "Labels & Labeling — Coveris extends SourceTag to carton packaging" },
  { url: "https://checkpointsystems.com/security-labels-tagging/food-labels/", label: "Checkpoint Systems — Food labels" },
  { url: "https://checkpointsystems.com/industry-solutions/food-beverage-solutions/", label: "Checkpoint Systems — Food & beverage solutions" },
  { url: "https://www.dipolerfid.com/en/meat-sector-rfid", label: "Dipole RFID — RFID in the meat sector" },
  { url: "https://checkpointsystems.com/nl/oplossingen-voor-de-voedingsmiddelen-en-drankenindustrie/", label: "Checkpoint Systems — Oplossingen voor de voedingsmiddelen- en drankenindustrie" },
  { url: "https://checkpointsystems.com/security-labels-tagging/source-tagging/", label: "Checkpoint Systems — Source tagging" },
  { url: "https://www.ad.nl/binnenland/albert-heijn-experimenteert-met-beveiligd-vlees-tegen-diefstal-afschrikkend-effect~a0bf783d/", label: "AD — Albert Heijn experimenteert met beveiligd vlees tegen diefstal" },
  { url: "https://cpcongroup.com/insights/article/cost-of-rfid-tags-vs-barcodes/", label: "CPCON Group — Cost of RFID tags vs barcodes" },
];

/* Superscript-verwijzingen naar de bronnenlijst */
function Refs({ nrs }: { nrs: number[] }) {
  return (
    <sup className="ml-0.5 whitespace-nowrap">
      {nrs.map((nr, i) => (
        <span key={nr}>
          {i > 0 && ", "}
          <a
            href={`#bron-${nr}`}
            className="font-semibold text-blue-700 hover:text-blue-800"
            aria-label={`Bron ${nr}`}
          >
            [{nr}]
          </a>
        </span>
      ))}
    </sup>
  );
}

export default function AntiLiquidPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          Bijlage
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
          Anti-liquid RFID-tag: de stand van de techniek
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Samenvatting van de huidige stand van de techniek rond source-tagging
          van natte en vloeibare producten, met verwijzingen naar de bronnen
          onderaan deze pagina.
        </p>

        {/* Vloeibare en natte producten */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Droplets className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
              Het source-tagprobleem voor vloeibare en natte producten is
              inmiddels grotendeels opgelost
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Traditionele beveiligingsstickers (EAS) en RFID-tags hadden altijd
              grote moeite met vloeistoffen en metalen verpakkingen, omdat water
              radiogolven absorbeert en het signaal blokkeert. Door
              technologische innovaties en specifieke productontwikkelingen is
              dit probleem nu effectief getackeld:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { tekst: "Speciale ‘On-Liquid’ en ‘Anti-Liquid’ RFID-tags", nrs: [1] },
                { tekst: "Geoptimaliseerde plaatsing en flag-tags", nrs: [2] },
                { tekst: "Specifieke sectoroplossingen (zoals BottleID)", nrs: [3] },
                { tekst: "Combinatie van EAS en RFID", nrs: [4] },
              ].map((punt) => (
                <li key={punt.tekst} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>
                    {punt.tekst}
                    <Refs nrs={punt.nrs} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Hierdoor kunnen supermarkten, drogisterijen en distributiecentra
              natte producten nu direct vanuit de fabriek (‘shelf-ready’)
              ontvangen zonder dat winkelpersoneel handmatig stickers hoeft te
              plakken.
              <Refs nrs={[5]} />
            </p>
          </div>
        </Reveal>

        {/* Vleeswaren */}
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Beef className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
              Ook voor vleeswaren is het source-tagprobleem inmiddels succesvol
              opgelost
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Vers vlees en voorverpakte vleeswaren behoren in supermarkten tot
              de meest diefstalgevoelige productgroepen. Omdat vlees een zeer
              hoog vocht- en vetgehalte heeft en vaak in gemetalliseerde
              beschermende folies (MAP-verpakkingen) wordt verpakt, bleven
              traditionele beveiligingsstickers hier lang onbetrouwbaar.
              <Refs nrs={[6, 7]} />
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Grote verpakkingsproducenten en retailbeveiligers hebben dit
              opgelost met de volgende technieken:
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { tekst: "Integratie in de kartonnen sleeve of folie (Coveris & Checkpoint)", nrs: [8, 9, 10] },
                { tekst: "Magnetron- en voedselveilige RF-labels", nrs: [11] },
                { tekst: "Speciale RFID-oplossingen voor versketens (RFreshID)", nrs: [12, 13, 14, 6] },
              ].map((punt) => (
                <li key={punt.tekst} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>
                    {punt.tekst}
                    <Refs nrs={punt.nrs} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Grote supermarktketens zoals Albert Heijn en Lidl rollen momenteel
              op grote schaal (zichtbare en onzichtbare) diefstalbeveiliging uit
              op luxe vleeswaren, biefstukken en kipfilets. Dankzij brontagging
              hoeft het winkelpersoneel deze stickers niet meer zelf handmatig
              te plakken; de producten komen volledig ‘shelf-ready’ aan vanuit
              het distributiecentrum.
              <Refs nrs={[15, 16, 2, 7]} />
            </p>
          </div>
        </Reveal>

        {/* Kosten */}
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Euro className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
              Op productniveau valt de prijs erg mee
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Onder de streep levert het de retailsector juist een flinke
              kostenbesparing op. De investering is verdeeld in de directe
              kosten per tag en de totale besparingen in de keten (de Return on
              Investment). Hoewel een verpakking met een ingebouwde tag een
              fractie van een cent duurder is om te produceren dan een
              verpakking zonder tag, levert brontagging grote financiële
              voordelen op.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Voor een supermarkt ligt de terugverdientijd (break-even point)
              van een dergelijk geïntegreerd systeem doorgaans tussen de 12 en
              24 maanden.
              <Refs nrs={[17]} />
            </p>
          </div>
        </Reveal>

        {/* Bronnen */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-extrabold text-slate-950">Bronnen</h2>
          <ol className="mt-4 space-y-2">
            {BRONNEN.map((bron, i) => (
              <li
                key={bron.url}
                id={`bron-${i + 1}`}
                className="flex gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="shrink-0 font-semibold text-slate-400">
                  [{i + 1}]
                </span>
                <a
                  href={bron.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-words text-blue-700 hover:text-blue-800 hover:underline"
                >
                  {bron.label}
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-12">
          <Link
            href="/markt"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Terug naar Markt &amp; innovatie
          </Link>
        </div>
      </div>
    </section>
  );
}
