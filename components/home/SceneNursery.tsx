"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, fadeOnlyVariants, staggerContainerVariants, EASE_OUT } from "@/lib/utils/motion";
import Button from "@/components/ui/Button";

const imageSlots = [
  "Rows of seedlings",
  "Nursery beds",
  "Young palm fronds",
  "Nursery overview",
];

export default function SceneNursery() {
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const staggerContainer = reduced ? fadeOnlyVariants : staggerContainerVariants;

  return (
    <section
      id="scene-nursery"
      className="section-padding overflow-hidden bg-surface-dark"
      aria-labelledby="scene-nursery-heading"
    >
      <div className="container-content">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image mosaic — staggered clip-path reveals */}
          <div className="order-last md:order-first">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3"
            >
              {imageSlots.map((label, i) => (
                <motion.div
                  key={i}
                  variants={
                    reduced
                      ? fadeOnlyVariants
                      : {
                          hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                          visible: {
                            opacity: 1,
                            clipPath: "inset(0 0% 0 0)",
                            transition: {
                              duration: 0.75,
                              ease: EASE_OUT,
                              delay: i * 0.1,
                            },
                          },
                        }
                  }
                  className={[
                    "overflow-hidden rounded-card-lg bg-gradient-to-br from-accent/20 to-surface-dark/60",
                    i === 0 ? "col-span-2 aspect-video" : "aspect-square",
                  ].join(" ")}
                  aria-label={`[${label.toUpperCase()} IMAGE]`}
                >
                  <div className="flex h-full items-center justify-center p-4">
                    <p className="text-center text-xs text-white/30">
                      [{label.toUpperCase()} IMAGE]
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              The Nursery
            </motion.p>
            <motion.h2
              id="scene-nursery-heading"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.08 }}
              className="font-display text-display-lg font-bold text-white"
            >
              A nursery is proof that support took root.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.16 }}
              className="max-w-prose-wide text-base leading-relaxed text-white/70"
            >
              [DESCRIBE THE NURSERIES — what they produce, how they were
              developed, what a farmer-owned nursery means for the community,
              and how improved seedlings affect yield and income.]
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.22 }}
            >
              <Button href="/nurseries" variant="secondary" size="md" className="self-start">
                Explore the Nurseries
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
