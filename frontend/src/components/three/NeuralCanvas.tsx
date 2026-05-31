import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Particle Field ────────────────────────────────────────────
function ParticleField() {
 const ref = useRef<THREE.Points>(null!);

 const [positions, connections] = useMemo(() => {
 const count = 120;
 const pos = new Float32Array(count * 3);
 const nodes: THREE.Vector3[] = [];

 for (let i = 0; i < count; i++) {
 const x = (Math.random() - 0.5) * 14;
 const y = (Math.random() - 0.5) * 8;
 const z = (Math.random() - 0.5) * 6;
 pos[i * 3] = x;
 pos[i * 3 + 1] = y;
 pos[i * 3 + 2] = z;
 nodes.push(new THREE.Vector3(x, y, z));
 }

 // Build connection lines between nearby nodes
 const linePositions: number[] = [];
 const threshold = 3.5;
 for (let i = 0; i < nodes.length; i++) {
 for (let j = i + 1; j < nodes.length; j++) {
 if (nodes[i].distanceTo(nodes[j]) < threshold) {
 linePositions.push(
 nodes[i].x, nodes[i].y, nodes[i].z,
 nodes[j].x, nodes[j].y, nodes[j].z
 );
 }
 }
 }

 return [pos, new Float32Array(linePositions)];
 }, []);

 useFrame((state) => {
 if (!ref.current) return;
 const t = state.clock.elapsedTime;
 ref.current.rotation.y = t * 0.025;
 ref.current.rotation.x = Math.sin(t * 0.015) * 0.08;
 });

 return (
 <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
 <PointMaterial
 transparent
 color="#FFBF33"
 size={0.06}
 sizeAttenuation
 depthWrite={false}
 opacity={0.8}
 />
 </Points>
 );
}

// ── Connection Lines ──────────────────────────────────────────
function ConnectionLines({ positions }: { positions: Float32Array }) {
 const ref = useRef<THREE.LineSegments>(null!);
 const geo = useMemo(() => {
 const g = new THREE.BufferGeometry();
 g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
 return g;
 }, [positions]);

 useFrame((state) => {
 if (!ref.current) return;
 const t = state.clock.elapsedTime;
 ref.current.rotation.y = t * 0.025;
 ref.current.rotation.x = Math.sin(t * 0.015) * 0.08;
 (ref.current.material as THREE.LineBasicMaterial).opacity =
 0.06 + Math.sin(t * 0.5) * 0.02;
 });

 return (
 <lineSegments ref={ref} geometry={geo}>
 <lineBasicMaterial
 color="#F5A800"
 transparent
 opacity={0.08}
 depthWrite={false}
 />
 </lineSegments>
 );
}

// ── Floating Orb ──────────────────────────────────────────────
function FloatingOrb({ position, color, size }: {
 position: [number, number, number];
 color: string;
 size: number;
}) {
 const ref = useRef<THREE.Mesh>(null!);
 const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
 const offset = useMemo(() => Math.random() * Math.PI * 2, []);

 useFrame((state) => {
 if (!ref.current) return;
 const t = state.clock.elapsedTime;
 ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
 ref.current.position.x = position[0] + Math.cos(t * speed * 0.7 + offset) * 0.2;
 });

 return (
 <mesh ref={ref} position={position}>
 <sphereGeometry args={[size, 16, 16]} />
 <meshBasicMaterial color={color} transparent opacity={0.15} />
 </mesh>
 );
}

// ── Main Scene ────────────────────────────────────────────────
function Scene() {
 const [connections] = useMemo(() => {
 const count = 120;
 const nodes: THREE.Vector3[] = [];
 for (let i = 0; i < count; i++) {
 nodes.push(new THREE.Vector3(
 (Math.random() - 0.5) * 14,
 (Math.random() - 0.5) * 8,
 (Math.random() - 0.5) * 6
 ));
 }
 const linePositions: number[] = [];
 const threshold = 3.5;
 for (let i = 0; i < nodes.length; i++) {
 for (let j = i + 1; j < nodes.length; j++) {
 if (nodes[i].distanceTo(nodes[j]) < threshold) {
 linePositions.push(
 nodes[i].x, nodes[i].y, nodes[i].z,
 nodes[j].x, nodes[j].y, nodes[j].z
 );
 }
 }
 }
 return [new Float32Array(linePositions)];
 }, []);

 return (
 <>
 <ParticleField />
 <ConnectionLines positions={connections} />
 <FloatingOrb position={[-3, 1, -2]} color="#F5A800" size={0.4} />
 <FloatingOrb position={[4, -1, -3]} color="#06b6d4" size={0.3} />
 <FloatingOrb position={[1, 2, -4]} color="#8b5cf6" size={0.25} />
 <FloatingOrb position={[-5, -2, -1]} color="#10b981" size={0.2} />
 </>
 );
}

// ── Exported Canvas ───────────────────────────────────────────
export default function NeuralCanvas() {
 return (
 <Canvas
 camera={{ position: [0, 0, 8], fov: 60 }}
 gl={{ antialias: true, alpha: true }}
 dpr={[1, 1.5]}
 style={{ background: 'transparent' }}
 >
 <ambientLight intensity={0.3} />
 <Scene />
 </Canvas>
 );
}
