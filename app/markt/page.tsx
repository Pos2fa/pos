import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Barcode,
  Globe2,
  QrCode,
  Radio,
  Recycle,
  ScanLine,
  Shirt,
  ShoppingBasket,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { getInhoud } from "@/lib/content";

export const metadata: Metadata = {
  title: "Markt & innovatie",
  description:
    "Van barcode tot GS1 Digital Link QR-code en RFID: de POS-innovaties die de retail veranderden — en hoe de 2FA-antidiefstalmethode daarop aansluit, in Nederland en wereldwijd.",
};

const TIJDLIJN_ICONEN = [Barcode, ScanLine, QrCode, Globe2, Radio, ShieldCheck];
const KAART_ICONEN = [Shirt, ShoppingBasket, ShieldCheck];

export default async function MarktPage() {
  const { markt } = await getInhoud();

  return (
    <>
      {/* ── Intro ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
              Markt &amp; innovatie
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
              {markt.introTitel}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              {markt.introTekst}
            </p>
          </div>
        </div>
      </section>

      {/* ── Tijdlijn ─────────────────────────────────────────── */}
      <section className="bg-white" aria-label="Tijdlijn van POS-innovaties">
        <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <ol className="relative space-y-10 border-s-2 border-slate-200 ps-8 sm:ps-10">
            {markt.tijdlijn.map((item, i) => {
              const Icoon = TIJDLIJN_ICONEN[i % TIJDLIJN_ICONEN.length];
              return (
                <Reveal key={item.titel} delay={Math.min(i * 60, 180)}>
                  <li className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -start-[3.35rem] top-0 inline-flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-blue-700 text-white shadow-md sm:-start-[3.85rem]"
                    >
                      <Icoon className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold tracking-wider text-blue-700 uppercase">
                      {item.periode}
                    </p>
                    <h2 className="mt-1.5 text-xl font-bold text-slate-900">
                      {item.titel}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {item.tekst}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Nederland ────────────────────────────────────────── */}
      <section className="bg-slate-50" aria-labelledby="nederland-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Recycle className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2
                id="nederland-titel"
                className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl"
              >
                {markt.nederlandTitel}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {markt.nederlandTekst}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-emerald-200 bg-white p-7">
                <h3 className="text-lg font-bold text-slate-900">
                  {markt.inleverpuntTitel}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {markt.inleverpuntTekst}
                </p>
                <Link
                  href="/technologie#statiegeld-titel"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Zo werkt de statiegeldinname
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Wereldwijd ───────────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="wereldwijd-titel">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <Reveal className="max-w-3xl">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Globe2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2
              id="wereldwijd-titel"
              className="mt-5 text-3xl font-extrabold text-slate-950 sm:text-4xl"
            >
              {markt.wereldwijdTitel}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {markt.wereldwijdTekst}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {markt.kaarten.map((kaart, i) => {
              const Icoon = KAART_ICONEN[i % KAART_ICONEN.length];
              return (
                <Reveal key={kaart.titel} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icoon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {kaart.titel}
                    </h3>
                    <p className="mt-3 text-sm leading-6.5 text-slate-600">
                      {kaart.tekst}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              {markt.ctaTitel}
            </h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/patent"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Patent &amp; samenwerking
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
