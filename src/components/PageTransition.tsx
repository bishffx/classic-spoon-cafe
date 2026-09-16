import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
    >
      {children}
    </motion.main>
  )
}