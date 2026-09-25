"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, fadeOnlyVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/utils/motion";

const points = [
  {
    title: "Access to quality planting material",
    body: "[EXPLAIN WHY QUALITY PLANTING MATERIAL IS SCARCE AND WHY IT MATTERS FOR YIELD AND LIVELIHOODS.]",
  },
  {
    title: "Nursery development",
    body: "[EXPLAIN THE BARRIERS TO SETTING UP A VIABLE, PRODUCTIVE NURSERY WITHOUT EXTERNAL SUPPORT.]",
  },
  {
    title: "Farmer support",
    body: "[EXPLAIN THE BROADER SUPPORT GAP — TRAINING, INPUTS, MARKET ACCESS — THAT SMALL-SCALE OIL-PALM FARMERS FACE.]",
  },
];

export default function SceneChallenge() {
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const staggerContainer = reduced ? fadeOnlyVariants : staggerContainerVariants;
  const staggerItem = reduced ? fadeOnlyVariants : staggerItemVariants;

  return (
    <section
      id="scene-challenge"
      className="section-padding bg-surface-dark"
      aria-labelledby="scene-challenge-heading"
    >
      <div className="container-content">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          The Challenge
        </motion.p>

        <motion.h2
          id="scene-challenge-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ delay: 0.08 }}
          className="mb-14 font-display text-display-lg font-bold text-white md:max-w-xl"
        >
          Why quality planting material changes everything.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {points.map((point, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex flex-col gap-4 border-t border-white/10 pt-8"
            >
              <span className="font-display text-4xl font-bold text-white/20 tabular-nums sm:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{point.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
