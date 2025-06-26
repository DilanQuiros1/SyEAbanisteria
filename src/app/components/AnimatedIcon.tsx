'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  size?: number;
}

export default function AnimatedIcon({ 
  children, 
  className = '', 
  size = 48 
}: AnimatedIconProps) {
  return (
    <motion.div
      className={className}
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: `${size * 0.6}px`
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
} 