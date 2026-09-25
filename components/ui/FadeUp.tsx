"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { fadeUpVariants, fadeOnlyVariants } from "@/lib/utils/motion";

interface FadeUpProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "variants" | "viewport"> {
  delay?: number;
}

export default function FadeUp({
  children,
  delay = 0,
  className,
  ...rest
}: FadeUpProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? fadeOnlyVariants : fadeUpVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
