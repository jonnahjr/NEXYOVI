import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Accurate percentage coordinates based on a standard 2:1 Robinson/Equirectangular SVG map projection.
const locations = [
  // Addis Ababa, Ethiopia (East Africa Horn)
  { name: "Addis Ababa", type: "MAIN HEADQUARTERS", x: 57, y: 50 },
  // Miami, USA (Florida Peninsula)
  { name: "Miami Hub", type: "GLOBAL REMOTE HUB", x: 30, y: 39 },
];

export default function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Gentle auto-panning animation on load
  useEffect(() => {
    controls.start({
      scale: 1.2, // Much gentler zoom
      x: "-5%", // Pan slightly
      transition: { duration: 35, ease: "linear", repeat: Infinity, repeatType: "reverse" }
    });
  }, [controls]);

  return (
    <div 
      className="relative w-full aspect-[2/1] rounded-[32px] overflow-hidden bg-[#02040A] border border-cyan-500/20 shadow-[0_0_80px_rgba(6,182,212,0.15)] group cursor-grab active:cursor-grabbing"
      ref={containerRef}
    >
      
      {/* Cyber Mode Radar Overlay Container (Static over the viewport) */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 pointer-events-none z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-cyan-500/20 rounded-full" style={{ clipPath: "polygon(100% 50%, 100% 0, 0 0, 0 50%)" }} />
      </motion.div>

      {/* Fade Edges smoothly (Static over viewport) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#02040A_100%)] pointer-events-none z-30" />


      {/* THE DRAGGABLE MAP WRAPPER */}
      <motion.div 
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        animate={controls}
        whileHover={{ scale: 1.15, transition: { duration: 1 } }}
        whileTap={{ scale: 1.15 }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
         <div className="relative w-full h-full pointer-events-none">
            
            {/* SOLID VISIBLE WORLD MAP BACKGROUND */}
            <img 
               src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
               alt="Digital Map"
               className="absolute inset-0 w-full h-full object-fill opacity-60"
               style={{
                  filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(180deg) brightness(80%)'
               }}
            />

            {/* Connection SVG Line */}
            <svg className="absolute inset-0 w-full h-full z-20 overflow-visible drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d={`M ${locations[0].x} ${locations[0].y} Q 42 30 ${locations[1].x} ${locations[1].y}`}
                fill="none"
                stroke="url(#cyber-grad)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
              />
              
              <defs>
                <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Pins */}
            {locations.map((loc, i) => (
              <div
                key={i}
                className="absolute z-30 flex flex-col items-center pointer-events-auto"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              >
                {/* Cyber Pulse Ring */}
                <motion.div
                  className={`absolute w-8 h-8 md:w-12 md:h-12 rounded-full border border-cyan-400 opacity-60`}
                  animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: i * 0.2 }}
                />

                {/* Central Target Dot */}
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0B0F2A] border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,1)] -ml-1.5 -mt-1.5 md:-ml-2 md:-mt-2">
                     <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full" />
                  </div>
                  
                  {/* HUD Callout Box */}
                  <div className="absolute bottom-6 left-2 w-max bg-[#0B0F2A]/90 border border-cyan-500/50 p-2 md:p-3 rounded-lg shadow-2xl z-50 transform scale-75 md:scale-100 origin-bottom-left cursor-pointer hover:border-cyan-400 hover:bg-[#101435] transition-colors">
                    <p className="text-[8px] md:text-xs font-mono text-cyan-400 tracking-[0.2em] mb-1 leading-none">
                      {loc.type}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-white tracking-wider leading-none">
                      {loc.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </motion.div>

    </div>
  );
}

