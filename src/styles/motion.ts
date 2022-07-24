import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

const overlayAnimation: ComponentProps<typeof motion.div> = {
  initial: 'closed',
  animate: 'open',
  exit: 'closed',
  variants: {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.39, 0.57, 0.56, 1]
      }
    },
    closed: {
      opacity: 0,
      transition: {
        delay: 0.1,
        duration: 0.2,
        ease: [0.47, 0, 0.75, 0.72]
      }
    }
  }
};

const sideNavAnimation: ComponentProps<typeof motion.div> = {
  initial: {
    x: -260
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.39, 0.57, 0.56, 1]
    }
  },
  exit: {
    x: -260,
    transition: {
      duration: 0.2,
      ease: [0.47, 0, 0.75, 0.72]
    }
  }
};

export const pageMotion: ComponentProps<typeof motion.main> = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
  transition: {
    duration: 0.25,
    ease: [0.25, 0.1, 0.25, 1]
  }
};

export const commonMotion = {
  overlay: overlayAnimation
};

export const navMotion = {
  sideMenu: sideNavAnimation
};
