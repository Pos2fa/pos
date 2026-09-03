import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardList,
  Gauge,
  HeartHandshake,
  QrCode,
  Radio,
  Recycle,
  ScanLine,
  Shield,
  ShieldCheck,
  Siren,
  UserRound,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";

const PROBLEEM_ICONEN = [ClipboardList, Camera, UserRound, Siren];
const STAP_ICONEN = [Radio, ScanLine, ShieldCheck];
const VOORDEEL_ICONEN = [Shield, HeartHandshake, Gauge, Recycle, CheckCircle2, Siren];

export default async function Home() {
  const { home } = await getInhoud();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pt-24 lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-800 uppercase">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {home.heroBadge}
            </p>
            <h1 className="mt-6 text-4xl font-extrabold text-slate-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              {home.heroTitel}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {home.heroTekst}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/technologie"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
              >
                Ontdek de technologie
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/patent"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                Bekijk het patent
              </Link>
            </div>
          </div>

          {/* 2FA-validatie visual */}
          <Reveal className="mt-14 lg:mt-0" delay={150}>
            <div
              className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur"
              aria-label="Illustratie: het CPS-programma vergelijkt de RFID-boodschappenlijst met de QR-boodschappenlijst"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <p className="text-sm font-bold text-navy-900">
                  CPS-zelfscankassa
                </p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  2FA actief
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
                    <Radio className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                    RFID-lijst
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[92, 74, 84].map((w) => (
                      <li key={`r-${w}`} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
                        <span
                          className="h-2 rounded-full bg-slate-200"
                          style={{ width: `${w}%` }}
                          aria-hidden="true"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
                    <QrCode className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                    QR-lijst
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[92, 74, 84].map((w) => (
                      <li key={`q-${w}`} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-navy-800" aria-hidden="true" />
                        <span
                          className="h-2 rounded-full bg-slate-200"
                          style={{ width: `${w}%` }}
                          aria-hidden="true"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    2FA-validatie geslaagd
                  </p>
                  <p className="text-xs text-emerald-700">
                    Beide boodschappenlijsten komen overeen — betaling kan
                    worden afgerond.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cijfers ──────────────────────────────────────────── */}
      <section className="bg-navy-950" aria-labelledby="cijfers-titel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 id="cijfers-titel" className="sr-only">
            De omvang van het probleem in cijfers
          </h2>
          <div className="grid gap-10 text-center sm:grid-cols-3 sm:gap-6">
            {home.statistieken.map((stat, i) => (
              <Reveal key={stat.waarde} delay={i * 100}>
                <p className="text-4xl font-extrabold text-white sm:text-5xl">
                  {stat.waarde}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">
                  {stat.tekst}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Het probleem ─────────────────────────────────────── */}
      <section className="bg-slate-50" aria-labelledby="probleem-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
                Het probleem
              </p>
              <h2
                id="probleem-titel"
                className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl"
              >
                {home.probleemTitel}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {home.probleemTekst}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Image
                src="/images/qr-scan.jpg"
                alt="Klant scant een verpakking met QR-code bij een zelfscankassa; de rode scanlijn valt over de code"
                width={1600}
                height={1073}
                className="rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60"
                sizes="(max-width: 1024px) 100vw, 500px"
              />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.probleemKaarten.map((kaart, i) => {
              const Icoon = PROBLEEM_ICONEN[i % PROBLEEM_ICONEN.length];
              return (
                <Reveal key={kaart.titel} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icoon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {kaart.titel}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {kaart.tekst}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── De oplossing in 3 stappen ────────────────────────── */}
      <section className="bg-white" aria-labelledby="oplossing-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              De oplossing
            </p>
            <h2
              id="oplossing-titel"
              className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {home.oplossingTitel}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {home.oplossingTekst}
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {home.stappen.map((stap, i) => {
              const Icoon = STAP_ICONEN[i % STAP_ICONEN.length];
              return (
                <Reveal key={stap.titel} delay={i * 100}>
                  <li className="relative h-full rounded-2xl border border-slate-200 bg-slate-50 p-7">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
                        <Icoon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold tracking-wider text-blue-700 uppercase">
                        Stap {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {stap.titel}
                    </h3>
                    <p className="mt-3 text-sm leading-6.5 text-slate-600">
                      {stap.tekst}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal className="mt-10">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-slate-700">
                {home.kassiereNoot}
              </p>
              <Link
                href="/technologie"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Bekijk het volledige systeem
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Voordelen ────────────────────────────────────────── */}
      <section className="bg-slate-50" aria-labelledby="voordelen-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              Waarom dit werkt
            </p>
            <h2
              id="voordelen-titel"
              className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {home.voordelenTitel}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.voordelen.map((voordeel, i) => {
              const Icoon = VOORDEEL_ICONEN[i % VOORDEEL_ICONEN.length];
              return (
                <Reveal key={voordeel.titel} delay={(i % 3) * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icoon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {voordeel.titel}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {voordeel.tekst}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-navy-950" aria-labelledby="cta-titel">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2
              id="cta-titel"
              className="text-3xl font-extrabold text-white sm:text-4xl"
            >
              {home.ctaTitel}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {home.ctaTekst}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/patent"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Lees over het patent
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Neem contact op
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
