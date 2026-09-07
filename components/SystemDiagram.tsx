import type { ReactNode } from "react";

/**
 * Schematische weergave van het CPS-zelfscankassasysteem in vier situaties,
 * naar de tekening en aanwijzingen van de uitvinder:
 * - doorlooppad (links) en CPS-kassasysteem (rechts) zijn even breed;
 * - iedere poort is een balk over de volle breedte van zijn laan, met de
 *   naam erin: dicht = blauw gevuld, open = wit met blauwe rand;
 *   de privacy poort schuift (geen draaipunt);
 * - waar de privacy poort open is, zijn ook de in- en uitgang geheel open;
 * - winkelwagens staan links van de middellijn en wijzen naar de uitgang;
 * - de CAMERA-tekst staat boven het scherm van de CPS-kiosk, ter hoogte
 *   van de beveiligingspoort; de blauwe lijn met 'RFID-tag lezer' markeert
 *   het inleestraject tot aan de beveiligingspoort;
 * - geen pijlen; de boodschappen zelf tonen de stand van zaken.
 */

const NAVY = "#0c1a33";
const POORT = "#2563eb";
const GRIJS = "#e2e8f0";

type PoortStand = "open" | "dicht";

/* ── Bouwstenen ───────────────────────────────────────────── */

function Wand({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeWidth="2.5" />;
}

/** Poortbalk over de volle laanbreedte, met de naam erin. */
function PoortBalk({
  x,
  y,
  w,
  tekst,
  stand,
}: {
  x: number;
  y: number;
  w: number;
  tekst: string;
  stand: PoortStand;
}) {
  const dicht = stand === "dicht";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={24}
        rx={12}
        fill={dicht ? POORT : "#ffffff"}
        stroke={POORT}
        strokeWidth="2.5"
      />
      <text
        x={x + w / 2}
        y={y + 16}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight={700}
        fill={dicht ? "#ffffff" : POORT}
      >
        {tekst}
      </text>
    </g>
  );
}

/** Klein omkaderd tekstlabel. */
function Kader({ cx, cy, tekst }: { cx: number; cy: number; tekst: string }) {
  const breedte = tekst.length * 5.9 + 12;
  return (
    <g>
      <rect
        x={cx - breedte / 2}
        y={cy - 9}
        width={breedte}
        height={18}
        rx={3}
        fill="#ffffff"
        stroke={NAVY}
        strokeWidth="1.5"
      />
      <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="10.5" fontWeight={700} fill={NAVY}>
        {tekst}
      </text>
    </g>
  );
}

/** Winkelwagen van boven gezien, wijzend richting de uitgang (omhoog). */
function Winkelwagen({ x, y, vol = false }: { x: number; y: number; vol?: boolean }) {
  return (
    <g stroke={NAVY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* bak: duidelijk smaller aan de voorzijde (boven, richting uitgang) */}
      <polygon
        points={`${x - 40},${y} ${x + 40},${y} ${x + 24},${y - 88} ${x - 24},${y - 88}`}
      />
      {/* voorrand (bumper) aan de voorzijde */}
      <line x1={x - 24} y1={y - 88} x2={x + 24} y2={y - 88} strokeWidth="6.5" />
      {/* duwbeugel onderaan (achterzijde) */}
      <line x1={x - 48} y1={y + 12} x2={x + 48} y2={y + 12} strokeWidth="4.5" />
      <line x1={x - 38} y1={y} x2={x - 44} y2={y + 12} />
      <line x1={x + 38} y1={y} x2={x + 44} y2={y + 12} />
      {vol && (
        <g fill={POORT} stroke="none">
          <circle cx={x - 12} cy={y - 66} r={5} />
          <circle cx={x + 10} cy={y - 58} r={5} />
          <circle cx={x - 4} cy={y - 45} r={5} />
          <circle cx={x + 16} cy={y - 32} r={5} />
          <circle cx={x - 18} cy={y - 24} r={5} />
          <circle cx={x + 2} cy={y - 13} r={5} />
        </g>
      )}
    </g>
  );
}

/** Losse boodschappen (gescande producten). */
function Boodschappen({ punten }: { punten: [number, number][] }) {
  return (
    <g fill={POORT} stroke="none">
      {punten.map(([px, py], i) => (
        <rect key={i} x={px} y={py} width={13} height={13} rx={3.5} />
      ))}
    </g>
  );
}

/* ── Paneel ───────────────────────────────────────────────── */

type PaneelProps = {
  poorten: { beveiliging: PoortStand; privacy: PoortStand; stop: PoortStand };
  toonInUitgang?: boolean;
  children?: ReactNode;
};

