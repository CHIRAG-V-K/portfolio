import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { use, useEffect } from "react";
import { useRef } from "react";

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props;
  const data = useScroll();
  const lastscroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastscroll.current = data.scroll.current;
      return;
    }
    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastscroll.current && curSection === 0) {
      onSectionChange(1);
    }
    if (
      data.scroll.current < lastscroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    lastscroll.current = data.scroll.current;
  });

  return null;
};
