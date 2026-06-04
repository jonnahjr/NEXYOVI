import React from "react";
import { motion } from "framer-motion";

// HQ coordinates based on a standard 2:1 equirectangular SVG map projection
const hq = { name: "Addis Ababa", type: "MAIN HEADQUARTERS", x: 57, y: 50 };

// African distribution nodes
const africanNodes = [
  { x: 55, y: 68 }, // South Africa
  { x: 55, y: 38 }, // Egypt
  { x: 48, y: 48 }, // Nigeria
  { x: 58, y: 53 }, // Kenya
  { x: 40, y: 43 }, // Senegal
  { x: 45, y: 35 }, // Morocco
  { x: 52, y: 56 }, // Angola
];

export default function WorldMap() {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] overflow-hidden">

      {/* Static world map background */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
        alt="World Map"
        className="absolute inset-0 w-full h-full object-fill opacity-15"
        style={{ filter: 'grayscale(100%) invert(100%) brightness(100%)' }}
      />

      {/* SVG layer for distribution lines */}
      <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5A800" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5A800" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {africanNodes.map((node, i) => (
          <motion.path
            key={i}
            d={`M ${hq.x} ${hq.y} Q ${(hq.x + node.x) / 2} ${(hq.y + node.y) / 2 - 4} ${node.x} ${node.y}`}
            fill="none"
            stroke="#F5A800"
            strokeWidth="0.25"
            strokeDasharray="1.5 1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut", delay: i * 0.3 }}
          />
        ))}
      </svg>

      {/* African node dots */}
      {africanNodes.map((node, i) => (
        <div
          key={`node-${i}`}
          className="absolute z-20 w-1 h-1 bg-[#F5A800] rounded-full -translate-x-0.5 -translate-y-0.5 opacity-40"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        />
      ))}

      {/* Headquarters Pin */}
      <div
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${hq.x}%`, top: `${hq.y}%` }}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 w-4 h-4 rounded-full border border-[#F5A800] -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        />

        {/* Core dot */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#F5A800] border border-[#FFD166] -translate-x-1/2 -translate-y-1/2" />

        {/* Label */}
        <div className="absolute bottom-4 left-2 w-max bg-black/80 border border-[#F5A800]/40 px-3 py-2 rounded-lg z-50">
          <p className="text-[9px] font-mono text-[#F5A800] tracking-[0.2em] leading-none mb-1">{hq.type}</p>
          <p className="text-[11px] font-bold text-white tracking-wide leading-none">{hq.name}</p>
        </div>
      </div>
    </div>
  );
}
