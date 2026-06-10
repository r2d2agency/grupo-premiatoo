export function Logo({ variant = "light", src, height = 44 }: { variant?: "light" | "dark"; src?: string; height?: number }) {
  if (src) {
    return (
      <div className="flex items-center">
        <img
          src={src}
          alt="Garantidora Premiatto"
          style={{ height: `${height}px` }}
          className="w-auto object-contain"
        />
      </div>
    );
  }

  const stroke = variant === "dark" ? "#0B1F3A" : "#FFFFFF";

  return (
    <div className="flex items-center gap-3" style={{ height: `${height}px` }}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        style={{ height: `${height}px`, width: `${height}px` }}
        aria-hidden="true"
      >
        {/* Outer hexagon */}
        <polygon
          points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5"
          stroke={stroke}
          strokeWidth="1.6"
          fill="none"
        />
        {/* Inner rotated square (diamond) */}
        <polygon
          points="24,11 36,24 24,37 12,24"
          stroke={stroke}
          strokeWidth="1.4"
          fill="none"
        />
        {/* Inner small diamond */}
        <polygon
          points="24,18 30,24 24,30 18,24"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
        {/* Center dot */}
        <circle cx="24" cy="24" r="1.6" fill={stroke} />
      </svg>
      <div
        className="leading-[1.05] font-display"
        style={{ color: stroke, fontSize: `${Math.round(height * 0.42)}px` }}
      >
        <div>Garantidora</div>
        <div>Premiatto</div>
      </div>
    </div>
  );
}
