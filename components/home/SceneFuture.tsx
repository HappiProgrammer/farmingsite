"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, fadeOnlyVariants } from "@/lib/utils/motion";
import Button from "@/components/ui/Button";

export default function SceneFuture() {
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;

  return (
    <section
      id="scene-future"
      className="relative section-padding overflow-hidden bg-surface-dark"
      aria-labelledby="scene-future-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, transparent, transparent 40px,
            rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px
          )`,
        }}
      />

      <div className="container-content relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          >
            The Future
          </motion.p>

          <motion.h2
            id="scene-future-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="font-display text-display-xl font-bold text-white"
          >
            From support to growth —
            <br />
            <em className="text-white/70">the work continues.</em>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.18 }}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60"
          >
            [FORWARD-LOOKING CLOSE — describe what comes next for AIVDP/SOWEDA
            supported farmers, the expansion of nurseries, and the opportunity
            this creates for buyers, communities, and the wider agricultural
            sector.]
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: 0.26 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="/nurseries" variant="secondary" size="lg">
              Explore the Nurseries
            </Button>
            <Button href="/contact" variant="outline-light" size="lg">
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } } }}
            style={{ originX: 0.5 }}
            className="mt-16 h-px w-24 bg-accent/30"
            aria-hidden="true"
          />

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.45 }}
            className="mt-8 text-xs uppercase tracking-widest text-white/25"
          >
            AIVDP / SOWEDA · Oil-Palm Farmer Development
          </motion.p>
        </div>
      </div>
    </section>
  );
}
