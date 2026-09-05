import type { ReactNode } from "react";

/**
 * Schematische weergave van het CPS-zelfscankassasysteem in vier situaties,
 * nagetekend naar de definitieve tekening van de uitvinder:
 * - het doorlooppad (ingang naar uitgang) is door een doorgetrokken lijn
 *   gescheiden van het zelfscankassasysteem;
 * - in- en uitgang zijn tot halverwege open;
 * - alle poorten hebben dezelfde belijning en kleur (blauw);
 * - 'UITGANG'/'INGANG' staan alleen in situatie 1.
 */

const NAVY = "#0c1a33";
const POORT = "#2563eb";
const GRIJS = "#e2e8f0";

type PaneelProps = {
  /** Uniek voorvoegsel voor SVG-marker-id's */
  id: string;
  toonInUitgang?: boolean;
  children?: ReactNode;
};

function Wand({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={NAVY} strokeWidth="2.5" />;
}

function Poort({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={POORT} strokeWidth="6" />;
}

function BoxTekst({
  x,
  y,
  w,
  h,
  regels,
  vet = true,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  regels: string[];
  vet?: boolean;
}) {
  const regelHoogte = 15;
  const startY = y + h / 2 - ((regels.length - 1) * regelHoogte) / 2 + 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
      {regels.map((regel, i) => (
        <text
          key={regel + i}
          x={x + w / 2}
          y={startY + i * regelHoogte}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight={vet ? 700 : 500}
          fill={NAVY}
        >
          {regel}
        </text>
      ))}
    </g>
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

function GestreeptePijl({
  id,
  punten,
}: {
  id: string;
  punten: string;
}) {
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

function Paneel({ id, toonInUitgang = false, children }: PaneelProps) {
  return (
    <svg
      viewBox="0 0 340 600"
      role="img"
      aria-hidden="true"
      className="w-full rounded-xl border border-slate-200 bg-white"
    >
      <PijlDefs id={id} />

      {/* Doorlooppad (corridor): linkerwand + half open in- en uitgang */}
      <Wand x1={14} y1={14} x2={14} y2={586} />
      <Wand x1={14} y1={14} x2={52} y2={14} />
      <Wand x1={14} y1={586} x2={52} y2={586} />
      {/* Doorgetrokken scheidingslijn tussen doorlooppad en zelfscankassasysteem */}
      <Wand x1={90} y1={14} x2={90} y2={586} />

      {/* Zelfscankassasysteem: buitenwanden */}
      <Wand x1={90} y1={14} x2={326} y2={14} />
      <Wand x1={326} y1={14} x2={326} y2={586} />
      <Wand x1={250} y1={586} x2={326} y2={586} />

      {/* Poorten - alle in dezelfde stijl */}
      <Poort x1={14} y1={300} x2={88} y2={300} />
      <text x={16} y={281} fontSize="10.5" fontWeight={700} fill={NAVY}>
        beveiligings-
      </text>
      <text x={16} y={293} fontSize="10.5" fontWeight={700} fill={NAVY}>
        poort
      </text>

      <Poort x1={92} y1={190} x2={324} y2={190} />
      <text x={96} y={182} fontSize="12" fontWeight={700} fill={NAVY}>
        product stoppoort
      </text>

      <Poort x1={92} y1={586} x2={248} y2={586} />
      <text x={96} y={578} fontSize="12" fontWeight={700} fill={NAVY}>
        privacy poort
      </text>

      {/* Inpakplek */}
      <rect x={150} y={40} width={150} height={110} fill={GRIJS} stroke="#cbd5e1" />
      <text x={225} y={88} textAnchor="middle" fontSize="15" fontWeight={800} fill={NAVY}>
        INPAK
      </text>
      <text x={225} y={112} textAnchor="middle" fontSize="15" fontWeight={800} fill={NAVY}>
        PLEK
      </text>

      {/* Kassazone */}
      <text x={240} y={232} textAnchor="middle" fontSize="13" fontWeight={800} fill={NAVY}>
        CAMERA
      </text>
      <text
        x={104}
        y={390}
        fontSize="12"
        fontWeight={700}
        fill={NAVY}
        transform="rotate(-90 104 390)"
      >
        RFID-tag lezer
      </text>
      <BoxTekst x={180} y={250} w={120} h={130} regels={["CPS", "zelfscan", "kassa"]} />
      <BoxTekst x={248} y={536} w={72} h={34} regels={["RETOUR"]} />

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

export default function SystemDiagram({
  panelen,
}: {
  panelen: { titel: string; bijschrift: string }[];
}) {
  const extras: ((id: string) => ReactNode)[] = [
    // Situatie 1: aanmelden bij kassa
    () => null,
    // Situatie 2: scannen en afrekenen
    (id) => (
      <>
        <BoxTekst
          x={112}
          y={250}
          w={62}
          h={130}
          regels={["WINKEL", "WAGEN", "MET", "BOOD-", "SCHAPPEN"]}
        />
        <GestreeptePijl id={id} punten="174,315 178,315" />
        <GestreeptePijl id={id} punten="285,250 285,196" />
      </>
    ),
    // Situatie 3: inpakken boodschappen
    (id) => (
      <>
        <BoxTekst x={18} y={195} w={66} h={80} regels={["VOLLE", "WINKEL", "WAGEN"]} />
        <GestreeptePijl id={id} punten="180,235 86,235" />
        <GestreeptePijl id={id} punten="51,195 70,120 70,26" />
        <GestreeptePijl id={id} punten="285,245 285,158" />
      </>
    ),
    // Situatie 4: 2 winkelwagens (product stoppoort blijft dicht)
    (id) => (
      <>
        <BoxTekst x={18} y={60} w={66} h={100} regels={["WINKEL", "WAGEN", "OUDE", "KLANT"]} />
        <GestreeptePijl id={id} punten="70,60 70,26" />
        <BoxTekst
          x={112}
          y={250}
          w={62}
          h={130}
          regels={["WINKEL", "WAGEN", "NIEUWE", "KLANT"]}
        />
        <GestreeptePijl id={id} punten="174,315 178,315" />
        <GestreeptePijl id={id} punten="285,250 285,200" />
      </>
    ),
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
          <Paneel id={`sit${i + 1}`} toonInUitgang={i === 0}>
            {extras[i](`sit${i + 1}`)}
          </Paneel>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {paneel.bijschrift}
          </p>
        </figure>
      ))}
    </div>
  );
}
