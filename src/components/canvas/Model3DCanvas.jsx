import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import CanvasLoader from "../CanvasLoader";
import { useControls } from "leva";
import { Chirag } from "./Chirag";
import Home from "../../routes/Home";
import { Interface } from "../Interface";
import NavBar from "../NavBar";
import { ScrollManager } from "./ScrollManager";
import { ParticlesBackground } from "../../utils";

const NUM_SECTIONS = 5; // Update if Interface changes

const Model3DCanvas = () => {
  const [section, setSection] = React.useState(0);
  const [pendingSection, setPendingSection] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const sectionAnimations = ["Wave", "Sitting", "PushUp", "Shoot", "Talking"];
  const animation = transitioning
    ? "Down"
    : sectionAnimations[section] || "Wave";

  // Handler for NavBar navigation
  const handleSectionChange = (newSection) => {
    if (newSection !== section) {
      setTransitioning(true);
      setPendingSection(newSection);
      setTimeout(() => {
        setSection(newSection);
        setTransitioning(false);
        setPendingSection(null);
      }, 600); // 600ms for Down animation
    }
  };

  return (
    <>
      <ParticlesBackground />
      <NavBar
        onSectionChange={handleSectionChange}
        activeSection={section}
        numSections={NUM_SECTIONS}
      />
      <div className="fixed left-0 right-0 bottom-0 top-0">
        <Canvas shadows gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={35} />
          <Environment preset="sunset" />
          <spotLight
            position={[10, 10, 10]}
            angle={0.2}
            penumbra={1}
            decay={0}
            intensity={2}
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
              enableDamping={true}
              dampingFactor={0.1}
            />
            <ScrollControls pages={NUM_SECTIONS} damping={0.1}>
              <group position={[-1.3, -1, 0]}>
                <ContactShadows
                  opacity={1}
                  scale={10}
                  blur={1}
                  far={20}
                  resolution={256}
                  color="#fff"
                  position={[1.3, 0, 0]}
                />
                <Chirag animation={animation} section={section} />
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
