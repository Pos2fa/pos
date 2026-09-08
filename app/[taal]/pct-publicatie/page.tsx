import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileText } from "lucide-react";
import Reveal from "@/components/Reveal";
import { isTaal, pad } from "@/lib/i18n";

const PDF_PAD = "/documents/WO-2026-182615-A1.pdf";

/**
 * Letterlijke gegevens van het voorblad van de internationale publicatie
 * WO 2026/182615 A1 (WIPO). De volledige, ongewijzigde publicatie staat als
 * PDF op de pagina; hier worden geen teksten geherformuleerd.
 */
const ABSTRACT =
  "A method and a self-checkout POS (1) for self-checking out in a retail store. The method comprises a twofold article authentication check at the point of sale. The self-checkout POS comprises a walking area (16), an article processing part (10), a security gate (20), an RFID detector (30), a barcode scanner (40, 42), and a payment system (44). The RFID detector (30) is arranged to detect a presence of articles (52) in a section of the walking area (16) before the security gate (20), each of the articles (52) comprising an RFID tag that is detectable by the RFID detector (30). The barcode scanner (40, 42) is arranged to scan the articles (52), each comprising a barcode that is scannable by the barcode scanner (40, 42). The payment system (44) settles payment of the scanned articles (52) only if the RFID detector does not detect the presence of an article (52) in the section of the walking area (16) before the security gate (20).";

