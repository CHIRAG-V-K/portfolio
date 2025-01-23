import React, { useState } from "react";
import { ParticlesBackground } from "../utils";
import {
  NavBar,
  Hero,
  About,
  Tech,
  Experience,
  ContactUs,
} from "../components";
import Model3DCanvas from "../components/canvas/Model3DCanvas";
import { useScroll } from "@react-three/drei";
// import { useGLTF } from "@react-three/drei";

const Home = () => {
  // const [loading, setLoading] = useState(false);
  // useGLTF.preload("./models/memory_bank/scene.gltf",((loader)=>
  //   {
  //     setLoading(true);

  //   }
  // ));
  const currentRef = React.useRef(null);

  return (
    <div
      ref={currentRef}
      className="w-screen h-screen bg-transparent flex flex-col items-center justify-center h-svh  overflow-x-hidden"
    >
      <ParticlesBackground />
      <NavBar />
      <div className="relative w-full h-svh max-w-7xl z-0 px-5">
        <Model3DCanvas />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;
