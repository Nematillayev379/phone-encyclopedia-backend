import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  phoneName: string;
}

function PhoneModel({ phoneName }: { phoneName: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Phone body */}
      <RoundedBox args={[2.2, 4.2, 0.2]} radius={0.15} smoothness={4}>
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Screen */}
      <RoundedBox args={[2, 3.8, 0.05]} radius={0.1} smoothness={4} position={[0, 0, 0.12]}>
        <meshStandardMaterial
          color="#0f0f23"
          metalness={0.1}
          roughness={0.8}
          emissive="#1a1a4e"
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* Camera bump */}
      <RoundedBox args={[0.8, 0.8, 0.1]} radius={0.15} smoothness={4} position={[-0.6, 1.4, -0.15]}>
        <meshStandardMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Camera lenses */}
      {[[-0.75, 1.55, -0.22], [-0.45, 1.55, -0.22], [-0.75, 1.25, -0.22]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0} />
        </mesh>
      ))}

      {/* Side buttons */}
      <RoundedBox args={[0.05, 0.4, 0.08]} radius={0.02} smoothness={2} position={[1.15, 0.5, 0]}>
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.6, 0.08]} radius={0.02} smoothness={2} position={[-1.15, 0.3, 0]}>
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Phone name */}
      <Text
        position={[0, -2.5, 0.15]}
        fontSize={0.18}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {phoneName}
      </Text>

      {/* Glow effect */}
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#6366f1" />
    </group>
  );
}

export default function PhoneViewer3D({ phoneName }: Props) {
  return (
    <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden glass">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#6366f1" />
        <PhoneModel phoneName={phoneName} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
