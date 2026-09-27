'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

const Earth = (props: ThreeElements['group']) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [colorMap, specularMap, cloudsMap] = useTexture([
    '/images/earth/earth_atmos_2048.jpg',
    '/images/earth/earth_specular_2048.jpg',
    '/images/earth/earth_clouds_1024.png',
  ]);

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      
      // Mouse interaction for a smoother feel
      const mouseX = pointer.x * 2;
      const mouseY = pointer.y * 2;
      
      groupRef.current.rotation.y += (mouseX * 0.05 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouseY * 0.05 - groupRef.current.rotation.x) * 0.1;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap}
          bumpMap={colorMap}
          bumpScale={0.05}
          specularMap={specularMap}
          specular={new THREE.Color('grey')}
        />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.42, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default Earth;
