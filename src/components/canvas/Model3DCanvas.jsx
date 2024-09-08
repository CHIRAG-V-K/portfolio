import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Preload,
  ScrollControls,
} from "@react-three/drei";
import { Model } from "./Model";
import CanvasLoader from "../CanvasLoader";
import { useControls } from "leva";

const Model3DCanvas = () => {
  const canvas = useControls("canvas", {
    scale: {
      value: 0.1,
      min: 0,
      max: 1,
    },
  });
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0  ">
      <Canvas
        frameloop="demand"
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[1, -10, 1]} fov={25} />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.2}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight
          position={[-10, -10, -10]}
          decay={0}
          intensity={Math.PI * 2}
        />
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping={true} // Enable smooth damping
            dampingFactor={0.05} // Adjust damping factor as needed
          />
          {/* <ScrollControls pages={1}> */}
          <Model scale={canvas.scale} />
          {/* </ScrollControls> */}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Model3DCanvas;
