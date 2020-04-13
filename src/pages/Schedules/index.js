
import React, { useState } from 'react'
import { useLocalStorage } from '@greysonevins/use-local-storage'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

import { useActiveRouteColor } from 'flow/pages'
import { useGetSchedules } from 'flow/schedules'

import Add from 'pages/components/Add'
import PageContainer from 'pages/components/Container'

import Form from './form'

const Container = styled.div`
  max-width: 1000px;
  min-height: 80vh;
  margin: 0 auto;
  border-radius: 10px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  display: flex;
  overflow: hidden;
  margin-bottom: 50px;
`
const SchedulesSide = styled.div`
  width: 200px;
  background: white;
  padding: 20px;
`
const Title = styled.div`
  font-weight: 500;
  margin-bottom: 10px;
`
const DishsSide = styled.div`
  padding: 20px;
`
const List = styled.div`
  list-style: none;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
`
const Row = styled(motion.div)`
  cursor: pointer;
  display: inline-block;
  align-self: start;
  background: transparent;
  padding: 5px 10px; 
  border-radius: 5px;
`

console.log(useLocalStorage)

export default function Schedules () {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const backgroundColor = useActiveRouteColor()
  const [selected, setSelected] = useLocalStorage('selected-schedul', '')
  const schedules = useGetSchedules()

  console.log(selected, setSelected)

  return (
    <PageContainer motionKey='schedules'>

      <Add
        backgroundColor={backgroundColor}
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />

      <Form
        backgroundColor={backgroundColor}
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />

      {
        schedules && (
          <Container>
            <SchedulesSide>
              <Title>Schedules</Title>
              <List>
                {
                  schedules.map((d) => {
                    return (
                      <Row
                        key={d.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {d.label}
                      </Row>
                    )
                  })
                }
              </List>
            </SchedulesSide>
            <DishsSide>
              LOOOL
            </DishsSide>
          </Container>
        )
      }
    </PageContainer>
  )
}
