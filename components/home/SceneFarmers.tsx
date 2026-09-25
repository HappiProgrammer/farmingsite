"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FarmerWithNurseryDTO } from "@/lib/services/dto";
import FarmerCard from "@/components/farmers/FarmerCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { fadeUpVariants, fadeOnlyVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/utils/motion";

interface SceneFarmersProps {
  farmersWithNurseries: FarmerWithNurseryDTO[];
}

export default function SceneFarmers({ farmersWithNurseries }: SceneFarmersProps) {
  const preview = farmersWithNurseries.slice(0, 3);
  const reduced = useReducedMotion();
  const fadeUp = reduced ? fadeOnlyVariants : fadeUpVariants;
  const staggerContainer = reduced ? fadeOnlyVariants : staggerContainerVariants;
  const staggerItem = reduced ? fadeOnlyVariants : staggerItemVariants;

  return (
    <section
      id="scene-farmers"
      className="section-padding bg-white"
      aria-labelledby="scene-farmers-heading"
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
            eyebrow="The Farmers"
            heading="Meet the farmers"
            subheading="Each farmer in this directory is a real participant in the AIVDP/SOWEDA programme, with a nursery, a story, and seedlings available for buyers."
            id="scene-farmers-heading"
          />
          <Button href="/farmers" variant="primary" size="md" className="shrink-0">
            View All Farmers →
          </Button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {preview.map(({ farmer, nursery, hasAvailableSeedlings }) => (
            <motion.div key={farmer.id} variants={staggerItem}>
              <FarmerCard
                farmer={farmer}
                nursery={nursery}
                hasAvailableSeedlings={hasAvailableSeedlings}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
