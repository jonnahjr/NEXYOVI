import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

/**
 * Ultra-High-End 3D Isometric Segment for the "N" Logo
 */
const NSegment = ({
 width = 40,
 height = 100,
 depth = 35,
 className = "",
 colorFront = "from-cyan-400 via-blue-500 to-purple-600",
 colorSide = "from-blue-900 via-purple-950 to-black",
 colorTop = "bg-cyan-200",
 clipPathFront = "none"
}) => {
 return (
 <div className={`relative ${className}`} style={{ width, height }}>
 {/* Front Face (Glow Layer) */}
 <div
 className={`absolute inset-0 z-20 bg-gradient-to-br ${colorFront} rounded-sm `}
 style={{ transform: "skewY(-20deg)", clipPath: clipPathFront }}
 />

 {/* Side Face (Right) */}
 <div
 className={`absolute left-full top-0 h-full z-10 bg-gradient-to-b ${colorSide} rounded-sm`}
 style={{ width: depth, transformOrigin: "left", transform: "skewY(20deg) translateX(-1px)" }}
 />

 {/* Top Face (Brightest) */}
 <div
 className={`absolute bottom-full left-0 w-full z-30 ${colorTop} rounded-sm `}
 style={{ height: depth, transformOrigin: "bottom", transform: "skewX(45deg) translateY(1px)" }}
 />

 {/* Internal "Circuitry" effect on front face */}
 <div
 className="absolute inset-0 z-25 opacity-30 pointer-events-none overflow-hidden"
 style={{ transform: "skewY(-20deg)", clipPath: clipPathFront }}
 >
 <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px]" />
 </div>
 </div>
 );
};

const FloatingIconBox = ({ Icon, x, y, delay = 0, color = "cyan" }) => (
 <motion.div
 className="absolute z-50 flex flex-col items-center"
 style={{ left: x, top: y }}
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{
 opacity: 1,
 scale: 1,
 y: [0, -30, 0]
 }}
 transition={{
 opacity: { duration: 1.5 },
 y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay }
 }}
 >
 {/* Minimalist Glass Box */}
 <div className="relative p-6 rounded-[32px] bg-[#0A0C1E]/90 border border-white/20 backdrop-blur-3xl group transition-all duration-500">
 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[32px]" />
 <Icon className={`text-${color}-400 relative z-10`} size={32} />

 {/* Elegant ground connection */}
 <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-[300px] bg-gradient-to-b from-cyan-400/30 to-transparent opacity-50" />
 </div>
 </motion.div>
);

export default function HeroAnimation() {
 return (
 <div className="relative w-full h-[700px] flex items-center justify-center overflow-visible select-none perspective-[1500px] bg-[#02040a]">

 {/* ── 1. BACKGROUND GLOW (REPLACED GRID) ── */}
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
 </div>

 {/* ── 2. HUD DATA RINGS (REDESIGNED CIRCLES) ── */}
 <div className="absolute flex items-center justify-center transform translate-y-[150px]">
 {/* Core Radiance */}
 <div className="absolute w-[450px] h-[450px] bg-blue-600/10 blur-[100px] rounded-full" />

 {/* Thin HUD Style Rings */}
 {[
 { w: 320, s: 15, d: "solid" },
 { w: 400, s: 25, d: "dashed" },
 { w: 500, s: 40, d: "solid" }].map((ring, i) => (
 <motion.div
 key={i}
 className={`absolute rounded-full border border-blue-400/30 ${ring.d === "dashed" ? "border-dashed" : ""}`}
 style={{ width: ring.w, height: ring.w * 0.35, transform: "rotateX(75deg)" }}
 animate={{ rotate: 360 }}
 transition={{ repeat: Infinity, duration: ring.s, ease: "linear" }}
 />
 ))}

 {/* Pulsing Energy Ring */}
 <motion.div
 className="absolute w-[320px] h-[110px] border-2 border-cyan-400/80 rounded-full"
 style={{ transform: "rotateX(75deg)", }}
 animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
 />

 {/* Rapid Outer Ring Sweep */}
 <motion.div
 className="absolute w-[320px] h-[110px] rounded-full z-20"
 style={{
 transform: "rotateX(75deg)",
 borderWidth: "3px",
 borderStyle: "solid",
 borderColor: "transparent",
 borderTopColor: "#00D2FF",
 }}
 animate={{ rotate: -360 }}
 transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
 />
 </div>

 {/* ── 3. THE 3D ISOMETRIC "N" (REDESIGNED) ── */}
 <motion.div
 className="relative z-30 mb-[50px]"
 animate={{ y: [0, -35, 0] }}
 transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
 >
 <div className="flex gap-6 items-start translate-x-[-20px]">
 {/* LEFT BLOCK */}
 <NSegment
 width={50} height={200} depth={40}
 colorFront="from-cyan-400 to-blue-600"
 colorTop="bg-cyan-200"
 clipPathFront="polygon(0 0, 100% 15%, 100% 100%, 0 100%)"
 className="translate-y-[40px]"
 />

 {/* MIDDLE DIAGONAL */}
 <div className="relative">
 <NSegment
 width={50} height={180} depth={40}
 colorFront="from-blue-500 via-blue-600 to-purple-600"
 colorTop="bg-blue-300"
 className="rotate-[-35deg] translate-x-[-20px] translate-y-[60px] "
 />
 </div>

 {/* RIGHT BLOCK */}
 <NSegment
 width={50} height={200} depth={40}
 colorFront="from-blue-400 via-purple-500 to-purple-700"
 colorTop="bg-cyan-300"
 clipPathFront="polygon(0 0, 100% 0, 100% 85%, 0 100%)"
 className="translate-x-[-35px] translate-y-[30px]"
 />
 </div>
 </motion.div>

 {/* ── 4. FLOATING ICONS ── */}
 <div className="absolute inset-0 pointer-events-none">
 <FloatingIconBox Icon={Mail} x="15%" y="15%" delay={0} color="purple" />
 <FloatingIconBox Icon={MessageSquare} x="78%" y="10%" delay={1.5} color="blue" />
 <FloatingIconBox Icon={Phone} x="10%" y="65%" delay={3} color="cyan" />
 <FloatingIconBox Icon={MapPin} x="85%" y="60%" delay={4.5} color="purple" />
 </div>

 {/* ── 5. ELEGANT VERTICAL LINES (REDESIGNED) ── */}
 {[...Array(10)].map((_, i) => (
 <motion.div
 key={i}
 className="absolute w-[1px] bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent z-10"
 style={{
 left: `${8 + i * 9}%`,
 height: `${300 + Math.random() * 400}px`,
 top: `${Math.random() * 20}%`
 }}
 animate={{ opacity: [0.1, 0.4, 0.1] }}
 transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: Math.random() * 2 }}
 >
 {/* Top glowing point */}
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 " />
 </motion.div>
 ))}

 </div>
 );
}

