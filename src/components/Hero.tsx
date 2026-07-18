'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Earth from './Earth';

const Hero = () => {
  return (
    <div className="h-screen w-full relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12)_0%,rgba(8,17,38,0.92)_65%)]" />
      
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={300} depth={60} count={2000} factor={7} saturation={0} fade speed={1} />
        <Earth />
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
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Ali Shan
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 drop-shadow"
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
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300 inline-block"
            >
              View Projects
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
