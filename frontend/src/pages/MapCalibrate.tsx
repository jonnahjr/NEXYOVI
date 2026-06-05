import { useEffect, useRef, useState } from "react";

const CITIES = [
  "Addis Ababa (HQ)",
  "Cape Town",
  "Cairo",
  "Lagos",
  "Nairobi",
  "Dakar",
  "Casablanca",
  "Luanda",
];

type Pin = { name: string; x: number; y: number };

export default function MapCalibrate() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [currentCity, setCurrentCity] = useState(0);
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const [done, setDone] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentCity >= CITIES.length) return;
    const rect = imgRef.current!.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 950).toFixed(2));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 620).toFixed(2));
    const newPin: Pin = { name: CITIES[currentCity], x, y };
    const newPins = [...pins, newPin];
    setPins(newPins);
    if (currentCity + 1 >= CITIES.length) setDone(true);
    setCurrentCity((c) => c + 1);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imgRef.current!.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 950).toFixed(2));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 620).toFixed(2));
    setHover({ x, y });
  };

  const codeOutput = pins.length > 0 ? (() => {
    const hq = pins[0];
    const nodes = pins.slice(1);
    return `// Calibrated coordinates
const hq = {
  name: "Addis Ababa",
  type: "MAIN HEADQUARTERS",
  x: ${hq?.x ?? 0},
  y: ${hq?.y ?? 0},
};

const africanNodes = [
${nodes.map((p, i) => `  { name: "${CITIES[i + 1]}", x: ${p.x}, y: ${p.y} },`).join("\n")}
];`;
  })() : "";

  const reset = () => {
    setPins([]);
    setCurrentCity(0);
    setDone(false);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white flex flex-col items-center py-8 px-4 gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-black text-[#F5A800] mb-1">🗺 Map Pin Calibrator</h1>
        <p className="text-white/60 text-sm">
          {done
            ? "All pins placed! Copy the code below."
            : `Click on the map to place: `}
          {!done && (
            <span className="text-[#F5A800] font-bold ml-1">
              {CITIES[currentCity]}
            </span>
          )}
        </p>
      </div>

      {/* Progress */}
      <div className="flex flex-wrap gap-2 justify-center">
        {CITIES.map((c, i) => (
          <span
            key={c}
            className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
              i < pins.length
                ? "border-green-500/60 bg-green-500/10 text-green-400"
                : i === currentCity
                ? "border-[#F5A800] bg-[#F5A800]/10 text-[#F5A800]"
                : "border-white/10 text-white/30"
            }`}
          >
            {i < pins.length ? "✓ " : i === currentCity ? "▶ " : ""}{c}
          </span>
        ))}
      </div>

      {/* Map */}
      <div
        ref={imgRef}
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        className="relative w-full max-w-[1200px] border border-white/10 rounded-xl overflow-hidden"
        style={{ aspectRatio: "950/620", cursor: done ? "default" : "crosshair" }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="World Map"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "fill", opacity: 0.5, filter: "grayscale(100%) invert(100%) brightness(100%)" }}
        />

        {/* SVG overlay for pins */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 950 620"
          preserveAspectRatio="none"
        >
          {/* Placed pins */}
          {pins.map((pin, i) => (
            <g key={pin.name}>
              <circle cx={pin.x} cy={pin.y} r="6" fill={i === 0 ? "#F5A800" : "#ef4444"} />
              <text
                x={pin.x + 9}
                y={pin.y + 4}
                fontSize="8"
                fill="white"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {CITIES[i]}
              </text>
            </g>
          ))}

          {/* Crosshair at hover */}
          {hover && !done && (
            <>
              <line x1={hover.x} y1={0} x2={hover.x} y2={620} stroke="#F5A800" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.5" />
              <line x1={0} y1={hover.y} x2={950} y2={hover.y} stroke="#F5A800" strokeWidth="0.4" strokeDasharray="3 3" opacity="0.5" />
              <circle cx={hover.x} cy={hover.y} r="3" fill="#F5A800" opacity="0.8" />
            </>
          )}
        </svg>

        {/* Coordinate readout */}
        {hover && (
          <div className="absolute top-2 right-2 bg-black/80 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-[11px] text-[#F5A800] pointer-events-none">
            x: {hover.x} / y: {hover.y}
          </div>
        )}
      </div>

      {/* Output code */}
      {pins.length > 0 && (
        <div className="w-full max-w-[1200px] bg-[#0d0d14] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
              Generated Code → paste into WorldMap.tsx
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(codeOutput)}
                className="text-[11px] font-bold px-4 py-1.5 rounded-lg bg-[#F5A800]/10 border border-[#F5A800]/30 text-[#F5A800] hover:bg-[#F5A800]/20 transition-colors"
              >
                Copy Code
              </button>
              <button
                onClick={reset}
                className="text-[11px] font-bold px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
          <pre className="text-[12px] text-green-400 font-mono whitespace-pre overflow-x-auto leading-relaxed">
            {codeOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
