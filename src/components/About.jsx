import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import ParallaxTilt from "react-parallax-tilt";
import chirag_png from "../assets/images/chirag.png";
import chirag_gif from "../assets/images/chirag.gif";
import { fadeIn, textVariant } from "../utils/motion";
import {
  isMobile,
  isTablet,
  isDesktop,
  isAndroid,
  isIOS,
} from "react-device-detect";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className=" w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-4 sm:py-5 px-4 sm:px-8 md:px-12 min-h-[200px] sm:min-h-[250px] md:min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-contain"
        />

        <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const ProfilePictureCircle = ({ src, gifSrc }) => {
  return (
    <ParallaxTilt
      glareEnable={false}
      glareMaxOpacity={0}
      scale={1.5}
      perspective={600}
      tiltMaxAngleX={1}
      tiltMaxAngleY={10}
    >
      <div className="rounded-full border-white border-2 w-40 h-40 flex justify-center items-center ">
        {/* Use the img tag for displaying either a GIF or PNG */}
        <img
          src={src}
          alt="Profile Picture"
          className="w-full h-full rounded-full object-cover"
        />
        {/* <img
          src={gifSrc}
          alt="Profile Picture GIF"
          className="w-full h-full rounded-full object-cover"
        /> */}
      </div>
    </ParallaxTilt>
  );
};

const About = () => {
  return (
    <div id="about" className="mt-28 md:mt-0">
      
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {!isMobile && <div className="grid grid-cols-3 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full px-2 sm:px-0">
        {/* {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))} */}
        <ProfilePictureCircle src={chirag_png} gifSrc={chirag_gif} />
      </div>}

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="md:mt-4 mt-2 text-white text-xs sm:text-sm md:text-base lg:text-[17px] max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[30px]"
      >
        I am a Full Stack Developer with over 3 years of experience, 
        specializing in building robust solutions across both Java and
         JavaScript ecosystems. My expertise lies in engineering
          high-performance microservices and scalable mobile applications using 
          technologies like Spring Boot, React, and Node.js. Currently, 
          I am focused on developing reactive, cloud-native systems that handle high-throughput
           data and event processing for large-scale enterprise clients.
           I thrive in collaborative environments, leading teams to architect 
           secure backends and exceptional UIs that drive user satisfaction. 
           I am a dynamic problem-solver dedicated to productivity, 
           leveraging multi-cloud strategies and automation to optimize 
           system performance
      </motion.p>
        
        {isMobile && <div className="mt-4 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-3 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full px-2 sm:px-0">
        {/* {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))} */}
        <ProfilePictureCircle src={chirag_png} gifSrc={chirag_gif} />
      </div>}
      
    </div>
  );
};

// export default SectionWrapper(About, "about");
export default About;
