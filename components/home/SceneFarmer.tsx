"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, fadeOnlyVariants, clipRevealVariants, EASE_OUT } from "@/lib/utils/motion";

export default function SceneFarmer() {
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const clipReveal = reduced ? fadeOnlyVariants : clipRevealVariants;

  return (
    <section
      id="scene-farmer"
      className="section-padding bg-white"
      aria-labelledby="scene-farmer-heading"
    >
      <div className="container-content">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              The Farmer
            </motion.p>
            <motion.h2
              id="scene-farmer-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.08 }}
              className="font-display text-display-lg font-bold text-ink"
            >
              Real farmers.{" "}
              <span className="text-accent">Real stories.</span>{" "}
              Real impact.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.16 }}
              className="max-w-prose-wide text-base leading-relaxed text-ink-mid"
            >
              [PROJECT DESCRIPTION — introduce the people at the centre of this
              initiative. Who are the farmers? What do they grow? Where do they
              live? Why does access to quality planting material change their
              lives?]
            </motion.p>
          </div>

          {/* Image reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={clipReveal}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.1 }}
            className="relative aspect-[3/2] overflow-hidden rounded-card-lg bg-gradient-to-br from-accent/20 to-off-white md:aspect-[4/3]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-center text-sm text-ink-light">[FARMER PORTRAIT IMAGE]</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
