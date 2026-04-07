"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 36, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hexágono — estrutura tecnológica robusta */}
      <polygon
        points="20,2 37,11 37,29 20,38 3,29 3,11"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="1.5"
      />
      {/* Seta para cima — "shift up", evolução, crescimento */}
      <polyline
        points="20,30 20,14"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <polyline
        points="13,21 20,14 27,21"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Traço base — linha de partida, "shift" */}
      <line
        x1="13" y1="33" x2="27" y2="33"
        stroke="#FF8C2A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={34} />
      <div className="flex flex-col leading-none">
        <span
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "2px" }}
          className="text-[16px] font-bold text-[--gun-100]"
        >
          UPSHIFT{" "}
          <span style={{ color: "var(--orange)" }}>BR</span>
        </span>
      </div>
    </div>
  );
}
