'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const textureUrls = {
  color: '/images/earth/earth_atmos_2048.jpg',
  specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
  clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
};

type EarthTextures = {
  color: THREE.Texture;
  specular?: THREE.Texture;
  clouds?: THREE.Texture;
};

const Earth = ({ ...props }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [textures, setTextures] = useState<EarthTextures | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    const loadTexture = (url: string) => new Promise<THREE.Texture>((resolve, reject) => {
      loader.load(url, resolve, undefined, reject);
    });

    loadTexture(textureUrls.color)
      .then((color) => {
        if (!cancelled) {
          setTextures({ color });
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    Promise.allSettled([
      loadTexture(textureUrls.specular),
      loadTexture(textureUrls.clouds),
    ]).then(([specularResult, cloudsResult]) => {
      if (cancelled) return;

      setTextures((current) => {
        if (!current) return current;
        return {
          ...current,
          specular: specularResult.status === 'fulfilled' ? specularResult.value : undefined,
          clouds: cloudsResult.status === 'fulfilled' ? cloudsResult.value : undefined,
        };
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

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

  return textures ? (
    <group ref={groupRef} {...props}>
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial 
          map={textures.color}
          bumpMap={textures.color}
          bumpScale={0.05}
          specularMap={textures.specular}
          specular={new THREE.Color('grey')}
        />
      </mesh>

      {/* Clouds */}
      {textures.clouds && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.42, 64, 64]} />
          <meshPhongMaterial
            map={textures.clouds}
            transparent={true}
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Stars */}
      <Stars />
    </group>
  ) : (
    <group ref={groupRef} {...props}>
      <mesh>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshPhongMaterial color={new THREE.Color('#1e40af')} shininess={10} />
      </mesh>
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
