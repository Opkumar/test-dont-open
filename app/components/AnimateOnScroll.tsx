"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: "fade" | "slideUp" | "slideRight" | "scale";
  duration?: number;
  delay?: number;
}

export default function AnimateOnScroll({
  children,
  animation = "fade",
  duration = 0.5,
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -75 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
