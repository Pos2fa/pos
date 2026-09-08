import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, FileCheck2, FileText, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";
import { isTaal, pad } from "@/lib/i18n";

const PDF_PAD = "/documents/WO-2026-182615-A1-tekst-en-tekeningen.pdf";

/**
 * Letterlijke gegevens van het voorblad van de internationale publicatie
 * WO 2026/182615 A1 (WIPO). De downloadbare PDF bevat de beschrijving,
 * conclusies en figuren (zonder voorblad en nieuwheidsonderzoeksrapport).
 */
const UI = {
  nl: {
    metaTitel: "Octrooigegevens",
    metaBeschrijving:
      "De gegevens van het Nederlandse octrooi NL4000008 en de internationale PCT-publicatie WO 2026/182615 A1 — Method and System for self-checkout at a point of sale.",
    register: "Gegevens van de Nederlandse publicatie",
    nummer: "Octrooinummer",
    soort: "Soort",
    status: "Status",
    titel: "Titel",
    omschrijving: "Omschrijving",
    pctTitel: "Gegevens van de internationale publicatie (PCT)",
    pctGegevens: [
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
        label: "Gepubliceerd",
        waarde: "met internationaal nieuwheidsonderzoeksrapport (Art. 21(3))",
      },
    ],
    downloaden: "Download de publicatie: tekst en tekeningen (PDF, 1,3 MB)",
    naarPatent: "Patent & samenwerking",
  },
  en: {
    metaTitel: "Patent details",
    metaBeschrijving:
      "The details of Dutch patent NL4000008 and the international PCT publication WO 2026/182615 A1 — Method and System for self-checkout at a point of sale.",
    register: "Details of the Dutch publication",
    nummer: "Patent number",
    soort: "Type",
    status: "Status",
    titel: "Title",
    omschrijving: "Description",
    pctTitel: "Details of the international publication (PCT)",
    pctGegevens: [
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
        label: "Published",
        waarde: "with international search report (Art. 21(3))",
      },
    ],
    downloaden: "Download the publication: text and drawings (PDF, 1.3 MB)",
    naarPatent: "Patent & partnership",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/octrooi">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function OctrooiPage({
  params,
}: PageProps<"/[taal]/octrooi">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const inhoud = await getInhoud(taal);
  const { octrooi } = inhoud;
  const ui = UI[taal];

  const gegevens = [
    { label: ui.nummer, waarde: inhoud.algemeen.octrooiNummer },
    { label: ui.soort, waarde: octrooi.soort },
    { label: ui.status, waarde: octrooi.status },
    { label: ui.titel, waarde: `“${inhoud.algemeen.patentTitel}”` },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-24">
        <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          {octrooi.introTitel}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
          {inhoud.algemeen.octrooiNummer}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {octrooi.introTekst}
        </p>

        {/* Registergegevens van het Nederlandse octrooi */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-navy-950 px-6 py-4">
              <FileCheck2 className="h-5 w-5 text-blue-300" aria-hidden="true" />
              <p className="text-sm font-bold tracking-wider text-white uppercase">
                {ui.register}
              </p>
            </div>
            <dl className="divide-y divide-slate-100">
              {gegevens.map((rij) => (
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
              <div className="grid gap-1 px-6 py-4 sm:grid-cols-[260px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-slate-500">
                  {ui.omschrijving}
                </dt>
                <dd className="text-sm leading-6 text-slate-700">
                  {inhoud.patent.patentTekst}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {/* Direct daarna: de gegevens van de internationale PCT-publicatie */}
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-navy-950 px-6 py-4">
              <FileText className="h-5 w-5 text-blue-300" aria-hidden="true" />
              <p className="text-sm font-bold tracking-wider text-white uppercase">
                {ui.pctTitel}
              </p>
            </div>
            <dl className="divide-y divide-slate-100">
              {ui.pctGegevens.map((rij) => (
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

        {/* Direct downloaden: beschrijving, conclusies en figuren */}
        <Reveal className="mt-8">
          <a
            href={PDF_PAD}
            download="WO-2026-182615-A1-tekst-en-tekeningen.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {ui.downloaden}
          </a>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Handshake className="h-6 w-6 shrink-0 text-blue-700" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-700">
                {inhoud.patent.partnerTekst}
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href={pad(taal, "/patent")}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {ui.naarPatent}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
