import React, { useMemo } from "react";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Tech from "./Tech";
import ContactUs from "./ContactUs";

// Mobile detection utility
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipot|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase(),
  );
};

const Section = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [viewportHeight, setViewportHeight] = React.useState(0);

  React.useEffect(() => {
    // Detect mobile on mount
    setIsMobile(isMobileDevice());

    // Set initial viewport height
    setViewportHeight(window.innerHeight);

    // Handle resize for responsive section height
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate section height based on device and viewport
  const sectionHeight = useMemo(() => {
    if (viewportHeight === 0) return "min-h-screen";

    // For mobile: use 1.2x viewport height to allow content breathing room
    if (isMobile) {
      return { minHeight: `${viewportHeight * 1.1}px` };
    }

    // For desktop: use full viewport height
    return { minHeight: `${viewportHeight}px` };
  }, [isMobile, viewportHeight]);

  return (
    <section
      style={typeof sectionHeight === "object" ? sectionHeight : undefined}
      className={`${typeof sectionHeight === "string" ? sectionHeight : ""} w-full max-w-screen-2xl flex flex-col items-start md:justify-center justify-start !px-6 md:!px-[10vw] py-0 `}
    >
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
