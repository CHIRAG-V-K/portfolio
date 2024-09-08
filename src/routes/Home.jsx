import React, { useState } from "react";
import { ParticlesBackground } from "../utils";
import {
  NavBar,
  Hero,
  Model3D,
  About,
  Tech,
  Experience,
  ContactUs,
  Galaxy,
} from "../components";
import Model3DCanvas from "../components/Model3DCanvas";
// import { useGLTF } from "@react-three/drei";

const Home = () => {
  // const [loading, setLoading] = useState(false);
  // useGLTF.preload("./models/memory_bank/scene.gltf",((loader)=>
  //   {
  //     setLoading(true);

  //   }
  // ));

  return (
    <div className="w-full bg-transparent flex flex-col items-center justify-center h-svh overflow-y-auto overflow-x-hidden">
      <ParticlesBackground />
      <NavBar />
      <div className="relative w-full h-svh max-w-7xl z-0 px-5">
        <Hero />
        <Model3DCanvas />
        {/* <About />
        <Tech />
        <Experience />
        <ContactUs />
        <Galaxy /> */}
      </div>
    </div>
  );
};

export default Home;
