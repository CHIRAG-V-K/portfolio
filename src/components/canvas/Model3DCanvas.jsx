import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
  BakeShadows,
} from "@react-three/drei";
import CanvasLoader from "../CanvasLoader";
import { useControls } from "leva";
import { Chirag } from "./Chirag";
import Home from "../../routes/Home";
import { Interface } from "../Interface";
import NavBar from "../NavBar";
import SoundToggle from "../SoundToggle";
import { ScrollManager } from "./ScrollManager";
import { ParticlesBackground } from "../../utils";

const NUM_SECTIONS = 5; // Update if Interface changes

// Position mapping for each section - customize positions here
const SECTION_POSITIONS = {
  0: {
    characterPos: [1.5, -1, 1],
    shadowPos: [-1.5, 0, -1],
    characterRot: [0, 0, 0], // Rotation [x, y, z] in radians
    isStart: false,
    perspective: [2, 2, 5],
  },
  1: {
    characterPos: [2, -1, 1],
    shadowPos: [-2, 0, -1],
    characterRot: [0, Math.PI * 0.05, 0], // Slight rotation on Y axis
    isStart: true,
    perspective: [2, 2, 5],
  },
  2: {
    characterPos: [2, -1, 1],
    shadowPos: [-2, 0, -1],
    characterRot: [0, Math.PI * -0.1, 0], // Slight rotation opposite direction
    isStart: false,
    perspective: [2, 2, 5],
  },
  3: {
    characterPos: [2, -1, 1],
    shadowPos: [-2, 0, -1],
    characterRot: [0, Math.PI * 0.3, 0],
    isStart: false,
    perspective: [2, 2, 5],
  },
  4: {
    characterPos: [2, -1, 0.4],
    shadowPos: [-2, 0, -0.4],
    characterRot: [0, 0, 0],
    isStart: false,
    perspective: [2, 2, 5],
  },
};

// Memoized shadow component to prevent unnecessary re-renders
const MemoizedContactShadows = React.memo(({ pos }) => (
  <ContactShadows
    opacity={0.8}
    scale={10}
    blur={1.5}
    far={20}
    resolution={128}
    color="#ffffff"
    position={pos}
  />
));

MemoizedContactShadows.displayName = "MemoizedContactShadows";

const Model3DCanvas = () => {
  const [section, setSection] = React.useState(0);
  const [pendingSection, setPendingSection] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const sectionAnimations = useMemo(
    () => ["Wave", "Up", "PushUp", "Shoot", "Talking"],
    [],
  );
  const animation = transitioning
    ? "Down"
    : sectionAnimations[section] || "Wave";

  // Ref for Drei ScrollControls
  const scrollControlsRef = useRef();

  // Handler for NavBar navigation
  const handleSectionChange = React.useCallback(
    (newSection) => {
      if (newSection !== section) {
        setTransitioning(true);
        setPendingSection(newSection);
        setSection(newSection);
        setTimeout(() => {
          setTransitioning(false);
          setPendingSection(null);
        }, 300);
      }
    },
    [section],
  );

  // Memoize gl configuration
  const glConfig = useMemo(
    () => ({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    }),
    [],
  );

  // Get current section positions
  const currentPositions = useMemo(
    () => SECTION_POSITIONS[section] || SECTION_POSITIONS[0],
    [section],
  );

  return (
    <>
      <ParticlesBackground />
      <NavBar
        onSectionChange={handleSectionChange}
        activeSection={section}
        numSections={NUM_SECTIONS}
      />
      {/* <SoundToggle />{" "} */}
      <div className="fixed left-0 right-0 bottom-0 top-0">
        <Canvas
          shadows
          gl={glConfig}
          dpr={Math.min(window.devicePixelRatio, 1.5)}
          performance={{ min: 0.5 }}
          style={{ pointerEvents: "none", touchAction: "auto" }}
        >
          <PerspectiveCamera
            makeDefault
            position={currentPositions.perspective}
            fov={35}
          />
          <Environment preset="sunset" />
          <spotLight
            position={[10, 10, 10]}
            angle={0.2}
            penumbra={1}
            decay={0}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
          />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={0.8} />
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enabled={true}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              enablePan={false}
              enableRotate={false}
              enableDamping={false}
            />
            <ScrollControls
              ref={scrollControlsRef}
              pages={NUM_SECTIONS}
              damping={0.1}
            >
              <group
                position={currentPositions.characterPos}
                rotation={currentPositions.characterRot}
              >
                <MemoizedContactShadows pos={currentPositions.shadowPos} />
                <Chirag
                  animation={animation}
                  section={section}
                  isStart={currentPositions.isStart}
                />
              </group>
              <ScrollManager
                section={section}
                onSectionChange={setSection}
                numSections={NUM_SECTIONS}
                transitioning={transitioning}
              />
              <Scroll
                html
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Interface />
              </Scroll>
            </ScrollControls>
          </Suspense>
          <Preload all />
        </Canvas>
      </div>
    </>
  );
};

export default Model3DCanvas;
