import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { motion } from "framer-motion";
import ParallaxTilt from "react-parallax-tilt";
import {
  isMobile,
  isTablet,
  isDesktop,
  isAndroid,
  isIOS,
} from "react-device-detect";
import chirag_png from "../assets/images/chirag.png";
import chirag_gif from "../assets/images/chirag.gif";
import { styles } from "../styles";
import { PopupText } from "../utils";
import { phrases } from "../constants";

const AnimatedHeroText = ({ name, phrases }) => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const typewriter = new Typewriter(typewriterRef.current, {
      loop: true,
      delay: 75,
    });

    phrases.forEach((phrase, i) => {
      typewriter
        .typeString(
          phrase.replace(
            name[i],
            `<span class="text-secondary  transition-colors duration-300">${name[i]}</span>`
          )
        )
        .pauseFor(1000)
        .deleteAll()
        .pauseFor(500);
    });

    typewriter.start();

    return () => {
      typewriter.stop();
    };
  }, [name, phrases]);

  return (
    <div className="hero-text text-3xl max-sm:text-xl font-bold min-h-[4rem]">
      <h1 ref={typewriterRef}></h1>
    </div>
  );
};

const ProfilePictureCircle = ({ src, gifSrc }) => {
  return (
    <ParallaxTilt
      glareEnable={true}
      glareMaxOpacity={0.6}
      scale={1.1}
      perspective={500}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <div className="rounded-full border-white border-2 w-80 h-80 max-sm:w-60 max-sm:h-60 flex justify-center items-center ">
        {/* Use the img tag for displaying either a GIF or PNG */}
        {/* <img
          src={src}
          alt="Profile Picture"
          className="w-full h-full rounded-full object-cover"
        /> */}
        <img
          src={gifSrc}
          alt="Profile Picture GIF"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </ParallaxTilt>
  );
};

const Hero = () => {
  const name = ["Full Stack Developer", "Application Developer"];

  return (
    <section className="relative w-full  mt-[18vh] max-lg:mt-[20vh]">
      <motion.div
        className="absolute inset-0 w-full h-[70vh] rounded-2xl bg-black z-2 blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <div className="relative z-10 w-full h-[70vh] px-6 grid lg:grid-cols-2 grid-flow-rows">
        <div className="flex justify-end max-lg:justify-center p-10 items-center ">
          <ProfilePictureCircle src={chirag_png} gifSrc={chirag_gif} />
        </div>
        <div className="w-full flex flex-col justify-center items-start  max-lg:items-center ">
          {/* <p className={`${styles.heroSubText} `}>Hi 👋, my name is</p>
          <p className={`${styles.heroHeadText} `}>Chirag V K</p> */}
          <p className={`${styles.heroSubText} `}>
            {Array.from("Hi 👋, my name is").map((char, index) => (
              <PopupText key={index} myKey={index}>
                {char}
              </PopupText>
            ))}
          </p>
          <p className={`${styles.heroHeadText} transform `}>
            {Array.from("Chirag V K").map((char, index) => (
              <PopupText key={index} myKey={index}>
                {char}
              </PopupText>
            ))}
          </p>
          <AnimatedHeroText name={name} phrases={phrases} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
