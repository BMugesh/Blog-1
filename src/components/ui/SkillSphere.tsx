import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

export interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

interface SkillPoint {
  position: [number, number, number];
  scale: number;
  skill: Skill;
}

interface SkillSphereProps {
  skills: Skill[];
  onHover: (skill: Skill | null) => void;
  onClick: (skill: Skill) => void;
}

const SkillSphere: React.FC<SkillSphereProps> = ({ skills, onHover, onClick }) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Generate points on a sphere
  const points = useMemo<SkillPoint[]>(() => {
    const points: SkillPoint[] = [];
    const numPoints = skills.length;
    
    for (let i = 0; i < numPoints; i++) {
      // Distribute points on a sphere using the golden spiral algorithm
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      
      const x = Math.cos(theta) * radius * 0.8;
      const z = Math.sin(theta) * radius * 0.8;
      
      // Scale the position based on skill level (higher level = further out)
      const scale = 0.7 + (skills[i].level / 100) * 0.5;
      
      points.push({
        position: [x, y * 0.8, z] as [number, number, number],
        scale: scale,
        skill: skills[i]
      });
    }
    
    return points;
  }, [skills]);

  // Animation loop
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  const handlePointerOver = (skill: Skill) => {
    document.body.style.cursor = 'pointer';
    onHover(skill);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    onHover(null);
  };

  // Add error boundary
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <group ref={groupRef}>
        {/* Glowing sphere in the center */}
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
          <pointLight 
            color="#00f0ff" 
            intensity={1.5} 
            distance={6}
          />
        </mesh>

        {/* Skill points */}
        {points.map((point, i) => {
          const { position, scale, skill } = point;
          const size = 0.1 + (skill.level / 100) * 0.2;
          
          return (
            <group key={i} position={position as [number, number, number]}>
              <mesh
                scale={size * scale}
                onPointerOver={() => handlePointerOver(skill)}
                onPointerOut={handlePointerOut}
                onClick={() => onClick(skill)}
              >
                <sphereGeometry args={[1, 8, 8]} />
                <meshStandardMaterial 
                  color={skill.color} 
                  emissive={skill.color}
                  emissiveIntensity={0.5}
                  roughness={0.5}
                  metalness={0.8}
                />
              </mesh>
              
              {/* Connection line to center */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([0, 0, 0, position[0], position[1], position[2]])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial 
                  color={skill.color} 
                  opacity={0.3} 
                  transparent 
                  linewidth={1}
                />
              </line>
              
              {/* Skill icon/text */}
              <Text
                position={[position[0] * 1.2, position[1] * 1.2, position[2] * 1.2]}
                fontSize={0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {skill.icon}
              </Text>
            </group>
          );
        })}
        
        {/* Glow effect */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#00f0ff" 
            transparent 
            opacity={0.1} 
            depthWrite={false}
          />
        </mesh>
      </group>
    </Suspense>
  );
};

// Wrapper component to ensure proper cleanup and error handling
const SkillSphereWrapper: React.FC<SkillSphereProps> = (props) => {
  return (
    <Canvas
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <SkillSphere {...props} />
      </Suspense>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default SkillSphereWrapper;
