import Image from "next/image";

export function ReceptionArtwork() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/reception.jpeg"
        alt="Couple in traditional South Indian wedding attire before a temple at sunset"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
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
