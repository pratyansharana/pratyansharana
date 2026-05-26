import React, { memo, useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber/native';
import { Float, RoundedBox, useTexture } from '@react-three/drei/native';
import { MathUtils, Group, MeshBasicMaterial, Texture } from 'three';

import type { EngineeringProject, ProjectId } from '../data/projects';

type PhoneStackProps = {
  projects: EngineeringProject[];
  activeProjectId: ProjectId;
  focusedProjectId?: ProjectId;
  galleryIndex?: number;
  singleMode?: boolean;
  scrollProgress: number;
  motion: {
    x: number;
    y: number;
  };
  onSelect: (project: EngineeringProject) => void;
};

type PhoneModelProps = {
  project: EngineeringProject;
  index: number;
  isActive: boolean;
  isFocused: boolean;
  galleryIndex: number;
  singleMode: boolean;
  scrollProgress: number;
  motion: PhoneStackProps['motion'];
  onSelect: (project: EngineeringProject) => void;
};

// --- Slide & Crossfade Screen Item ---
function SwipeableScreenItem({ 
  item, 
  index, 
  animatedIndexRef,
  isActiveProject
}: { 
  item: any; 
  index: number; 
  animatedIndexRef: React.MutableRefObject<number>;
  isActiveProject: boolean;
}) {
  const groupRef = useRef<Group>(null);
  
  // Load the image texture if it exists
  const texture = item.image ? useTexture(item.image) : null;
  
  // Material refs for animating opacity
  const bgMat = useRef<MeshBasicMaterial>(null);
  const headerMat = useRef<MeshBasicMaterial>(null);
  const card1Mat = useRef<MeshBasicMaterial>(null);
  const card2Mat = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    if (!groupRef.current || !isActiveProject) return;

    const dist = index - animatedIndexRef.current;
    const absDist = Math.abs(dist);

    groupRef.current.position.x = dist * 0.6; 
    groupRef.current.position.z = -absDist * 0.01;
    groupRef.current.scale.setScalar(Math.max(0.9, 1 - absDist * 0.1));

    const baseOpacity = Math.max(0, 1 - absDist * 1.5); 
    groupRef.current.visible = baseOpacity > 0;

    if (bgMat.current) bgMat.current.opacity = baseOpacity;
    if (headerMat.current) headerMat.current.opacity = baseOpacity * 0.9;
    if (card1Mat.current) card1Mat.current.opacity = baseOpacity * 0.15;
    if (card2Mat.current) card2Mat.current.opacity = baseOpacity * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Main Screen Background (Now with Image Texture) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.36, 3.06]} />
        <meshBasicMaterial 
          ref={bgMat} 
          color={texture ? '#ffffff' : item.tone} 
          map={texture as Texture | null} 
          transparent 
        />
      </mesh>
      
      {/* Only show mock UI if there is NO image provided */}
      {!texture && (
        <>
          <mesh position={[-0.35, 1.25, 0.005]}>
             <planeGeometry args={[0.5, 0.08]} />
             <meshBasicMaterial ref={headerMat} color="#ffffff" transparent />
          </mesh>

          <mesh position={[0, 0.4, 0.005]}>
            <planeGeometry args={[1.15, 1.3]} />
            <meshBasicMaterial ref={card1Mat} color="#ffffff" transparent />
          </mesh>
          
          <mesh position={[0, -0.6, 0.005]}>
            <planeGeometry args={[1.15, 0.5]} />
            <meshBasicMaterial ref={card2Mat} color="#ffffff" transparent />
          </mesh>
        </>
      )}
    </group>
  );
}


