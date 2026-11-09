import type { ReactNode } from "react";
import type { Taal } from "@/lib/i18n";
import {
  NAVY,
  POORT,
  Wand,
  Winkelwagen,
  BoodschappenSet,
} from "@/components/SystemDiagram";

/**
 * De winkeldiefstalbestendige CPS-RFID-kassa in drie situaties: de tekening
 * van de technologie-pagina (SystemDiagram), aangepast volgens de
 * aanwijzingen van de uitvinder voor de RFID-tag-afrekenmethode:
 * - de product stoppoort is weg;
 * - de tekst "CPS zelfscankassa" is "CPS RFID-kassa" geworden;
 * - de camera zit nu onder de CPS-box;
 * - de CPS-box is twee keer zo groot en stelt de afgeschermde afrekenbak voor;
 * - de boodschappen zitten in situatie 1 en 3 in de winkelwagen en in
 *   situatie 2 in de afgeschermde afrekenbak;
 * - de inpakplek en de zwarte verticale middellijn zijn weg; op die plek
 *   staat in situatie 3 de winkelwagen;
 * - geen verklarende tekst onder de plaatjes.
 */

const LABELS = {
  nl: {
    rfid: "RFID-tag lezer",
    beveiligingspoort: "beveiligingspoort",
    privacypoort: "privacy poort",
    camera: "CAMERA",
    kassa: "RFID-kassa",
    uitgang: "UITGANG",
    ingang: "INGANG",
    situatie: "Situatie",
  },
  en: {
    rfid: "RFID tag reader",
    beveiligingspoort: "security gate",
    privacypoort: "privacy gate",
    camera: "CAMERA",
    kassa: "RFID checkout",
    uitgang: "EXIT",
    ingang: "ENTRANCE",
    situatie: "Situation",
  },
} as const;

type Labels = (typeof LABELS)[Taal];
type PoortStand = "open" | "dicht";

type PaneelProps = {
  privacy: PoortStand;
  labels: Labels;
  toonInUitgang?: boolean;
  children?: ReactNode;
};

function Paneel({ privacy, labels, toonInUitgang = false, children }: PaneelProps) {
  return (
    <svg
      viewBox="0 0 360 600"
      role="img"
      aria-hidden="true"
      className="w-full rounded-xl border border-slate-200 bg-white"
    >
      {/* Doorlooppad: linkerwand; in- en uitgang geheel open */}
      <Wand x1={12} y1={12} x2={12} y2={588} />

      {/* CPS-kassasysteem: buitenwanden */}
      <Wand x1={180} y1={12} x2={348} y2={12} />
      <Wand x1={348} y1={12} x2={348} y2={588} />

      {/* Blauwe RFID-lijn: dicht bij de kassa */}
      <line x1={192} y1={235} x2={192} y2={500} stroke={POORT} strokeWidth="4.5" />
      <text
        x={185}
        y={455}
        fontSize="11.5"
        fontWeight={700}
        fill={POORT}
        transform="rotate(-90 185 455)"
      >
        {labels.rfid}
      </text>

      {/* Beveiligingspoort: altijd dicht; draaipunt (rondje) links,
          rechthoekig uiteinde rechts */}
      <rect x={14} y={288} width={164} height={24} fill={POORT} />
      <text x={96} y={304} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
        {labels.beveiligingspoort}
      </text>
      <circle cx={16} cy={300} r={8} fill={NAVY} />

      {/* Privacy poort: schuifdeur, zoals op de technologie-pagina */}
      {privacy === "dicht" ? (
        <g>
          <rect x={14} y={564} width={160} height={24} fill={POORT} />
          <text x={94} y={580} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
            {labels.privacypoort}
          </text>
          <line x1={181} y1={570} x2={344} y2={570} stroke={NAVY} strokeWidth="2.5" />
          <polygon points="174,570 182,566.4 182,573.6" fill={NAVY} />
          <line x1={174} y1={582} x2={344} y2={582} stroke={NAVY} strokeWidth="2.5" />
        </g>
      ) : (
        <g>
          <rect x={184} y={564} width={160} height={24} fill={POORT} />
          <text x={264} y={580} textAnchor="middle" fontSize="11.5" fontWeight={700} fill="#ffffff">
            {labels.privacypoort}
          </text>
        </g>
      )}

      {/* CPS-RFID-kassa: twee keer zo grote box die de afgeschermde
          afrekenbak voorstelt, met de camera eronder */}
      <rect x={208} y={230} width={132} height={208} rx={8} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <line x1={228} y1={258} x2={320} y2={258} stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <text x={274} y={298} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
        CPS
      </text>
      <text x={274} y={316} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={NAVY}>
        {labels.kassa}
      </text>
      <rect x={244} y={452} width={60} height={44} rx={4} fill={NAVY} />
      <rect x={250} y={458} width={48} height={28} rx={2} fill={POORT} opacity={0.85} />
      <text x={274} y={514} textAnchor="middle" fontSize="12.5" fontWeight={800} fill={NAVY}>
        {labels.camera}
      </text>

      {/* In-/uitgang alleen in situatie 1 */}
      {toonInUitgang && (
        <>
          <text x={17} y={40} fontSize="12.5" fontWeight={800} fill={NAVY}>
            {labels.uitgang}
          </text>
          <text x={17} y={576} fontSize="12.5" fontWeight={800} fill={NAVY}>
            {labels.ingang}
          </text>
        </>
      )}

      {children}
    </svg>
  );
}

/* ── De drie situaties ────────────────────────────────────── */

export default function RfidKassaDiagram({ taal }: { taal: Taal }) {
  const labels = LABELS[taal];
  const situaties: {
    privacy: PoortStand;
    toonInUitgang?: boolean;
    extra: ReactNode;
  }[] = [
    // Situatie 1: aanmelden — volle winkelwagen vlak voor de dichte
    // beveiligingspoort; privacy poort open (vrije kassa).
    {
      privacy: "open",
      toonInUitgang: true,
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={96} y={396} schaal={0.72} />
        </>
      ),
    },
    // Situatie 2: afrekenen — lege winkelwagen voor de beveiligingspoort;
    // de boodschappen zitten in de afgeschermde afrekenbak.
    {
      privacy: "dicht",
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <BoodschappenSet cx={274} y={420} />
        </>
      ),
    },
    // Situatie 3: klaar — de winkelwagen met de boodschappen erin staat op
    // de plek van de vroegere inpakplek; privacy poort open.
    {
      privacy: "open",
      extra: (
        <>
          <Winkelwagen x={264} y={120} />
          <BoodschappenSet cx={264} y={106} schaal={0.72} />
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {situaties.map((situatie, i) => (
        <figure key={i} className="flex flex-col">
          <figcaption className="mb-2 text-center">
            <span className="block text-sm font-extrabold tracking-wider text-blue-700 uppercase">
              {labels.situatie} {i + 1}
            </span>
          </figcaption>
          <Paneel
            privacy={situatie.privacy}
            labels={labels}
            toonInUitgang={situatie.toonInUitgang}
          >
            {situatie.extra}
          </Paneel>
        </figure>
      ))}
    </div>
  );
}
