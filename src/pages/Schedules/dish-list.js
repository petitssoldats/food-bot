import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

import Modal from 'pages/components/Modal'
import { useGetDishs } from 'flow/dishs'

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
const ListContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  background: white;
`
const RowContainer = styled(motion.div)`
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 8px;
  overflow: hidden;
  padding: 13px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
`

export function DishList (props) {
  const dishs = useGetDishs()
  const { setIsOpen } = props
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return (
    <Container>
      <Title>
        Select a dish
      </Title>
      <ListContainer>
        {
          (dishs || []).map((d) => {
            return (
              <RowContainer
                key={d.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  props.onSelect(d)
                  closeModal()
                }}
              >
                {d.label}
              </RowContainer>
            )
          })
        }
      </ListContainer>
    </Container>
  )
}

export default function DishListWrapper (props) {
  return (
    <Modal
      backgroundColor={props.backgroundColor}
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpen}
    >
      <DishList
        {...props}
      />
    </Modal>
  )
}
