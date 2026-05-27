export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const stroke = variant === "light" ? "currentColor" : "currentColor";
  return (
    <div className="flex items-center gap-3">
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 3 L42 13 L42 27 C42 36 34 42 24 45 C14 42 6 36 6 27 L6 13 Z"
          stroke={stroke}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 14 L33 19 L33 28 L24 33 L15 28 L15 19 Z"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="24" cy="24" r="3" fill={stroke} />
      </svg>
      <div className="leading-tight font-display text-[1.15rem]">
        <div>Garantidora</div>
        <div>Premiatto</div>
      </div>
    </div>
  );
}
