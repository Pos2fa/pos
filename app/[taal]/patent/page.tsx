import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  FileCheck2,
  FileText,
  Globe2,
  Handshake,
  Lightbulb,
  Recycle,
  ShieldCheck,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";
import { isTaal, pad } from "@/lib/i18n";

const KENMERK_ICONEN = [ShieldCheck, Users, Recycle];

const UI = {
  nl: {
    metaTitel: "Patent & samenwerking",
    metaBeschrijving:
      "Het patent 'Method and System for self-checkout at a point of sale' is geen eindpunt, maar het begin: POS-2FA-Intermediary zoekt een strategische koper of licentiepartner voor wereldwijde implementatie.",
    kicker: "Patent & samenwerking",
    contact: "Neem contact op",
    naarHome: "Home",
    octrooiKnop: "Octrooigegevens",
  },
  en: {
    metaTitel: "Patent & partnership",
    metaBeschrijving:
      "The patent 'Method and System for self-checkout at a point of sale' is not an end point but the beginning: POS-2FA-Intermediary is looking for a strategic buyer or licensing partner for worldwide implementation.",
    kicker: "Patent & partnership",
    contact: "Contact us",
    naarHome: "Home",
    octrooiKnop: "Patent details",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/patent">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function PatentPage({ params }: PageProps<"/[taal]/patent">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const inhoud = await getInhoud(taal);
  const { patent } = inhoud;
  const ui = UI[taal];

  return (
    <>
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              {ui.kicker}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
              {patent.introTitel}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {patent.introTekst}
            </p>
          </div>
        </div>
      </section>

      {/* ── Patent kaart ─────────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="patent-titel">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-8 text-white shadow-xl sm:p-10">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <FileCheck2 className="h-7 w-7 text-blue-300" aria-hidden="true" />
                </span>
                <p className="mt-6 text-sm font-semibold tracking-wider text-blue-300 uppercase">
                  {patent.patentLabel}
                </p>
                <h2
                  id="patent-titel"
                  className="mt-2 text-2xl font-extrabold sm:text-3xl"
                >
                  &ldquo;{inhoud.algemeen.patentTitel}&rdquo;
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                  {patent.patentTekst}
                </p>
                <ul className="mt-7 flex flex-wrap justify-center gap-3">
                  {patent.kenmerken.map((kenmerk, i) => {
                    const Icoon = KENMERK_ICONEN[i % KENMERK_ICONEN.length];
                    return (
                      <li
                        key={kenmerk}
                        className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium"
                      >
                        <Icoon className="h-5 w-5 shrink-0 text-blue-300" aria-hidden="true" />
                        {kenmerk}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Lightbulb className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {patent.partnerTitel}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {patent.partnerTekst}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-white p-4">
                    <Globe2 className="h-6 w-6 shrink-0 text-blue-700" aria-hidden="true" />
                    <p className="text-sm leading-6 text-slate-700">
                      {patent.wereldwijdNoot}
                    </p>
                  </div>
                  <Link
                    href={pad(taal, "/octrooi")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    {ui.octrooiKnop}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Samenwerking CTA ─────────────────────────────────── */}
      <section className="bg-slate-50" aria-labelledby="samenwerking-titel">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
              <Handshake className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2
              id="samenwerking-titel"
              className="mt-6 text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {patent.ctaTitel}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {patent.ctaTekst}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={pad(taal, "/contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
              >
                {ui.contact}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={pad(taal, "/")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-100"
              >
                {ui.naarHome}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
