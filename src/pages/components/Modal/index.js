import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'

const Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 10px;
  z-index: 1;
`

const variants = {
  open: {
    opacity: 1,
    top: 100
  },
  collapsed: {
    opacity: 0,
    top: '80vh'
  }
}

export default function (props) {
  const StopPropagation = useCallback((e) => {
    e.stopPropagation()
  }, [])

  useEffect(() => {
    const onOutsideClick = () => props.setIsOpen(false)
    if (props.isOpen) window.addEventListener('click', onOutsideClick)
    return () => window.removeEventListener('click', onOutsideClick)
  }, [props])

  return (
    <AnimatePresence initial={false}>
      {
        props.isOpen && (
          <Modal
            width={props.width}
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            backgroundColor={props.backgroundColor}
            variants={variants}
            transition={{ type: 'spring', damping: 300, stiffness: 200 }}
            onClick={StopPropagation}
          >
            {props.children}
          </Modal>
        )
      }
    </AnimatePresence>
  )
}
