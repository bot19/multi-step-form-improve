import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useIsMobile } from '../hooks/useMediaQuery';

interface AnimatedContentProps {
  children: ReactNode;
  stepKey: string;
  className?: string;
}

export const AnimatedContent = ({
  children,
  stepKey,
  className = '',
}: AnimatedContentProps) => {
  const isMobile = useIsMobile();

  // On mobile, render without animations
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  // On desktop/tablet, render with animations
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        className={className}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -150, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
