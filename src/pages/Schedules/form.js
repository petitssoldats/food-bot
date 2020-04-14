import styled from '@emotion/styled'
import { useAddSchedule } from 'flow/schedules'
import { motion } from 'framer-motion'
import Modal from 'pages/components/Modal'
import React, { useCallback, useRef } from 'react'

const Container = styled.form`
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h3`
  align-self: center;
  min-width: 80px;
  max-width: 500px;
  color: white;
  font-weight: 800;
  font-size: 20px;
  margin: 0px;
  background: none;
  border: none;
  padding: 10px;
  outline: none;
`

const Label = styled.input`
  border-radius: 5px;
  min-width: 80px;
  width: 400px;
  background: white;
  border: none;
  padding: 10px;
  outline: none;
  margin: 10px;
  font-size: 15px;
  font-weight: 600;
`

const Button = styled(motion.button)`
  margin: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  margin-top: 20px;
  border: 0;
`

export function AddForm (props) {
  const { setIsOpen } = props
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const addSchedule = useAddSchedule(closeModal)
  const label = useRef()

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault()
        addSchedule({
          label: label.current
        })
      }}
    >
      <Title>
    Add a schedule
      </Title>
      <Label
        required
        placeholder='Schedule title'
        onChange={(e) => {
          label.current = e.target.value
        }}
      />
      <Button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
    Submit
      </Button>
    </Container>
  )
}

export default function AddFormWrapper (props) {
  return (
    <Modal
      backgroundColor={props.backgroundColor}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
    >
      {
        props.isOpen && <AddForm {...props} />
      }
    </Modal>
  )
}
