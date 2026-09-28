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
    <div className="h-screen w-full relative bg-slate-950 overflow-hidden">
      {/* Premium ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(2,6,23,0.8)_100%)] z-0" />
      
      <Canvas className="absolute inset-0" dpr={[1, 1.5]}>
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
        <div className="text-center px-4 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-block mb-6 px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md"
          >
            <span className="text-cyan-300 font-medium tracking-wide text-sm md:text-base uppercase">Available for new opportunities</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-2xl leading-tight"
          >
            Ali <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Shan</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-4xl text-slate-300 drop-shadow-md font-light h-[40px] md:h-[60px] mb-8"
          >
            <TypeAnimation
              sequence={[
                'Data Scientist',
                3000,
                'AI/ML Engineer',
                3000,
                'Full Stack Developer',
                3000,
                'Computer Vision Expert',
                3000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 font-medium"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 group"
            >
              <span>Explore My Work</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-md"
            >
              <span>Contact Me</span>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
