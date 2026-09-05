import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";

export const metadata: Metadata = {
  title: "Octrooigegevens",
  description:
    "De gegevens van het Nederlandse octrooi NL4000008 — Method and System for self-checkout at a point of sale — zoals geregistreerd bij het octrooibureau.",
};

export default async function OctrooiPage() {
  const inhoud = await getInhoud();
  const { octrooi } = inhoud;

  const gegevens = [
    { label: "Octrooinummer", waarde: inhoud.algemeen.octrooiNummer },
    { label: "Soort", waarde: octrooi.soort },
    { label: "Status", waarde: octrooi.status },
    { label: "Titel", waarde: `“${inhoud.algemeen.patentTitel}”` },
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

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-navy-950 px-6 py-4">
              <FileCheck2 className="h-5 w-5 text-blue-300" aria-hidden="true" />
              <p className="text-sm font-bold tracking-wider text-white uppercase">
                Registergegevens
              </p>
            </div>
            <dl className="divide-y divide-slate-100">
              {gegevens.map((rij) => (
                <div
                  key={rij.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-slate-500">
                    {rij.label}
                  </dt>
                  <dd className="text-sm font-medium text-slate-900">
                    {rij.waarde}
                  </dd>
                </div>
              ))}
              <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-slate-500">
                  Omschrijving
                </dt>
                <dd className="text-sm leading-6 text-slate-700">
                  {inhoud.patent.patentTekst}
                </dd>
              </div>
            </dl>
          </div>
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
                href="/patent"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Patent &amp; samenwerking
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
