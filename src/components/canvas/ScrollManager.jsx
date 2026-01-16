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

  // Animate Drei scroll when NavBar triggers section change
  useEffect(() => {
    if (
      typeof section === "number" &&
      numSections > 1 &&
      targetScroll.current !== section
    ) {
      // Only animate if not already at target
      targetScroll.current = section;
      animating.current = true;
      const scrollTarget = section / (numSections - 1);
      const animate = () => {
        // Easing for smooth scroll
        data.scroll.current += (scrollTarget - data.scroll.current) * 0.18;
        if (Math.abs(data.scroll.current - scrollTarget) > 0.002) {
          animationFrame.current = requestAnimationFrame(animate);
        } else {
          data.scroll.current = scrollTarget;
          animating.current = false;
        }
      };
      animate();
      return () => cancelAnimationFrame(animationFrame.current);
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
      const midpoint = i * sectionSize;
      const dist = Math.abs(scrollPos - midpoint);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    if (closest !== section) {
      onSectionChange(closest);
      targetScroll.current = closest;
    }
  });

  return null;
};
