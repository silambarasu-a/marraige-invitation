export function ReceptionArtwork() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, #2c3e6e 0%, #16213e 50%, #0a1024 100%)",
        }}
      />
      {/* stars (deterministic) */}
      {Array.from({ length: 36 }).map((_, i) => {
        const top = (i * 17) % 75;
        const left = (i * 23 + 7) % 100;
        const sz = 1 + (i % 3) * 0.6;
        const op = 0.3 + ((i * 13) % 70) / 100;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/80"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${sz}px`,
              height: `${sz}px`,
              opacity: op,
              boxShadow: "0 0 4px rgba(255,255,255,0.6)",
            }}
          />
        );
      })}
      {/* chandelier */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 text-gold-light/80"
        viewBox="0 0 120 100"
        fill="currentColor"
      >
        <path d="M55 0 h10 v18 h-10 z" />
        <ellipse cx="60" cy="22" rx="30" ry="6" opacity="0.7" />
        <ellipse cx="60" cy="36" rx="22" ry="4" opacity="0.5" />
        {[
          [25, 30],
          [45, 38],
          [60, 44],
          [75, 38],
          [95, 30],
          [35, 50],
          [85, 50],
          [60, 60],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" opacity="0.9" />
        ))}
      </svg>
      {/* arches */}
      <svg
        className="absolute bottom-0 left-0 w-full h-1/2 text-cream/30"
        viewBox="0 0 400 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M30 200 V60 q0 -30 30 -30 q30 0 30 30 V200" />
        <path d="M310 200 V60 q0 -30 30 -30 q30 0 30 30 V200" />
        <path d="M170 200 V70 q0 -25 30 -25 q30 0 30 25 V200" opacity="0.5" />
      </svg>
      {/* foliage corners */}
      <Foliage className="top-2 left-2" />
      <Foliage className="top-2 right-2 -scale-x-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
    </div>
  );
}

export function MuhurthamArtwork() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbe7d2] via-[#f3d6b4] to-[#e6b893]" />
      {/* mandapam silhouette */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 text-rose"
        viewBox="0 0 240 140"
        fill="currentColor"
      >
        <rect x="20" y="100" width="200" height="40" opacity="0.25" />
        <path d="M40 100 V60 h20 v40 z" opacity="0.5" />
        <path d="M180 100 V60 h20 v40 z" opacity="0.5" />
        <path d="M30 60 L120 20 L210 60 z" opacity="0.6" />
        <path d="M115 70 v30 h10 v-30 z" opacity="0.5" />
      </svg>
      {/* hanging florals */}
      <svg
        className="absolute top-0 left-0 w-full h-1/3 text-rose"
        viewBox="0 0 400 80"
        fill="currentColor"
      >
        {Array.from({ length: 22 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 18 + 4}, 0)`}>
            <path d={`M0 0 v${10 + (i % 4) * 6}`} stroke="currentColor" strokeWidth="0.6" />
            <circle cx="0" cy={10 + (i % 4) * 6} r="3" opacity="0.7" />
            <circle cx="0" cy={4 + (i % 3) * 4} r="2" opacity="0.5" />
          </g>
        ))}
      </svg>
      {/* petals scatter */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
            width: 8,
            height: 8,
            background: "linear-gradient(135deg,#e98b76,#c04a2e)",
            borderRadius: "60% 40% 60% 40% / 70% 30% 70% 30%",
            opacity: 0.8,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-rose/20 via-transparent to-transparent" />
    </div>
  );
}

function Foliage({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute w-24 h-24 text-cream/30 ${className}`}
      viewBox="0 0 60 60"
      fill="currentColor"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx={10 + (i % 3) * 8}
          cy={10 + Math.floor(i / 3) * 10}
          rx="3"
          ry="6"
          transform={`rotate(${i * 30} ${10 + (i % 3) * 8} ${10 + Math.floor(i / 3) * 10})`}
          opacity="0.6"
        />
      ))}
    </svg>
  );
}
