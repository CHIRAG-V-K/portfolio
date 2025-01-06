import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  ScrollControls,
} from "@react-three/drei";
import CanvasLoader from "../CanvasLoader";
import { useControls } from "leva";
import { Chirag } from "./Chirag";

const Model3DCanvas = () => {
  const { animation } = useControls({
    animation: {
      value: "Wave",
      options: [
        "Wave",
        "Talking",
        "Up",
        "Down",
        "Sitting",
        "PushUp",
        "Shoot",
        "Swing",
      ],
    },
  });
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0">
      <Canvas
        // frameloop="demand"
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
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
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enablePan={true}
            enableRotate={false}
            enableDamping={true} // Enable smooth damping
            dampingFactor={0.05} // Adjust damping factor as needed
          />
          {/* <ScrollControls pages={1}> */}
          {/* <Model scale={canvas.scale} /> */}
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
            <Chirag animation={animation} />
            <mesh scale={5} rotation={10} position-y={-0.001}>
              <planeGeometry />
              <meshStandardMaterial color={"#000"} />
            </mesh>
          </group>
          {/* </ScrollControls> */}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Model3DCanvas;
