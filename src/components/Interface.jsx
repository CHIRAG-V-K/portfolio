import React from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import ContactUs from "./ContactUs";

const Section = ({ children }) => {
  return (
    <section className="h-screen w-screen max-w-screen-2xl flex flex-col items-center justify-center px-[10vw]">
      {children}
    </section>
  );
};

// const Section2 = ({ children }) => {
//   return (
//     <section className="h-full w-screen max-w-screen-2xl flex flex-col items-center justify-center px-[10vw] my-[10vw]">
//       {children}
//     </section>
//   );
// };

export const Interface = () => {
  return (
    <div id="home">
      <Section>
        <Hero />
      </Section>
      <Section>
        <About />
      </Section>
      <Section>
        <Experience />
      </Section>
      <Section>
        <Tech />
      </Section>
      <Section>
        <ContactUs />
      </Section>
    </div>
  );
};
