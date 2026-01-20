import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

// ScrollManager: robust Drei/NavBar/section sync
export const ScrollManager = ({
  section,
  onSectionChange,
  numSections,
  transitioning,
}) => {
  const data = useScroll();
  const animating = useRef(false);
  const animationFrame = useRef();
  const targetScroll = useRef(null);
  const lastSection = useRef(section);

  // Animate Drei scroll when NavBar triggers section change
  useEffect(() => {
    if (
      typeof section === "number" &&
      numSections > 1 &&
      (targetScroll.current !== section || lastSection.current !== section)
    ) {
      // NavBar changed section, sync scroll immediately
      targetScroll.current = section;
      lastSection.current = section;
      animating.current = true;

      const scrollTarget = section / (numSections - 1);

      // Directly set scroll for immediate sync
      data.scroll.current = scrollTarget;
      animating.current = false;
    }
  }, [section, numSections, data]);

  // Update section only when scroll passes midpoint between sections
  useFrame(() => {
    if (animating.current || transitioning) return;

    const scrollPos = data.scroll.current;
    const sectionSize = 1 / (numSections - 1);

    // Find the closest section by midpoint threshold
    let closest = 0;
    let minDist = Infinity;

    for (let i = 0; i < numSections; i++) {
      const sectionPos = i * sectionSize;
      const dist = Math.abs(scrollPos - sectionPos);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }

    // Only update if significant change
    if (closest !== lastSection.current) {
      lastSection.current = closest;
      onSectionChange(closest);
    }
  });

  return null;
};
