import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useScroll } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model3D = () => {
  const memoryBank = useGLTF("./models/memory_bank/scene.gltf");

  // const memoryBank = useLoader(
  //   GLTFLoader,
  //   "./models/memory_bank/scene.gltf",
  //   (loader) => {
  //     const dracoLoader = new DRACOLoader();
  //     dracoLoader.setDecoderPath("/draco-gltf/");
  //     loader.setDRACOLoader(dracoLoader);
  //   },
  //   (xhr) => {
  //     console.log(`GLTF model loaded: ${(xhr.loaded / xhr.total) * 100}%`);
  //   }
  // );

  const meshRef = useRef();
  const scroll = useScroll();

  // useFrame((state, delta) => {
  //   const offset = scroll.offset; // Value between 0 and 1

  //   // Rotate the model based on scroll
  //   mesh.current.rotation.y = offset * Math.PI * 2;

  //   // Move the model up and down
  //   mesh.current.position.y = Math.sin(offset * Math.PI) * 2;

  //   // Scale the model
  //   const scale = 1 + offset * 0.5;
  //   mesh.current.scale.set(scale, scale, scale);
  // });
  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta;
    // meshRef.current.rotation.y += delta;
  });

  return (
    <mesh>
      <primitive object={memoryBank.scene} />
    </mesh>
  );
};

const Model3DCanvas = () => {
  return (
    <div className="w-full h-svh">
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [10, 0, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Model3D />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default Model3DCanvas;
