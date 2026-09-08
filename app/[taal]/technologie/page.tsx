import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Radio,
  ScanLine,
  ShieldCheck,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SituationTabs from "@/components/SituationTabs";
import SystemDiagram from "@/components/SystemDiagram";
import { getInhoud } from "@/lib/content";
import { isTaal, pad } from "@/lib/i18n";

const STAP_ICONEN = [Radio, ScanLine, ShieldCheck];

const UI = {
  nl: {
    metaTitel: "De technologie",
    metaBeschrijving:
      "De proactieve, met dual-technology beveiligde zelfscankassa: een Cyber-Physical System (CPS) vergelijkt QR-codes en RFID-tags via tweevoudige artikelauthenticatie (2FA).",
    kicker: "De technologie",
    fotoAlt:
      "Illustratie: een klant verbergt een product in de jas terwijl een andere klant met tas door de antidiefstalpoortjes loopt",
    fotoBijschrift:
      "Het gemak waarmee boodschappen niet worden afgerekend — het probleem dat dual-technology bij de bron aanpakt.",
    stap: "Stap",
    huidigeKassa: "De huidige zelfscankassa",
    cpsKassa: "De CPS-zelfscankassa",
    uitPatent: "Uit het patent",
    naarMarkt: "Markt & innovatie",
    naarPatent: "Patent & samenwerking",
  },
  en: {
    metaTitel: "The technology",
    metaBeschrijving:
      "The proactive self-checkout secured with dual technology: a Cyber-Physical System (CPS) compares QR codes and RFID tags through two-factor article authentication (2FA).",
    kicker: "The technology",
    fotoAlt:
      "Illustration: a customer hides a product in their coat while another customer with a bag walks through the anti-theft gates",
    fotoBijschrift:
      "The ease with which groceries go unpaid — the problem dual technology tackles at the source.",
    stap: "Step",
    huidigeKassa: "Today's self-checkout",
    cpsKassa: "The CPS self-checkout",
    uitPatent: "From the patent",
    naarMarkt: "Market & innovation",
    naarPatent: "Patent & partnership",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[taal]/technologie">): Promise<Metadata> {
  const { taal } = await params;
  const ui = UI[isTaal(taal) ? taal : "nl"];
  return { title: ui.metaTitel, description: ui.metaBeschrijving };
}

export default async function TechnologiePage({
  params,
}: PageProps<"/[taal]/technologie">) {
  const { taal } = await params;
  if (!isTaal(taal)) notFound();
  const { technologie } = await getInhoud(taal);
  const ui = UI[taal];

  return (
    <>
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              {ui.kicker}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-white sm:text-5xl">
              {technologie.introTitel}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {technologie.introTekst1}
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {technologie.introTekst2}
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/40">
              <Image
                src="/images/winkeldiefstal-illustratie.jpg"
                alt={ui.fotoAlt}
                width={612}
                height={408}
                priority
                className="w-full rounded-lg"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <p className="mt-3 text-center text-xs text-slate-500">
                {ui.fotoBijschrift}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 stappen ────────────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="stappen-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <h2
              id="stappen-titel"
              className="text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {technologie.stappenTitel}
            </h2>
          </Reveal>

          <ol className="mt-12 space-y-6">
            {technologie.stappen.map((stap, i) => {
              const Icoon = STAP_ICONEN[i % STAP_ICONEN.length];
              return (
                <Reveal key={stap.titel} delay={i * 80}>
                  <li className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
                    <div className="flex items-start gap-4 sm:flex-col sm:items-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
                        <Icoon className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <span className="mt-1 text-sm font-bold tracking-wider text-blue-700 uppercase sm:mt-0">
                        {ui.stap} {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {stap.titel}
                      </h3>
                      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                        {stap.tekst}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Fundamenteel verschil ────────────────────────────── */}
      <section className="bg-slate-50" aria-labelledby="verschil-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <h2
              id="verschil-titel"
              className="text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {technologie.verschilTitel}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {technologie.verschilTekst}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
                  <XCircle className="h-5 w-5 text-rose-500" aria-hidden="true" />
                  {ui.huidigeKassa}
                </p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
                  {technologie.huidigeKassaPunten.map((punt) => (
                    <li key={punt}>{punt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-blue-200 bg-white p-7">
                <p className="flex items-center gap-2 text-sm font-bold tracking-wider text-blue-700 uppercase">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                  {ui.cpsKassa}
                </p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-slate-600">
                  {technologie.cpsKassaPunten.map((punt) => (
                    <li key={punt}>{punt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Het systeem in beeld ─────────────────────────────── */}
      <section className="bg-white" aria-labelledby="systeem-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              {ui.uitPatent}
            </p>
            <h2
              id="systeem-titel"
              className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {technologie.systeemTitel}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {technologie.systeemTekst}
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <SystemDiagram
              taal={taal}
              panelen={technologie.situaties.map((situatie, i) => ({
                titel: situatie.titel,
                bijschrift: technologie.situatieBijschriften[i],
              }))}
            />
          </Reveal>

          <Reveal className="mt-10">
            <SituationTabs situaties={technologie.situaties} taal={taal} />
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
              {technologie.ctaTitel}
            </h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={pad(taal, "/markt")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {ui.naarMarkt}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={pad(taal, "/patent")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                {ui.naarPatent}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