function Paneel({ poorten, toonInUitgang = false, children }: PaneelProps) {
  const doorgangenOpen = poorten.privacy === "open";
  return (
    <svg
      viewBox="0 0 360 600"
      role="img"
      aria-hidden="true"
      className="w-full rounded-xl border border-slate-200 bg-white"
    >
      {/* Doorlooppad: linkerwand; in- en uitgang geheel open zodra de
          privacy poort open is, anders tot halverwege open */}
      <Wand x1={12} y1={12} x2={12} y2={588} />
      {!doorgangenOpen && (
        <>
          <Wand x1={12} y1={12} x2={96} y2={12} />
          <Wand x1={12} y1={588} x2={96} y2={588} />
        </>
      )}

      {/* CPS-kassasysteem: buitenwanden */}
      <Wand x1={180} y1={12} x2={348} y2={12} />
      <Wand x1={348} y1={12} x2={348} y2={588} />

      {/* Middellijn: alleen tussen product stoppoort en beveiligingspoort-hoogte */}
      <Wand x1={180} y1={172} x2={180} y2={300} />

      {/* RFID-inleestraject: van beveiligingspoort-hoogte tot de privacy poort */}
      <line x1={181} y1={300} x2={181} y2={564} stroke={POORT} strokeWidth="4.5" />
      <text
        x={194}
        y={506}
        fontSize="11.5"
        fontWeight={700}
        fill={POORT}
        transform="rotate(-90 194 506)"
      >
        RFID-tag lezer
      </text>

      {/* Inpakplek */}
      <rect x={200} y={30} width={132} height={100} fill={GRIJS} stroke="#cbd5e1" />
      <text x={266} y={74} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        INPAK
      </text>
      <text x={266} y={96} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        PLEK
      </text>

      {/* Poorten als balken over de volle laanbreedte */}
      <PoortBalk x={184} y={148} w={160} tekst="product stoppoort" stand={poorten.stop} />
      <PoortBalk x={14} y={288} w={164} tekst="beveiligingspoort" stand={poorten.beveiliging} />
      <PoortBalk x={184} y={564} w={160} tekst="privacy poort" stand={poorten.privacy} />

      {/* CPS-zelfscankassa: kiosk met camera boven het scherm */}
      <text x={270} y={300} textAnchor="middle" fontSize="12.5" fontWeight={800} fill={NAVY}>
        CAMERA
      </text>
      <rect x={240} y={308} width={60} height={44} rx={4} fill={NAVY} />
      <rect x={246} y={314} width={48} height={28} rx={2} fill={POORT} opacity={0.85} />
      <rect x={218} y={348} width={104} height={104} rx={8} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      <line x1={238} y1={372} x2={302} y2={372} stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <text x={270} y={408} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
        CPS
      </text>
      <text x={270} y={426} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={NAVY}>
        zelfscankassa
      </text>

      {/* In-/uitgang alleen in situatie 1 */}
      {toonInUitgang && (
        <>
          <text x={17} y={40} fontSize="12.5" fontWeight={800} fill={NAVY}>
            UITGANG
          </text>
          <text x={17} y={576} fontSize="12.5" fontWeight={800} fill={NAVY}>
            INGANG
          </text>
        </>
      )}

      {children}
    </svg>
  );
}

/* ── De vier situaties ────────────────────────────────────── */

const INPAK_BOODSCHAPPEN: [number, number][] = [
  [212, 36], [240, 40], [270, 34], [300, 38], [224, 106], [256, 110], [288, 104],
];

export default function SystemDiagram({
  panelen,
}: {
  panelen: { titel: string; bijschrift: string }[];
}) {
  const situaties: {
    poorten: PaneelProps["poorten"];
    toonInUitgang?: boolean;
    extra: ReactNode;
  }[] = [
    // Situatie 1: aanmelden — volle winkelwagen vlak voor de dichte
    // beveiligingspoort; privacy poort open (vrije kassa).
    {
      poorten: { beveiliging: "dicht", privacy: "open", stop: "dicht" },
      toonInUitgang: true,
      extra: <Winkelwagen x={96} y={410} vol />,
    },
    // Situatie 2: scannen en afrekenen — lege winkelwagen voor de
    // beveiligingspoort; gescande boodschappen tegen de product stoppoort.
    {
      poorten: { beveiliging: "dicht", privacy: "dicht", stop: "dicht" },
      extra: (
        <>
          <Winkelwagen x={96} y={410} />
          <Boodschappen punten={[[216, 182], [242, 188], [268, 180], [294, 186], [318, 181]]} />
        </>
      ),
    },
    // Situatie 3: inpakken — lege winkelwagen vlak voor de uitgang;
    // boodschappen op de inpakplek; product stoppoort en privacy poort open.
    {
      poorten: { beveiliging: "dicht", privacy: "open", stop: "open" },
      extra: (
        <>
          <Winkelwagen x={96} y={108} />
          <Boodschappen punten={INPAK_BOODSCHAPPEN} />
        </>
      ),
    },
    // Situatie 4: 2 winkelwagens — nieuwe klant (vol) voor de
    // beveiligingspoort, oude klant (leeg) voor de uitgang; boodschappen van
    // de oude klant op de inpakplek; product stoppoort blijft dicht.
    {
      poorten: { beveiliging: "dicht", privacy: "dicht", stop: "dicht" },
      extra: (
        <>
          <Winkelwagen x={96} y={108} />
          <Kader cx={96} cy={140} tekst="oude klant" />
          <Winkelwagen x={96} y={410} vol />
          <Kader cx={96} cy={442} tekst="nieuwe klant" />
          <Boodschappen punten={INPAK_BOODSCHAPPEN} />
        </>
      ),
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {panelen.map((paneel, i) => (
        <figure key={paneel.titel} className="flex flex-col">
          <figcaption className="mb-2 text-center">
            <span className="block text-sm font-extrabold tracking-wider text-blue-700 uppercase">
              Situatie {i + 1}
            </span>
            <span className="block text-sm font-bold text-slate-900">
              {paneel.titel}
            </span>
          </figcaption>
          <Paneel
            poorten={situaties[i].poorten}
            toonInUitgang={situaties[i].toonInUitgang}
          >
            {situaties[i].extra}
          </Paneel>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {paneel.bijschrift}
          </p>
        </figure>
      ))}
    </div>
  );
}
