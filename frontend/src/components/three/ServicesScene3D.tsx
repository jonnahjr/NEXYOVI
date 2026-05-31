import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Shared scroll state ───────────────────────────────────────
// Set by the page via a ref; read by the 3D scene each frame
export const scrollProgress = { current: 0 };

// ── Core Icosahedron ──────────────────────────────────────────
function CoreShape() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const s = scrollProgress.current;
    ref.current.rotation.x = state.clock.elapsedTime * 0.12 + s * 2;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18 + s * 1.5;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#F5A800"
          emissive="#F5A800"
          emissiveIntensity={0.15}
          transparent
          opacity={0.18}
          roughness={0.15}
          metalness={0.9}
          distort={0.2}
          speed={2.5}
        />
      </mesh>
    </Float>
  );
}

// ── Torus Knot ────────────────────────────────────────────────
function TorusKnotRing() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const s = scrollProgress.current;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 + s * 1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2 + s * 0.8;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[2.2, 0.08, 128, 16]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.08} wireframe={false} />
    </mesh>
  );
}

// ── Orbiting Rings ────────────────────────────────────────────
function OrbitingRing({ radius, color, speed, offset = 0, thickness = 0.02 }: {
  radius: number; color: string; speed: number; offset?: number; thickness?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const s = scrollProgress.current;
    ref.current.rotation.z = state.clock.elapsedTime * speed + offset + s * 0.5;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25 + offset) * 0.25 + s * 0.3;
  });
  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - thickness, radius, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Orbiting Dots (small spheres following ring paths) ────────
function OrbitingDot({ radius, color, speed, offset = 0 }: {
  radius: number; color: string; speed: number; offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

// ── Secondary Orbs ────────────────────────────────────────────
function Orb({ position, color, size, speed }: {
  position: [number, number, number]; color: string; size: number; speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    const s = scrollProgress.current;
    ref.current.position.x = position[0] + Math.sin(t) * 0.4 + s * 0.3;
    ref.current.position.y = position[1] + Math.cos(t * 0.7) * 0.4;
    ref.current.position.z = position[2] + Math.sin(t * 0.5) * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

// ── Particle Field ────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#F5A800'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#10b981'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const s = scrollProgress.current;
    ref.current.rotation.y = state.clock.elapsedTime * 0.006 + s * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.004) * 0.04 + s * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        vertexColors
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.6}
      />
    </Points>
  );
}

// ── Connecting Lines (subtle web between particles) ───────────
function ConnectorLines() {
  const ref = useRef<THREE.LineSegments>(null!);
  const positions = useMemo(() => {
    const count = 80;
    const pos: number[] = [];
    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 18;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = (Math.random() - 0.5) * 8;
      const x2 = x1 + (Math.random() - 0.5) * 4;
      const y2 = y1 + (Math.random() - 0.5) * 4;
      const z2 = z1 + (Math.random() - 0.5) * 4;
      pos.push(x1, y1, z1, x2, y2, z2);
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const s = scrollProgress.current;
    ref.current.rotation.y = state.clock.elapsedTime * 0.003 + s * 0.15;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#F5A800" transparent opacity={0.03} />
    </lineSegments>
  );
}

// ── Main Scene ────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />
      <pointLight position={[-5, -3, 2]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, -5, 3]} intensity={0.2} color="#F5A800" />

      <CoreShape />
      <TorusKnotRing />

      <OrbitingRing radius={1.8} color="#F5A800" speed={0.12} thickness={0.025} />
      <OrbitingRing radius={2.6} color="#8b5cf6" speed={-0.08} offset={0.5} thickness={0.02} />
      <OrbitingRing radius={3.5} color="#06b6d4" speed={0.06} offset={1.2} thickness={0.015} />
      <OrbitingRing radius={4.4} color="#10b981" speed={-0.05} offset={2.0} thickness={0.01} />

      <OrbitingDot radius={1.8} color="#F5A800" speed={0.5} />
      <OrbitingDot radius={2.6} color="#8b5cf6" speed={-0.35} offset={0.8} />
      <OrbitingDot radius={3.5} color="#06b6d4" speed={0.25} offset={1.5} />

      <Orb position={[-3, 1.8, -1.5]} color="#F5A800" size={0.18} speed={0.4} />
      <Orb position={[3.5, -2.2, -2.5]} color="#8b5cf6" size={0.14} speed={0.3} />
      <Orb position={[2, 3, -3.5]} color="#06b6d4" size={0.12} speed={0.5} />
      <Orb position={[-4, -2.5, -2]} color="#10b981" size={0.1} speed={0.35} />
      <Orb position={[0, -3.5, -4]} color="#F5A800" size={0.08} speed={0.45} />

      <ParticleField />
      <ConnectorLines />
    </>
  );
}

// ── Exported Canvas ───────────────────────────────────────────
export default function ServicesScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
