'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <motion.div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(139, 69, 19, 0.2)',
          borderTop: '4px solid var(--primary-color)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
} 