const UI = {
  nl: {
    metaTitel: "PCT-publicatie WO 2026/182615 A1",
    metaBeschrijving:
      "De internationale octrooiaanvraag 'Method and System for self-checkout at a point of sale', gepubliceerd onder het Patent Cooperation Treaty (PCT) als WO 2026/182615 A1 — met de volledige officiële publicatie als PDF.",
    kicker: "Bijlage",
    titel: "PCT-publicatie WO 2026/182615 A1",
    intro:
      "De internationale octrooiaanvraag is onder het Patent Cooperation Treaty (PCT) gepubliceerd door de World Intellectual Property Organization (WIPO). Hieronder staan de gegevens van het officiële voorblad; de volledige, letterlijke publicatie is als PDF te lezen en te downloaden.",
    gegevensTitel: "Gegevens van de internationale publicatie",
    gegevens: [
      { label: "Internationaal publicatienummer", waarde: "WO 2026/182615 A1" },
      {
        label: "Internationale publicatiedatum",
        waarde: "3 september 2026 (03.09.2026)",
      },
      { label: "Internationaal aanvraagnummer", waarde: "PCT/NL2026/050039" },
      {
        label: "Internationale indieningsdatum",
        waarde: "10 februari 2026 (10.02.2026)",
      },
      {
        label: "Prioriteitsgegevens",
        waarde: "4000008 — 25 februari 2025 (25.02.2025) — NL",
      },
      { label: "Indienings- en publicatietaal", waarde: "Engels" },
      {
        label: "Internationale octrooiclassificatie",
        waarde: "G06Q 20/20 (2012.01), G07G 1/00 (2006.01)",
      },
      {
        label: "Titel",
        waarde: "“Method and System for self-checkout at a point of sale”",
      },
      {
        label: "Gepubliceerd",
        waarde: "met internationaal nieuwheidsonderzoeksrapport (Art. 21(3))",
      },
    ],
    abstractTitel: "Abstract (57) — letterlijke tekst van het voorblad",
    abstractNoot:
      "De officiële publicatie is in het Engels; onderstaande samenvatting is woordelijk overgenomen van het voorblad.",
    documentTitel: "De volledige publicatie",
    documentTekst:
      "Hieronder staat de volledige, ongewijzigde publicatie zoals uitgegeven door de WIPO — inclusief beschrijving, conclusies, figuren en het internationale nieuwheidsonderzoeksrapport.",
    downloaden: "Download de publicatie (PDF, 1,5 MB)",
    pdfFallback:
      "Uw browser kan de PDF niet insluiten. Gebruik de downloadknop hierboven om de publicatie te openen.",
    terug: "Terug naar Patent & samenwerking",
  },
  en: {
    metaTitel: "PCT publication WO 2026/182615 A1",
    metaBeschrijving:
      "The international patent application 'Method and System for self-checkout at a point of sale', published under the Patent Cooperation Treaty (PCT) as WO 2026/182615 A1 — with the full official publication as PDF.",
    kicker: "Appendix",
    titel: "PCT publication WO 2026/182615 A1",
    intro:
      "The international patent application has been published under the Patent Cooperation Treaty (PCT) by the World Intellectual Property Organization (WIPO). Below are the details of the official front page; the complete, literal publication can be read and downloaded as PDF.",
    gegevensTitel: "Details of the international publication",
    gegevens: [
      { label: "International publication number", waarde: "WO 2026/182615 A1" },
      {
        label: "International publication date",
        waarde: "03 September 2026 (03.09.2026)",
      },
      { label: "International application number", waarde: "PCT/NL2026/050039" },
      {
        label: "International filing date",
        waarde: "10 February 2026 (10.02.2026)",
      },
      {
        label: "Priority data",
        waarde: "4000008 — 25 February 2025 (25.02.2025) — NL",
      },
      { label: "Filing and publication language", waarde: "English" },
      {
        label: "International patent classification",
        waarde: "G06Q 20/20 (2012.01), G07G 1/00 (2006.01)",
      },
      {
        label: "Title",
        waarde: "“Method and System for self-checkout at a point of sale”",
      },
      {
        label: "Published",
        waarde: "with international search report (Art. 21(3))",
      },
    ],
    abstractTitel: "Abstract (57) — literal text from the front page",
    abstractNoot:
      "The abstract below is reproduced verbatim from the front page of the official publication.",
    documentTitel: "The full publication",
    documentTekst:
      "Below is the complete, unaltered publication as issued by WIPO — including the description, claims, figures and the international search report.",
    downloaden: "Download the publication (PDF, 1.5 MB)",
    pdfFallback:
      "Your browser cannot embed the PDF. Use the download button above to open the publication.",
    terug: "Back to Patent & partnership",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/pct-publicatie">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function PctPublicatiePage({
  params,
}: PageProps<"/[taal]/pct-publicatie">) {
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
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {ui.intro}
        </p>

        {/* Voorbladgegevens */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-navy-950 px-6 py-4">
              <FileText className="h-5 w-5 text-blue-300" aria-hidden="true" />
              <p className="text-sm font-bold tracking-wider text-white uppercase">
                {ui.gegevensTitel}
              </p>
            </div>
            <dl className="divide-y divide-slate-100">
              {ui.gegevens.map((rij) => (
                <div
                  key={rij.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[260px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-slate-500">
                    {rij.label}
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {rij.waarde}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* Abstract, woordelijk */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <h2 className="text-xl font-extrabold text-slate-950">
              {ui.abstractTitel}
            </h2>
            <p className="mt-2 text-xs text-slate-500">{ui.abstractNoot}</p>
            <p className="mt-4 text-sm leading-7 text-slate-700" lang="en">
              {ABSTRACT}
            </p>
          </div>
        </Reveal>

        {/* Volledige publicatie */}
        <Reveal className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-950">
            {ui.documentTitel}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {ui.documentTekst}
          </p>
          <a
            href={PDF_PAD}
            download="WO-2026-182615-A1.pdf"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {ui.downloaden}
          </a>
          <object
            data={PDF_PAD}
            type="application/pdf"
            aria-label={ui.titel}
            className="mt-6 h-[75vh] w-full rounded-2xl border border-slate-200 shadow-sm"
          >
            <p className="p-6 text-sm leading-6 text-slate-600">
              {ui.pdfFallback}
            </p>
          </object>
        </Reveal>

        <div className="mt-12">
          <Link
            href={pad(taal, "/patent")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {ui.terug}
          </Link>
        </div>
      </div>
    </section>
  );
}
