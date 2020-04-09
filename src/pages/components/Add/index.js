import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const Container = styled.div`
  position: fixed;
  left: calc(100vw - 70px);
  cursor: pointer;
`

export default function (props) {
  const TogglFn = useCallback(() => {
    props.setIsOpen((v) => !v)
  }, [props])

  return (
    <>
      <Container>
        <motion.svg
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          width='40' height='40'
          onClick={TogglFn}
        >
          <circle cx='20' cy='20' r='20' fill={props.backgroundColor} />
          <rect x='31' y='18' rx='2' width='4' height='23' transform='rotate(90 31 18)' fill='white' />
          <motion.rect
            x='18' y='8'
            rx='2'
            width='4' height='24'
            fill='white'
            initial='closed'
            animate={props.isOpen ? 'open' : 'closed'}
            variants={{
              open: { transform: 'rotate(90deg)' },
              closed: { transform: 'rotate(0deg)' }
            }}
          />
        </motion.svg>
      </Container>
    </>
  )
}
