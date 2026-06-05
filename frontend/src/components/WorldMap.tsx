import { motion } from "framer-motion";

// Visually calibrated coordinates (SVG viewBox 0 0 950 620)
const hq = {
  name: "Addis Ababa",
  type: "MAIN HEADQUARTERS",
  x: 564.06,
  y: 311.45,
};

const africanNodes = [
  { name: "Cape Town", x: 518.94, y: 425.45 },
  { name: "Cairo", x: 459.56, y: 256.82 },
  { name: "Lagos", x: 419.98, y: 282.95 },
  { name: "Nairobi", x: 533.98, y: 261.57 },
  { name: "Dakar", x: 536.35, y: 290.86 },
  { name: "Casablanca", x: 482.52, y: 286.11 },
  { name: "Luanda", x: 477.77, y: 308.28 },
];

export default function WorldMap() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      {/* Container locked to the SVG's native 950:620 aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: "950 / 620" }}>

        {/* World map background image */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="World Map"
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "fill",
            opacity: 0.14,
            filter: "grayscale(100%) invert(100%) brightness(100%)",
          }}
        />

        {/* Unified SVG overlay — same viewBox as the map image */}
        <svg
          className="absolute inset-0 w-full h-full z-10"
          viewBox="0 0 950 620"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A800" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A800" stopOpacity="0.05" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hq-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Animated arcing lines from Addis Ababa to each African node */}
          {africanNodes.map((node, i) => {
            const mx = (hq.x + node.x) / 2;
            const my = Math.min(hq.y, node.y) - 40;
            return (
              <motion.path
                key={node.name}
                d={`M ${hq.x} ${hq.y} Q ${mx} ${my} ${node.x} ${node.y}`}
                fill="none"
                stroke="url(#line-grad)"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.7,
                  pathOffset: [0, 1],
                }}
                transition={{
                  pathLength: { duration: 2, ease: "easeOut", delay: i * 0.3 },
                  opacity: { duration: 1.5, ease: "easeOut", delay: i * 0.3 },
                  pathOffset: {
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                    delay: i * 0.3 + 2,
                  },
                }}
              />
            );
          })}

          {/* African node dots */}
          {africanNodes.map((node, i) => (
            <motion.circle
              key={`dot-${node.name}`}
              cx={node.x}
              cy={node.y}
              r={3}
              fill="#F5A800"
              filter="url(#glow)"
              initial={{ opacity: 0, r: 0 }}
              animate={{ opacity: [0.4, 0.9, 0.4], r: [3, 4, 3] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* HQ pulse rings */}
          <motion.circle
            cx={hq.x}
            cy={hq.y}
            r={6}
            fill="none"
            stroke="#F5A800"
            strokeWidth="1"
            animate={{ r: [6, 20, 26], opacity: [0.7, 0.3, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
          />
          <motion.circle
            cx={hq.x}
            cy={hq.y}
            r={5}
            fill="none"
            stroke="#FFD166"
            strokeWidth="0.8"
            animate={{ r: [5, 15], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
          />

          {/* HQ core dot */}
          <motion.circle
            cx={hq.x}
            cy={hq.y}
            r={5}
            fill="#F5A800"
            stroke="#FFD166"
            strokeWidth="1"
            filter="url(#hq-glow)"
            animate={{ r: [5, 5.8, 5] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />

          {/* HQ label */}
          <g transform={`translate(${hq.x + 8}, ${hq.y - 12})`}>
            <rect
              x="-4" y="-14"
              width="82" height="30"
              rx="4"
              fill="rgba(0,0,0,0.75)"
              stroke="rgba(245,168,0,0.35)"
              strokeWidth="0.6"
            />
            <text x="0" y="-3" fontSize="5" fill="#F5A800" fontFamily="monospace" letterSpacing="1">
              {hq.type}
            </text>
            <text x="0" y="9" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="bold">
              {hq.name}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
