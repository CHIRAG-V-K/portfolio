import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <div className="mt-28 md:mt-0">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Expertises in</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Tech.</h2>
      </motion.div>

      <div
        className="flex flex-row flex-wrap pt-10  md:pt-[6vh] justify-center gap-4 
      md:gap-6  px-4 md:px-0"
      >
        {technologies.map((technology) => (
          <div
            className="w-14 h-14 sm:w-24 sm:h-24 md:w-23 md:h-23"
            key={technology.name}
          >
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

// export default SectionWrapper(Tech, "tech");
export default Tech;
