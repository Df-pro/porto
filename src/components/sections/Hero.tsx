'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import TypeWriter from '@/components/ui/TypeWriter';

// Three.js Particle Network Component
function ParticleNetwork() {
  const ref = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const particleCount = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const velocities = useMemo(() => {
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return vel;
  }, []);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    // Max connections
    const maxLines = particleCount * 10;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    const posArray = ref.current.geometry.attributes.position.array as Float32Array;

    // Move particles
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary bounce
      for (let axis = 0; axis < 3; axis++) {
        const limit = axis === 2 ? 3 : axis === 1 ? 4 : 6;
        if (Math.abs(posArray[i * 3 + axis]) > limit) {
          velocities[i * 3 + axis] *= -1;
        }
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    if (lineRef.current) {
      const linePositions = lineGeometry.attributes.position.array as Float32Array;
      const lineColors = lineGeometry.attributes.color.array as Float32Array;
      let lineIndex = 0;
      const connectionDistance = 2.5;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance && lineIndex < (linePositions.length / 6)) {
            const alpha = 1 - dist / connectionDistance;
            const idx = lineIndex * 6;

            linePositions[idx] = posArray[i * 3];
            linePositions[idx + 1] = posArray[i * 3 + 1];
            linePositions[idx + 2] = posArray[i * 3 + 2];
            linePositions[idx + 3] = posArray[j * 3];
            linePositions[idx + 4] = posArray[j * 3 + 1];
            linePositions[idx + 5] = posArray[j * 3 + 2];

            // Green to cyan gradient
            const green = alpha * 0.5;
            const blue = alpha * 0.3;
            lineColors[idx] = 0;
            lineColors[idx + 1] = green;
            lineColors[idx + 2] = blue;
            lineColors[idx + 3] = 0;
            lineColors[idx + 4] = green;
            lineColors[idx + 5] = blue;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00ff88"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export default function Hero() {
  const roles = [
    'AI Engineer',
    'Machine Learning Enthusiast',
    'Cybersecurity Researcher',
    'Embedded Systems Developer',
  ];

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <ParticleNetwork />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(8,12,16,0.3) 50%, #080c10 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center px-4 max-w-4xl mx-auto">
        {/* System Online Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-green/20 bg-accent-green/5 font-mono text-xs text-accent-green tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            [ SYSTEM ONLINE ]
          </span>
        </motion.div>

        {/* Main Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.4, duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-wider mb-4 text-text-primary">
            <GlitchText text="DWI FERDIANTO" as="span" />
          </h1>
        </motion.div>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 0.5 }}
          className="h-8 mb-6"
        >
          <span className="font-mono text-lg sm:text-xl text-accent-cyan">
            {'> '}
            <TypeWriter texts={roles} speed={70} deleteSpeed={35} pauseDuration={2000} />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0, duration: 0.5 }}
          className="font-mono text-sm sm:text-base text-text-secondary mb-10 tracking-wide"
        >
          &ldquo;Building Intelligent Systems. Breaking Weak Ones.&rdquo;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-cyber btn-cyber-filled"
          >
            [ EXPLORE PROJECTS ]
          </button>
          <button
            className="btn-cyber btn-cyber-cyan"
            onClick={() => {
              const event = new CustomEvent('openWalletModal');
              window.dispatchEvent(event);
            }}
          >
            [ CONNECT WALLET ]
          </button>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.4, duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-accent-green/70 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            AVAILABLE FOR COLLABORATION
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.6, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-text-muted tracking-widest">SCROLL</span>
          <svg
            className="w-5 h-5 text-accent-green/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
