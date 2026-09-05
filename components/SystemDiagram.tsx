import type { ReactNode } from "react";

/**
 * Schematische weergave van het CPS-zelfscankassasysteem in vier situaties.
 * Opzet volgens de aanwijzingen van de uitvinder:
 * - het doorlooppad (ingang naar uitgang, links) is even breed als het
 *   CPS-kassasysteem (rechts); winkelwagens staan altijd links van de
 *   doorgetrokken middellijn;
 * - de poorten zijn hekjes met een scharnierpunt: de beveiligingspoort zit
 *   midden in het looppad en opent vanaf links naar boven, de privacy poort
 *   zit onderaan het CPS-deel en opent naar links (langs de middellijn), de
 *   product stoppoort zit tussen kassa en inpakplek en opent vanaf rechts
 *   naar boven; de namen staan in omkaderde labels;
 * - het RFID-inleestraject ligt links van de middellijn, vlak onder de
 *   beveiligingspoort; het CPS-blok is een kiosk onderin het kassadeel;
 * - klanten met winkelwagen staan stijf voor de beveiligingspoort (RFID-
 *   bereik) of stijf tegen de uitgang; UITGANG/INGANG alleen in situatie 1.
 */

const NAVY = "#0c1a33";
const POORT = "#2563eb";
const GRIJS = "#e2e8f0";

type PoortStand = "open" | "dicht";

/* ── Bouwstenen ───────────────────────────────────────────── */

function Wand({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeWidth="2.5" />;
}

/** Hekje met scharnierpunt: dikke balk, spijltjes en een scharnierstip. */
function Hek({ scharnier, einde }: { scharnier: [number, number]; einde: [number, number] }) {
  const [x1, y1] = scharnier;
  const [x2, y2] = einde;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengte = Math.hypot(dx, dy);
  const px = -dy / lengte;
  const py = dx / lengte;
  const spijlen = [0.2, 0.4, 0.6, 0.8].map((t) => ({
    x1: x1 + dx * t - px * 6,
    y1: y1 + dy * t - py * 6,
    x2: x1 + dx * t + px * 6,
    y2: y1 + dy * t + py * 6,
  }));
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={POORT} strokeWidth="5" strokeLinecap="round" />
      {spijlen.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={POORT} strokeWidth="2.5" />
      ))}
      <circle cx={x1} cy={y1} r={4.5} fill={NAVY} />
    </g>
  );
}

/** Omkaderd tekstlabel. */
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

/** Klant die een winkelwagen duwt (zijaanzicht, wagen links). */
function Klant({ x, y, vol = false }: { x: number; y: number; vol?: boolean }) {
  return (
    <g stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* winkelwagen */}
      <polygon points={`${x - 34},${y - 38} ${x + 2},${y - 38} ${x - 2},${y - 14} ${x - 30},${y - 14}`} />
      <circle cx={x - 25} cy={y - 7} r={4} />
      <circle cx={x - 8} cy={y - 7} r={4} />
      <line x1={x + 2} y1={y - 38} x2={x + 12} y2={y - 48} />
      {vol && (
        <g fill={POORT} stroke="none">
          <circle cx={x - 24} cy={y - 32} r={3.5} />
          <circle cx={x - 15} cy={y - 34} r={3.5} />
          <circle cx={x - 7} cy={y - 31} r={3.5} />
        </g>
      )}
      {/* klant */}
      <circle cx={x + 24} cy={y - 56} r={5.5} />
      <line x1={x + 24} y1={y - 50} x2={x + 24} y2={y - 24} />
      <line x1={x + 24} y1={y - 42} x2={x + 12} y2={y - 48} />
      <line x1={x + 24} y1={y - 24} x2={x + 16} y2={y - 4} />
      <line x1={x + 24} y1={y - 24} x2={x + 32} y2={y - 4} />
    </g>
  );
}

/** RFID-signaalgolven (openen naar beneden, richting de winkelwagen). */
function RfidGolven({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke={POORT} strokeWidth="2.5" strokeLinecap="round" fill="none">
      {[7, 12, 17].map((r) => (
        <path key={r} d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} />
      ))}
    </g>
  );
}

function GestreeptePijl({ id, punten }: { id: string; punten: string }) {
  return (
    <polyline
      points={punten}
      fill="none"
      stroke={POORT}
      strokeWidth="2.5"
      strokeDasharray="7 5"
      markerEnd={`url(#${id}-pijl)`}
    />
  );
}

function PijlDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-pijl`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={POORT} />
      </marker>
    </defs>
  );
}

/* ── Paneel ───────────────────────────────────────────────── */

type PaneelProps = {
  id: string;
  poorten: { beveiliging: PoortStand; privacy: PoortStand; stop: PoortStand };
  toonInUitgang?: boolean;
  children?: ReactNode;
};

function Paneel({ id, poorten, toonInUitgang = false, children }: PaneelProps) {
  return (
    <svg
      viewBox="0 0 360 600"
      role="img"
      aria-hidden="true"
      className="w-full rounded-xl border border-slate-200 bg-white"
    >
      <PijlDefs id={id} />

      {/* Doorlooppad (linkerhelft): buitenwand met half open in- en uitgang */}
      <Wand x1={12} y1={12} x2={12} y2={588} />
      <Wand x1={12} y1={12} x2={96} y2={12} />
      <Wand x1={12} y1={588} x2={96} y2={588} />

      {/* Doorgetrokken middellijn tussen doorlooppad en CPS-kassasysteem */}
      <Wand x1={180} y1={12} x2={180} y2={588} />

      {/* CPS-kassasysteem (rechterhelft): buitenwanden */}
      <Wand x1={180} y1={12} x2={348} y2={12} />
      <Wand x1={348} y1={12} x2={348} y2={588} />

      {/* Inpakplek */}
      <rect x={200} y={30} width={132} height={100} fill={GRIJS} stroke="#cbd5e1" />
      <text x={266} y={74} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        INPAK
      </text>
      <text x={266} y={96} textAnchor="middle" fontSize="14" fontWeight={800} fill={NAVY}>
        PLEK
      </text>

      {/* Product stoppoort: scharnier rechts, opent naar boven */}
      {poorten.stop === "dicht" ? (
        <Hek scharnier={[344, 160]} einde={[188, 160]} />
      ) : (
        <Hek scharnier={[344, 160]} einde={[344, 20]} />
      )}
      <Kader cx={252} cy={184} tekst="product stoppoort" />

      <text x={266} y={218} textAnchor="middle" fontSize="12.5" fontWeight={800} fill={NAVY}>
        CAMERA
      </text>

      {/* Beveiligingspoort: midden in het looppad, scharnier links, opent naar boven */}
      {poorten.beveiliging === "dicht" ? (
        <Hek scharnier={[12, 300]} einde={[176, 300]} />
      ) : (
        <Hek scharnier={[12, 300]} einde={[64, 148]} />
      )}
      <Kader cx={88} cy={278} tekst="beveiligingspoort" />

      {/* RFID-inleestraject: links van de middellijn, onder de beveiligingspoort */}
      <Kader cx={88} cy={316} tekst="RFID-tag lezer" />

      {/* Privacy poort: onderaan het CPS-deel, opent naar links (langs de middellijn) */}
      {poorten.privacy === "dicht" ? (
        <Hek scharnier={[184, 588]} einde={[344, 588]} />
      ) : (
        <Hek scharnier={[184, 588]} einde={[184, 432]} />
      )}
      <Kader cx={282} cy={566} tekst="privacy poort" />

      {/* CPS-zelfscankassa: kiosk met scherm en scanvlak */}
      <g>
        <rect x={218} y={470} width={104} height={90} rx={8} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
        <rect x={240} y={430} width={60} height={44} rx={4} fill={NAVY} />
        <rect x={246} y={436} width={48} height={28} rx={2} fill={POORT} opacity={0.85} />
        <line x1={238} y1={492} x2={302} y2={492} stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
        <text x={270} y={522} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
          CPS
        </text>
        <text x={270} y={540} textAnchor="middle" fontSize="10.5" fontWeight={600} fill={NAVY}>
          zelfscankassa
        </text>
      </g>

      {/* In-/uitgang alleen in situatie 1 */}
      {toonInUitgang && (
        <>
          <text x={17} y={40} fontSize="12.5" fontWeight={800} fill={NAVY}>
            UITGANG
          </text>
          <text x={17} y={578} fontSize="12.5" fontWeight={800} fill={NAVY}>
            INGANG
          </text>
        </>
      )}

      {children}
    </svg>
  );
}

/* ── De vier situaties ────────────────────────────────────── */

export default function SystemDiagram({
  panelen,
}: {
  panelen: { titel: string; bijschrift: string }[];
}) {
  const situaties: {
    poorten: PaneelProps["poorten"];
    toonInUitgang?: boolean;
    extra: (id: string) => ReactNode;
  }[] = [
    // Situatie 1: aanmelden — vrije kassa, open privacy poort; klant rijdt
    // het looppad in tot aan de dichte beveiligingspoort.
    {
      poorten: { beveiliging: "dicht", privacy: "open", stop: "dicht" },
      toonInUitgang: true,
      extra: (id) => <GestreeptePijl id={id} punten="138,566 138,314" />,
    },
    // Situatie 2: scannen en afrekenen — winkelwagen stijf voor de
    // beveiligingspoort (RFID-bereik); klant scant bij de kiosk; producten
    // wachten voor de dichte product stoppoort.
    {
      poorten: { beveiliging: "dicht", privacy: "dicht", stop: "dicht" },
      extra: (id) => (
        <>
          <RfidGolven cx={100} cy={340} />
          <Klant x={100} y={410} vol />
          <GestreeptePijl id={id} punten="146,376 212,466" />
          <GestreeptePijl id={id} punten="312,440 312,174" />
        </>
      ),
    },
    // Situatie 3: inpakken — volle winkelwagen stijf tegen de uitgang;
    // product stoppoort en privacy poort open, boodschappen naar de inpakplek.
    {
      poorten: { beveiliging: "dicht", privacy: "open", stop: "open" },
      extra: (id) => (
        <>
          <Klant x={100} y={84} vol />
          <Kader cx={92} cy={106} tekst="volle winkelwagen" />
          <GestreeptePijl id={id} punten="150,56 150,18" />
          <GestreeptePijl id={id} punten="312,440 312,104" />
        </>
      ),
    },
    // Situatie 4: 2 winkelwagens — oude klant tegen de uitgang, nieuwe klant
    // voor de beveiligingspoort; product stoppoort blijft dicht.
    {
      poorten: { beveiliging: "dicht", privacy: "dicht", stop: "dicht" },
      extra: (id) => (
        <>
          <Klant x={100} y={84} vol />
          <Kader cx={92} cy={106} tekst="oude klant" />
          <RfidGolven cx={100} cy={340} />
          <Klant x={100} y={410} vol />
          <Kader cx={92} cy={430} tekst="nieuwe klant" />
          <GestreeptePijl id={id} punten="312,440 312,174" />
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
            id={`sit${i + 1}`}
            poorten={situaties[i].poorten}
            toonInUitgang={situaties[i].toonInUitgang}
          >
            {situaties[i].extra(`sit${i + 1}`)}
          </Paneel>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {paneel.bijschrift}
          </p>
        </figure>
      ))}
    </div>
  );
}
