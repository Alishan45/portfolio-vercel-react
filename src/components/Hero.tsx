'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Earth from './Earth';

const FallbackEarth = () => (
  <mesh>
    <sphereGeometry args={[2.4, 32, 32]} />
    <meshPhongMaterial color="#1e40af" shininess={10} />
  </mesh>
);

const Hero = () => {
  return (
    <div className="h-screen w-full relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12)_0%,rgba(8,17,38,0.92)_65%)]" />
      
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={300} depth={60} count={2000} factor={7} saturation={0} fade speed={1} />
        <React.Suspense fallback={<FallbackEarth />}>
          <Earth />
        </React.Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl"
          >
            Ali <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Shan</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-300 drop-shadow-md font-light h-[40px] md:h-[48px]"
          >
            <TypeAnimation
              sequence={[
                'Data Scientist',
                3000,
                'AI Engineer',
                2000,
                'ML Engineer',
                2000,
                'Full Stack Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-cyan-100"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 rounded-full transition-all duration-300 inline-flex items-center gap-2 group backdrop-blur-sm"
            >
              <span>View Projects</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
