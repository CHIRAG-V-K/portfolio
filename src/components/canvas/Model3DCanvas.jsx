import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
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
    <div className="fixed left-0 right-0 bottom-0 top-0  ">
      <Canvas
        // frameloop="demand"
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={35} />
        <ambientLight intensity={1} />
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
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            // enableDamping={true} // Enable smooth damping
            // dampingFactor={0.05} // Adjust damping factor as needed
          />
          {/* <ScrollControls pages={1}> */}
          {/* <Model scale={canvas.scale} /> */}
          <group position={[0, -1, 0]}>
            <Chirag animation={animation} />
          </group>
          {/* </ScrollControls> */}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Model3DCanvas;
