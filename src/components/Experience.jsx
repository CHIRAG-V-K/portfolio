import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineContent,
  TimelineBody,
} from "flowbite-react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <TimelineItem>
      <TimelinePoint />
      <TimelineContent>
        <TimelineBody className="mt-6 ">
          <div className="flex items-center gap-4 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <div
              className="flex justify-center items-center w-16 h-16 rounded-full"
              style={{ background: experience.iconBg }}
            >
              <img
                src={experience.icon}
                alt={experience.company_name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold">
                {experience.title}
              </h3>
              <p className="text-secondary text-base font-semibold m-0">
                {experience.company_name}
              </p>
              <span className="text-xs text-gray-400">{experience.date}</span>
            </div>
          </div>
          <ul className="mt-3 list-disc ml-5 space-y-2 max-w-4xl">
            {experience.points.map((point, index) => (
              <li
                key={`experience-point-${index}`}
                className="text-white-100 text-sm pl-1 tracking-wider break-words"
              >
                {point}
              </li>
            ))}
          </ul>
        </TimelineBody>
      </TimelineContent>
    </TimelineItem>
  );
};

const Experience = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText}`}>Work Experience.</h2>
      </motion.div>

      <div className="mt-10">
        <Timeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
};

// export default SectionWrapper(Experience, "work");
export default Experience;
