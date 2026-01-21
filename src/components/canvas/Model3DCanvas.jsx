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
import { Chirag } from "./Chirag";
import { Interface } from "../Interface";
import NavBar from "../NavBar";
import SoundToggle from "../SoundToggle";
import { ScrollManager } from "./ScrollManager";
import { ParticlesBackground } from "../../utils";
import { toast } from "react-toastify";

const NUM_SECTIONS = 5; // Update if Interface changes

// Mobile detection utility
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // Check for Android or iOS
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase(),
  );
};

// Desktop position mapping for each section - customize positions here
const SECTION_POSITIONS = {
  0: {
    characterPos: [1.7, -1, 1],
    shadowPos: [-1.7, 0, -1],
    characterRot: [0, 0, 0], // Rotation [x, y, z] in radians
    isStart: false,
    perspective: [2, 2, 5.5],
  },
  1: {
    characterPos: [2, -1, 1],
    shadowPos: [-2, 0, -1],
    characterRot: [0, Math.PI * 0.05, 0], // Slight rotation on Y axis
    isStart: false,
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

// Mobile position mapping - optimized for smaller screens (Android/iOS)
const MOBILE_SECTION_POSITIONS = {
  0: {
    characterPos: [0.25, -1.3, 1],
    shadowPos: [-0.25, 0, -1],
    characterRot: [0, 0, 0],
    isStart: false,
    perspective: [1, 5, 5],
  },
  1: {
    characterPos: [0.7, -1.8, 0.8],
    shadowPos: [-0.7, 0, -0.8],
    characterRot: [0, Math.PI * 0.05, 0],
    isStart: false,
    perspective: [1, 5, 8],
  },
  2: {
    characterPos: [0.3, -2, 1],
    shadowPos: [-0.3, 0, -1],
    characterRot: [0, Math.PI * -0.2, 0],
    isStart: false,
    perspective: [1, 5, 8],
  },
  3: {
    characterPos: [0.6, -2, 1],
    shadowPos: [-0.6, 0, -1],
    characterRot: [0, Math.PI * 0.3, 0],
    isStart: false,
    perspective: [1.5, 1.5, 9],
  },
  4: {
    characterPos: [0.8, -1.6, 0.4],
    shadowPos: [-0.8, 0, -0.4],
    characterRot: [0,0,0],
    isStart: false,
    perspective: [1, 1, 8],
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
  const [isMobile, setIsMobile] = React.useState(false);
  const [canvasHeight, setCanvasHeight] = React.useState("100vh");

  // Detect mobile device on component mount and handle resize
  React.useEffect(() => {
    const detectMobileAndSetHeight = () => {
      const mobile = isMobileDevice();
      setIsMobile(mobile);

      // Calculate canvas height based on device type
      const viewportHeight = window.innerHeight;
      if (mobile) {
        // Mobile: use 1.1x viewport height for content breathing room
        setCanvasHeight(`${viewportHeight * 1.1}px`);
      } else {
        // Desktop: use full viewport height
        setCanvasHeight(`${viewportHeight}px`);
      }
    };

    detectMobileAndSetHeight();

    // Handle window resize
    const handleResize = () => {
      detectMobileAndSetHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionAnimations = useMemo(
    () => ["Wave", "Kick", "PushUp", "Shoot", "TalkingPhone"],
    [],
  );


  // Kick , Swing, TalkingPhone, Talking, Sitting, Down, Up, PushUp, Shoot, Wave
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
        setTimeout(() => {
          setTransitioning(false);
          setPendingSection(null);
          setSection(newSection);
        }, 1000);
      }
    },
    [section],
  );

  // Memoize gl configuration with mobile optimization
  const glConfig = useMemo(
    () => ({
      antialias: false,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      stencil: false,
      depth: true,
    }),
    [isMobile],
  );

  // Select appropriate position set based on device type
  const positionSet = isMobile ? MOBILE_SECTION_POSITIONS : SECTION_POSITIONS;

  // Get current section positions
  const currentPositions = useMemo(
    () => positionSet[section] || positionSet[0],
    [section, positionSet],
  );

  // Calculate DPR and performance based on device
  const dprValue = isMobile
    ? Math.min(window.devicePixelRatio, 1.2)
    : Math.min(window.devicePixelRatio, 1.5);

  const performanceConfig = isMobile
    ? { min: 0.3, max: 0.7 }
    : { min: 0.5, max: 1 };

  return (
    <>
      <ParticlesBackground />
      <NavBar
        onSectionChange={handleSectionChange}
        activeSection={section}
        numSections={NUM_SECTIONS}
      />
      {/* <SoundToggle />{" "} */}
      <div
        className="fixed left-0 right-0 bottom-0 top-0"
        style={{ height: canvasHeight }}
        // onWheel={() => {
        //   if (!toast.isActive("scroll-toast")) {
        //     toast.warn("Scroll has been disabled for better experience", {
        //       toastId: "scroll-toast",
        //       autoClose: 2000,
        //     });
        //   }
        // }}
        // onTouchMove={() => {
        //    if (!toast.isActive("scroll-toast")) {
        //     toast.warn("Scroll has been disabled for better experience", {
        //       toastId: "scroll-toast",
        //       autoClose: 2000,
        //     });
        //   }
        // }}
      >
        <Canvas
          shadows
          gl={glConfig}
          dpr={dprValue}
          performance={performanceConfig}
          onCreated={(state) => {
            state.gl.domElement.style.pointerEvents = "none";
          }}
          events={null}
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
          <pointLight position={[-10, -10, -10]} decay={0} intensity={1} />
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
            <group
              position={currentPositions.characterPos}
              rotation={currentPositions.characterRot}
              onPointerOver={undefined}
              onPointerOut={undefined}
              onPointerDown={undefined}
              onPointerUp={undefined}
              onClick={undefined}
            >
              <MemoizedContactShadows pos={currentPositions.shadowPos} />
              <Chirag
                animation={animation}
                section={section}
                isStart={currentPositions.isStart}
              />
            </group>

            <ScrollControls
              ref={scrollControlsRef}
              pages={NUM_SECTIONS}
              damping={0.1}
            >
              {/* 3D Model group - pointer events disabled to prevent interaction */}

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
                  pointerEvents: "auto",
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

