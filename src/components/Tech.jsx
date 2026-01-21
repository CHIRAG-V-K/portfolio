import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <div className="mt-28 md:mt-0">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Skills</p>
        <h2 className={`${styles.sectionHeadText}`}>Technologies.</h2>
      </motion.div>

      <div className='flex flex-row flex-wrap justify-start md:justify-center gap-6 md:gap-10 mt-7'>
        {technologies.map((technology, index) => (
          <div className='w-14 h-14 md:w-28 md:h-28' key={technology.name}>
             <motion.div
              variants={fadeIn("right", "spring", index * 0.1, 0.75)}
              className='w-full green-pink-gradient p-[1px] rounded-full shadow-card'
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div
                className='bg-tertiary rounded-full md:py-5 py-3 flex justify-center items-center flex-col w-full h-full'
              >
                <img
                  src={technology.icon}
                  alt={technology.name}
                  className='md:w-16 md:h-16 w-6 h-6 object-contain'
                />
              </div>
            </motion.div>
            <p className="text-white md:text-[14px] text-[8px] text-center md:mt-2  mt-1 font-bold tracking-wider">
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default SectionWrapper(Tech, "tech");
export default Tech;
