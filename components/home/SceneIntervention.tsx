"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { OrganizationDTO } from "@/lib/services/dto";
import { fadeUpVariants, fadeOnlyVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/utils/motion";

interface SceneInterventionProps {
  organizations: OrganizationDTO[];
}

export default function SceneIntervention({ organizations }: SceneInterventionProps) {
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const staggerContainer = reduced ? fadeOnlyVariants : staggerContainerVariants;
  const staggerItem = reduced ? fadeOnlyVariants : staggerItemVariants;

  return (
    <section
      id="scene-intervention"
      className="section-padding bg-off-white"
      aria-labelledby="scene-intervention-heading"
    >
      <div className="container-content">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-20">
          {/* Pull quote */}
          <div className="sticky top-28 flex flex-col gap-6">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              The Intervention
            </motion.p>
            <motion.blockquote
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              <p className="font-display text-display-md font-bold italic leading-snug text-ink">
                &ldquo;Support is more than distribution. It is the beginning of growth.&rdquo;
              </p>
            </motion.blockquote>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: 0.18 }}
              className="text-sm leading-relaxed text-ink-mid"
            >
              [DESCRIBE AIVDP/SOWEDA&apos;S SPECIFIC APPROACH — what support was
              provided, how it was structured, and what makes this intervention
              different from generic agricultural aid.]
            </motion.p>
          </div>

          {/* Org cards — staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            {organizations.map((org) => (
              <motion.div
                key={org.id}
                variants={staggerItem}
                className="rounded-card-lg border border-border bg-white p-7 shadow-sm"
              >
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {org.role}
                </p>
                <h3 className="mb-3 font-display text-xl font-bold text-ink">
                  {org.acronym}
                </h3>
                <p className="text-sm leading-relaxed text-ink-mid">
                  {org.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
