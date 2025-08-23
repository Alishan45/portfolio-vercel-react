'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ({ ...props }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [colorMap, bumpMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png'
  ], () => setIsLoading(false));

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      
      // Mouse interaction
      const mouseX = pointer.x * 2;
      const mouseY = pointer.y * 2;
      
      groupRef.current.rotation.y += (mouseX * 0.01 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouseY * 0.01 - groupRef.current.rotation.x) * 0.1;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0012;
    }
  });

  // Fallback while loading
  if (isLoading) {
    return (
      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshPhongMaterial color={new THREE.Color('#1e40af')} shininess={10} />
      </mesh>
    );
  }

  return (
    <group ref={groupRef} {...props}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap}
          bumpMap={bumpMap}
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
        />
      </mesh>

      {/* Stars */}
      <Stars />
    </group>
  );
};

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  const [vertices, setVertices] = useState<number[]>([]);

  useEffect(() => {
    const newVertices = [];
    for (let i = 0; i < 10000; i++) {
      newVertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    setVertices(newVertices);
  }, []);

  if (vertices.length === 0) {
    return null;
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(vertices), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0xFFFFFF}
        size={0.1}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default Earth;
