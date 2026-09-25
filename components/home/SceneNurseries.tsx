"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NurseryWithFarmerDTO } from "@/lib/services/dto";
import NurseryCard from "@/components/shared/NurseryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { fadeUpVariants, fadeOnlyVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/utils/motion";

interface SceneNurseriesProps {
  nurseriesWithFarmers: NurseryWithFarmerDTO[];
}

export default function SceneNurseries({ nurseriesWithFarmers }: SceneNurseriesProps) {
  const preview = nurseriesWithFarmers.slice(0, 3);
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const staggerContainer = reduced ? fadeOnlyVariants : staggerContainerVariants;
  const staggerItem = reduced ? fadeOnlyVariants : staggerItemVariants;

  return (
    <section
      id="scene-nurseries"
      className="section-padding bg-off-white"
      aria-labelledby="scene-nurseries-heading"
    >
      <div className="container-content flex flex-col gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <SectionHeading
            eyebrow="The Nurseries"
            heading="Nursery showcase"
            subheading="Farmer-owned nurseries producing improved oil-palm seedlings. Find the nursery nearest you and contact the farmer directly."
            id="scene-nurseries-heading"
          />
          <Button href="/nurseries" variant="primary" size="md" className="shrink-0">
            Explore All Nurseries →
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {preview.map(({ nursery, farmer }) => (
            <motion.div key={nursery.id} variants={staggerItem}>
              <NurseryCard nursery={nursery} farmer={farmer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
