type LogoProps = {
  /** "dark" voor lichte achtergronden, "light" voor donkere achtergronden */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Vector-weergave van het POS-2FA-Intermediary logo:
 * winkelwagen met RFID-signaalgolven naast het woordmerk.
 */
export default function Logo({ variant = "dark", className }: LogoProps) {
  const ink = variant === "dark" ? "#0c1a33" : "#ffffff";
  const blue = variant === "dark" ? "#2563eb" : "#5b8bf7";

  return (
    <svg
      viewBox="0 0 540 120"
      role="img"
      aria-label="POS-2FA-Intermediary"
      className={className}
    >
      {/* Winkelwagen */}
      <g
        fill="none"
        stroke={ink}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 34h14l6 14m0 0 8 34h44l12-34H34" />
        <circle cx="46" cy="96" r="7" />
        <circle cx="78" cy="96" r="7" />
      </g>
      {/* Signaalgolven */}
      <g fill="none" stroke={blue} strokeWidth="7" strokeLinecap="round">
        <path d="M66 30a14 14 0 0 1 20 0" />
        <path d="M59 21a24 24 0 0 1 34 0" />
        <path d="M52 12a34 34 0 0 1 48 0" />
      </g>
      {/* Woordmerk */}
      <text
        x="118"
        y="66"
        fontFamily="var(--font-manrope), ui-sans-serif, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="1"
      >
        <tspan fill={ink}>POS-</tspan>
        <tspan fill={blue}>2FA</tspan>
      </text>
      <g
        fontFamily="var(--font-manrope), ui-sans-serif, sans-serif"
        fontWeight="600"
        fontSize="23"
        letterSpacing="6"
      >
        <text x="118" y="102" fill={ink}>
          INTERMEDIARY
        </text>
      </g>
      <line
        x1="342"
        y1="94"
        x2="380"
        y2="94"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
