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
import { phrases, name } from "../constants";
import { HeroWrapper } from "../hoc";

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
    <div className="hero-text text-3xl max-sm:text-lg font-bold min-h-[4rem] ">
      <h1 ref={typewriterRef}></h1>
    </div>
  );
};

const ProfilePictureCircle = ({ src, gifSrc }) => {
  return (
    <ParallaxTilt
      glareEnable={false}
      glareMaxOpacity={0}
      scale={1.2}
      perspective={600}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
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
  return (
    <div className="relative w-full mt-[4vh]">
      <motion.div
        className="absolute inset-0 w-full h-[75vh] rounded-2xl bg-black  blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <div className="relative w-full h-[75vh]  grid lg:grid-cols-2 grid-flow-rows">
        <div className="flex justify-center p-5 items-center ">
          {/* <ProfilePictureCircle src={chirag_png} gifSrc={chirag_gif} /> */}
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
    </div>
  );
};

// export default HeroWrapper(Hero, "hero");
export default Hero;
