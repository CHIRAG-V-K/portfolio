import React, { useEffect, useMemo, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Memoized callback to prevent unnecessary re-renders
  const particlesLoaded = useCallback((container) => {
    // Optionally log container info for debugging
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#131313",
        },
      },
      fpsLimit: 120, // Optimized from 200 - still smooth but better performance
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 2, // Reduced from 4
          },
          grab: {
            distance: 200, // Reduced from 300
            duration: 0.3, // Reduced from 0.4
          },
          repulse: {
            distance: 250, // Reduced from 350
            duration: 0.2, // Reduced from 0.3
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 120, // Reduced from 150
          enable: true,
          opacity: 0.4, // Reduced from 0.5
          width: 0.8, // Reduced from 1
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2, // Reduced from 4
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 60, // Reduced from 90
        },
        opacity: {
          value: 0.4, // Reduced from 0.5
        },
        shape: {
          type: "star",
        },
        size: {
          value: { min: 1, max: 4 }, // Reduced max from 6
        },
      },
      detectRetina: false, // Disabled for better performance
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
};

export default ParticlesBackground;
