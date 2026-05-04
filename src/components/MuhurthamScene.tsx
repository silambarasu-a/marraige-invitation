"use client";

import { motion } from "framer-motion";

/**
 * A stylized animated Tamil wedding Muhurtham scene.
 * SVG layers: sky, distant temple, garlands, mandapam, bride & groom,
 * sacred fire, kuthuvilakku lamps, falling jasmine.
 */
export default function MuhurthamScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fde7c8 0%, #f8c98a 45%, #efa269 80%, #e0855a 100%)",
        }}
      />
      {/* sun glow */}
      <div
        className="absolute"
        style={{
          left: "15%",
          top: "12%",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,236,180,0.95), rgba(255,200,120,0))",
          filter: "blur(2px)",
        }}
      />

      {/* distant temple gopuram silhouette */}
      <svg
        className="absolute bottom-[30%] left-0 w-full h-1/3 text-[#8c4a2a]"
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path
          d="M0 150 V120 L20 110 L30 95 L40 110 L60 100 L70 80 L80 100 L100 90 L120 70 L130 55 L140 70 L160 65 L180 50 L200 30 L220 50 L240 65 L260 65 L280 75 L300 60 L320 70 L340 90 L360 100 L380 110 L400 120 V150 Z"
          opacity="0.55"
        />
        <path
          d="M170 70 V40 L185 30 L185 18 L195 12 L205 18 L205 30 L220 40 V70 Z"
          opacity="0.7"
        />
      </svg>

      {/* hanging garlands (top border) */}
      <svg
        className="absolute top-0 left-0 w-full"
        height="70"
        viewBox="0 0 400 70"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 26 }).map((_, i) => {
          const x = i * 16 + 4;
          const len = 26 + (i % 4) * 9;
          return (
            <g key={i}>
              <line x1={x} y1="0" x2={x} y2={len} stroke="#5b3008" strokeWidth="0.8" />
              {Array.from({ length: 6 }).map((_, j) => {
                const cy = 6 + j * 5;
                if (cy > len) return null;
                return (
                  <circle
                    key={j}
                    cx={x}
                    cy={cy}
                    r="2.2"
                    fill={j % 2 === 0 ? "#e85a1a" : "#fae3a8"}
                    stroke="#c54710"
                    strokeWidth="0.3"
                  />
                );
              })}
              <ellipse cx={x} cy={len + 1.5} rx="1.3" ry="1.6" fill="#7a2d05" />
            </g>
          );
        })}
      </svg>

      {/* mandapam */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%]"
        viewBox="0 0 400 240"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* floor / kolam base */}
        <ellipse cx="200" cy="232" rx="190" ry="14" fill="#a85a2b" opacity="0.45" />
        <ellipse cx="200" cy="230" rx="120" ry="6" fill="#fff" opacity="0.35" />

        {/* kolam dots */}
        {Array.from({ length: 24 }).map((_, i) => (
          <circle
            key={i}
            cx={80 + (i % 12) * 20}
            cy={i < 12 ? 226 : 234}
            r="1.2"
            fill="#fff"
            opacity="0.7"
          />
        ))}

        {/* back wall arch */}
        <path
          d="M70 220 V100 Q 200 30 330 100 V220 Z"
          fill="url(#wallGrad)"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9d6a8" />
            <stop offset="100%" stopColor="#e3a36b" />
          </linearGradient>
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c98152" />
            <stop offset="100%" stopColor="#7a3f1c" />
          </linearGradient>
          <radialGradient id="flame" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#fff5b3" />
            <stop offset="40%" stopColor="#ffb142" />
            <stop offset="80%" stopColor="#d4521b" />
            <stop offset="100%" stopColor="#7a1a05" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* pillars */}
        {[
          [80, 0],
          [320, 0],
          [140, 0],
          [260, 0],
        ].map(([x], i) => (
          <g key={i}>
            <rect x={x - 8} y="100" width="16" height="120" fill="url(#pillarGrad)" />
            <rect x={x - 12} y="96" width="24" height="6" fill="#5b3008" />
            <rect x={x - 14} y="216" width="28" height="6" fill="#5b3008" />
            {/* pillar floral wraps */}
            {Array.from({ length: 4 }).map((_, j) => (
              <circle
                key={j}
                cx={x - 5 + (j % 2) * 10}
                cy={140 + j * 18}
                r="2"
                fill="#e85a1a"
                opacity="0.85"
              />
            ))}
          </g>
        ))}

        {/* top crossbeam with garland */}
        <rect x="60" y="92" width="280" height="8" fill="#5b3008" />
        {Array.from({ length: 18 }).map((_, i) => {
          const cx = 75 + i * 15;
          return (
            <g key={i}>
              <path d={`M${cx} 100 q4 6 0 12`} stroke="#5b3008" strokeWidth="0.5" fill="none" />
              <circle cx={cx + 1.6} cy={114} r="2" fill="#e85a1a" />
              <circle cx={cx - 1.5} cy={108} r="1.6" fill="#fae3a8" />
            </g>
          );
        })}

        {/* sacred fire (homam) center */}
        <g transform="translate(200, 215)">
          <ellipse cx="0" cy="6" rx="22" ry="4" fill="#3a1c08" />
          <rect x="-18" y="0" width="36" height="6" fill="#5a2810" />
          {/* logs */}
          <rect x="-14" y="-3" width="28" height="3" fill="#7a3f1c" rx="1" />
          {/* flame */}
          <ellipse cx="0" cy="-12" rx="12" ry="22" fill="url(#flame)" />
        </g>

        {/* bride (right) */}
        <g transform="translate(232, 165)">
          {/* saree skirt - red & gold */}
          <path d="M-22 0 Q -28 22 -22 56 L22 56 Q 28 22 22 0 Z" fill="#b71c2c" />
          <path
            d="M-22 0 Q -28 22 -22 56 L22 56 Q 28 22 22 0 Z"
            fill="url(#sareePattern)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="sareePattern" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbd66f" />
              <stop offset="50%" stopColor="transparent" />
              <stop offset="100%" stopColor="#fbd66f" />
            </linearGradient>
          </defs>
          {/* gold border on hem */}
          <path d="M-22 56 L22 56" stroke="#e8b948" strokeWidth="3" />
          <path d="M-22 53 L22 53" stroke="#fff3c0" strokeWidth="0.6" />
          {/* blouse */}
          <path d="M-12 -10 L-14 0 L14 0 L12 -10 Z" fill="#7a0a16" />
          <path d="M-12 -10 L12 -10" stroke="#e8b948" strokeWidth="1" />
          {/* head */}
          <circle cx="0" cy="-20" r="9" fill="#caa07a" />
          {/* hair */}
          <path d="M-9 -22 Q0 -32 9 -22 Q9 -10 0 -8 Q-9 -10 -9 -22 Z" fill="#1a0e05" />
          {/* jasmine in hair */}
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={-7 + i * 3} cy={-26 - (i % 2) * 1} r="1.3" fill="#fffaf0" />
          ))}
          {/* bindi */}
          <circle cx="0" cy="-22" r="0.9" fill="#c1233e" />
          {/* nose ring */}
          <circle cx="-2" cy="-19" r="0.7" fill="none" stroke="#e8b948" strokeWidth="0.3" />
          {/* necklace */}
          <path d="M-7 -13 Q0 -10 7 -13" stroke="#e8b948" strokeWidth="1" fill="none" />
          <circle cx="0" cy="-11" r="1" fill="#e8b948" />
          {/* arms */}
          <path d="M-12 -2 Q-22 8 -16 22" stroke="#caa07a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M12 -2 Q22 8 16 22" stroke="#caa07a" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* bangles */}
          {[16, 13, 10].map((y, i) => (
            <ellipse key={i} cx={-17 + i} cy={y + 4} rx="3" ry="1" fill="#e8b948" />
          ))}
        </g>

        {/* groom (left) */}
        <g transform="translate(168, 165)">
          {/* dhoti */}
          <path d="M-18 0 L-22 56 L22 56 L18 0 Z" fill="#fbf4e0" />
          <path d="M-22 56 L22 56" stroke="#e8b948" strokeWidth="3" />
          <path d="M-22 53 L22 53" stroke="#c08a2c" strokeWidth="0.5" />
          {/* angavastram (shoulder cloth) */}
          <path d="M-18 -8 Q -10 -2 14 6 L 18 0 L -10 -10 Z" fill="#c1233e" opacity="0.9" />
          <path d="M14 6 L 18 0" stroke="#e8b948" strokeWidth="1" />
          {/* torso */}
          <path d="M-12 -10 L-14 0 L14 0 L12 -10 Z" fill="#caa07a" />
          {/* head */}
          <circle cx="0" cy="-20" r="9" fill="#caa07a" />
          {/* hair */}
          <path d="M-9 -22 Q0 -30 9 -22 Q9 -16 6 -14 L-6 -14 Q-9 -16 -9 -22 Z" fill="#1a0e05" />
          {/* tilak */}
          <path d="M-1 -25 L1 -25 L0 -19 Z" fill="#c1233e" />
          {/* arms */}
          <path d="M-12 -2 Q-22 8 -16 22" stroke="#caa07a" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M12 -2 Q22 8 16 22" stroke="#caa07a" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>

        {/* maalai (garland) connecting them */}
        <path
          d="M186 158 Q 200 150 214 158"
          stroke="none"
          fill="none"
        />
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13;
          const x = 186 + (214 - 186) * t;
          const y = 158 - 8 * Math.sin(t * Math.PI);
          return <circle key={i} cx={x} cy={y} r="1.6" fill={i % 2 === 0 ? "#e85a1a" : "#fae3a8"} />;
        })}

        {/* kuthuvilakku lamps left & right of mandapam floor */}
        {[100, 300].map((cx, i) => (
          <g key={i} transform={`translate(${cx}, 220)`}>
            <ellipse cx="0" cy="2" rx="9" ry="2" fill="#5b3008" />
            <rect x="-1.5" y="-22" width="3" height="22" fill="#c08a2c" />
            <ellipse cx="0" cy="-22" rx="6" ry="2" fill="#c08a2c" />
            <path d="M-3 -22 Q0 -32 3 -22 Z" fill="url(#flame)" />
          </g>
        ))}

        {/* banana plants left & right outside mandapam */}
        {[36, 364].map((cx, i) => (
          <g key={i} transform={`translate(${cx}, 232)`}>
            <rect x="-2" y="-50" width="4" height="50" fill="#3d6a2d" />
            {Array.from({ length: 5 }).map((_, j) => (
              <ellipse
                key={j}
                cx={(j % 2 === 0 ? -1 : 1) * (8 + j * 2)}
                cy={-44 + j * 8}
                rx="9"
                ry="3"
                fill="#4a8a36"
                transform={`rotate(${j % 2 === 0 ? -28 : 28} 0 ${-44 + j * 8})`}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* falling jasmine + petals overlay */}
      {Array.from({ length: 26 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: `${-10 - (i % 5) * 12}%`,
            left: `${(i * 3.7) % 100}%`,
            width: 10,
            height: 10,
          }}
          animate={{
            y: ["0vh", "120%"],
            rotate: [0, 540],
            x: [0, ((i % 3) - 1) * 30],
          }}
          transition={{
            duration: 6 + (i % 5) * 1.5,
            delay: -(i % 7) * 0.6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {i % 3 === 0 ? (
            <svg viewBox="0 0 24 24" width="14" height="14">
              {Array.from({ length: 5 }).map((_, k) => (
                <ellipse
                  key={k}
                  cx="12"
                  cy="6"
                  rx="3"
                  ry="6"
                  fill="#fffaf0"
                  transform={`rotate(${k * 72} 12 12)`}
                  opacity="0.9"
                />
              ))}
              <circle cx="12" cy="12" r="1.4" fill="#e6c477" />
            </svg>
          ) : (
            <span
              className="block"
              style={{
                width: 8,
                height: 8,
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg,#f0892b,#c84d10)"
                    : "linear-gradient(135deg,#f6c9b9,#c1233e)",
                borderRadius: "60% 40% 60% 40% / 70% 30% 70% 30%",
              }}
            />
          )}
        </motion.span>
      ))}

      {/* warm vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-[#7a2d05]/25 via-transparent to-[#7a2d05]/15 pointer-events-none" />
    </div>
  );
}
