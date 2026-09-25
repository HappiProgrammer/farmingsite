/**
 * Shared Framer Motion configuration.
 * All animation variants respect prefers-reduced-motion via the
 * `useReducedMotion` hook — import and use `reducedVariants()` in
 * any component that needs a graceful fallback.
 */

import type { Variants } from "framer-motion";

/** Standard ease curve used across all transitions */
export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

/** Fade + translate-up: the standard section-entry animation */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

/** Fade only — used as a reduced-motion fallback */
export const fadeOnlyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Clip-path reveal — image panels entering from left */
export const clipRevealVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

/** Stagger container — wraps a list of animated children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger item — child of staggerContainerVariants */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

/**
 * Returns the appropriate set of variants based on the user's
 * motion preference. Pass `reduced` to get fade-only fallbacks.
 */
export function motionVariants(reduced: boolean) {
  return {
    fadeUp: reduced ? fadeOnlyVariants : fadeUpVariants,
    clipReveal: reduced ? fadeOnlyVariants : clipRevealVariants,
    staggerContainer: reduced ? fadeOnlyVariants : staggerContainerVariants,
    staggerItem: reduced ? fadeOnlyVariants : staggerItemVariants,
  };
}
