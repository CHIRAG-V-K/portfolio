import React from "react";
import {
  Hero,
  NavBar,
  About,
  Tech,
  Experience,
  ContactUs,
  Galaxy,
} from "../components";
import { ParticlesBackground } from "../utils";

const Home = () => {
  return (
    <div className="w-full bg-transparent flex justify-center mt-[10%] h-svh hide-scrollbar">
      <ParticlesBackground />
      <NavBar />
      <div className="relative w-full max-w-7xl z-0  overflow-y-auto overflow-x-hidden">
        <Hero />
        <About />
        <Tech />
        <Experience />
        <div className="relative z-0">
          <ContactUs />
          <Galaxy />
        </div>
      </div>
    </div>
  );
};

export default Home;