function ModernSwipeableScreen({ 
  project, 
  externalGalleryIndex, 
  isActive 
}: { 
  project: EngineeringProject; 
  externalGalleryIndex: number;
  isActive: boolean;
}) {
  const [localIndex, setLocalIndex] = useState(0);
  const animatedIndex = useRef(0);
  
  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef<number>(0);
  
  const items = project.gallery && project.gallery.length > 0 ? project.gallery : [{ tone: '#111111', title: 'Default', caption: '', image: '' }];

  useEffect(() => {
    if (externalGalleryIndex !== undefined && externalGalleryIndex < items.length) {
      setLocalIndex(externalGalleryIndex);
    }
  }, [externalGalleryIndex, items.length]);

  useFrame(() => {
    let targetFraction = localIndex;
    
    if (dragStartX.current !== null) {
      const dragDistance = dragCurrentX.current - dragStartX.current;
      targetFraction -= dragDistance * 1.5; 
    }

    if (targetFraction < 0) targetFraction *= 0.5;
    if (targetFraction > items.length - 1) {
      targetFraction = (items.length - 1) + (targetFraction - (items.length - 1)) * 0.5;
    }

    animatedIndex.current = MathUtils.lerp(animatedIndex.current, targetFraction, 0.15);
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragStartX.current = e.point.x;
    dragCurrentX.current = e.point.x;
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (dragStartX.current !== null) {
      e.stopPropagation();
      dragCurrentX.current = e.point.x;
    }
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (dragStartX.current !== null) {
      e.stopPropagation();
      const dragDistance = dragCurrentX.current - dragStartX.current;
      const threshold = 0.2; 

      if (dragDistance > threshold && localIndex > 0) {
        setLocalIndex(i => i - 1);
      } else if (dragDistance < -threshold && localIndex < items.length - 1) {
        setLocalIndex(i => i + 1);
      }
      dragStartX.current = null;
    }
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
  };

  return (
    <group position={[0, 0, 0.081]}>
      <mesh 
        position={[0, 0, 0.02]} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerCancel}
      >
        <planeGeometry args={[1.44, 3.12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {items.map((item, i) => (
        <SwipeableScreenItem 
          key={`${project.id}-screen-${i}`} 
          item={item} 
          index={i} 
          animatedIndexRef={animatedIndex}
          isActiveProject={isActive}
        />
      ))}

      {items.length > 1 && isActive && (
        <group position={[0, -1.4, 0.02]}>
          {items.map((_, dotIndex) => (
            <mesh key={`dot-${dotIndex}`} position={[(dotIndex - (items.length - 1) / 2) * 0.12, 0, 0]}>
              <circleGeometry args={[0.025, 16]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={dotIndex === localIndex ? 0.9 : 0.3} 
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// --- MODERN PHONE CHASSIS ---
function PhoneModel({
  project,
  index,
  isActive,
  isFocused,
  galleryIndex,
  singleMode,
  scrollProgress,
  motion,
  onSelect,
}: PhoneModelProps) {
  const group = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    const baseX = singleMode ? 0 : (index - 1.5) * 1.3;
    const focusScale = singleMode ? 1.05 : isFocused ? 1.15 : isActive ? 1.02 : 0.88;
    
    group.current.position.x += (baseX + motion.x * 0.35 - group.current.position.x) * 0.08;
    group.current.position.y += ((isActive ? 0.05 : -0.2) + scrollProgress * 0.25 - group.current.position.y) * 0.08;
    group.current.position.z += ((isActive ? 0.35 : -0.4) - group.current.position.z) * 0.08;
    group.current.rotation.x += (motion.y * 0.1 + Math.sin(time + index) * 0.02 - group.current.rotation.x) * 0.07;
    group.current.rotation.y += (((singleMode ? -0.15 : index - 1.5) * -0.15) + motion.x * 0.15 - group.current.rotation.y) * 0.07;
    group.current.rotation.z += (((singleMode ? -0.02 : index - 1.5) * 0.025) - group.current.rotation.z) * 0.08;
    group.current.scale.setScalar(group.current.scale.x + (focusScale - group.current.scale.x) * 0.08);
  });

  return (
    <Float speed={1.5 + index * 0.1} floatIntensity={0.15} rotationIntensity={0.05}>
      <group ref={group} onPointerDown={(e) => { e.stopPropagation(); onSelect(project); }}>
        <RoundedBox args={[1.52, 3.24, 0.16]} radius={0.22} smoothness={12}>
          <meshPhysicalMaterial color="#2a2a2c" metalness={0.85} roughness={0.25} clearcoat={0.1} />
        </RoundedBox>

        <RoundedBox args={[1.44, 3.16, 0.165]} radius={0.18} smoothness={12} position={[0, 0, 0.002]}>
          <meshPhysicalMaterial color="#050505" roughness={0.1} metalness={0.5} />
        </RoundedBox>

        <RoundedBox args={[0.42, 0.12, 0.17]} radius={0.06} smoothness={8} position={[0, 1.42, 0.005]}>
          <meshBasicMaterial color="#000000" />
        </RoundedBox>

        {/* SWIPEABLE SCREEN */}
        <ModernSwipeableScreen 
          project={project} 
          externalGalleryIndex={galleryIndex} 
          isActive={isActive} 
        />

        <mesh position={[0.2, 0, 0.09]} rotation={[0, 0, -0.15]}>
          <planeGeometry args={[0.25, 3.3]} />
          <meshBasicMaterial transparent opacity={0.06} color="#ffffff" depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}

function PhoneScene({
  projects,
  activeProjectId,
  focusedProjectId,
  galleryIndex = 0,
  singleMode = false,
  scrollProgress,
  motion,
  onSelect,
}: PhoneStackProps) {
  const sceneProjects = singleMode
    ? projects.filter((project) => project.id === activeProjectId)
    : projects;

  return (
    <>
      <color attach="background" args={['#f9f9f7']} />
      
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={1.2} color="#e0e0ff" />
      <spotLight position={[0, 6, 4]} intensity={1.5} penumbra={1} angle={0.4} />

      <group position={[0, -0.05, 0]} rotation={[0, -0.05, 0]}>
        {sceneProjects.map((project, index) => (
          <PhoneModel
            key={project.id}
            project={project}
            index={index}
            isActive={project.id === activeProjectId}
            isFocused={project.id === focusedProjectId}
            galleryIndex={galleryIndex}
            singleMode={singleMode}
            scrollProgress={scrollProgress}
            motion={motion}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

function ThreePhoneModel(props: PhoneStackProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 32 }}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.1 }}
      style={{ flex: 1, backgroundColor: '#f9f9f7' }}
    >
      {/* REQUIRED: Suspense wrapper when loading external textures */}
      <Suspense fallback={null}>
        <PhoneScene {...props} />
      </Suspense>
    </Canvas>
  );
}

export default memo(ThreePhoneModel);