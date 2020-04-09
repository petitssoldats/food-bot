import React from 'react'
import { motion } from 'framer-motion'

const pageVariants = {
  initial: {
    y: '50vh',
    opacity: 0
  },
  in: {
    y: 0,
    opacity: 1
  },
  out: {
    y: '50vh',
    opacity: 0
  }
}

export default function Container (props) {
  return (
    <motion.div
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  )
}
