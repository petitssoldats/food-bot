
import styled from '@emotion/styled'
import { useLocalStorage } from '@greysonevins/use-local-storage'
import { useActiveRouteColor } from 'flow/pages'
import { defaultDays, useDeleteSchedule, useGetSchedules, useAddSchedule } from 'flow/schedules'
import { motion } from 'framer-motion'
import Add from 'pages/components/Add'
import PageContainer from 'pages/components/Container'
import React, { useMemo, useState } from 'react'
import Form from './form'

import DishList from './dish-list'

const Container = styled.div`
  max-width: calc(100% - 180px);
  min-height: 80vh;
  margin: 0 auto;
  border-radius: 10px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 50px;
`
const SchedulesPart = styled.div`
  background: white;
  padding: 10px 10px;
  margin-left: 5px;
  display: flex;
`
const Select = styled.select`
  border-radius: 5px;
  min-width: 80px;
  width: 100%;
  margin-right: 5px;
  background: #f2f2f2;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 600;
  height: 39px;
  text-indent: 5px;
`

const RemoveContainer = styled.div`
  background: #ff0055;
  margin-left: 5px;
  padding: 5px;
  border-radius: 5px;
  width: 40px;
  justify-content: center;
  display: flex;
  align-items: center;
`
const Svg = styled(motion.svg)`
  cursor: pointer;
`
function RemoveSchedule (props) {
  return (
    <Svg
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      width='14' height='16'
      onClick={props.onClick}
    >
      <path d='M14 2.75V4.5H12.25V14.125C12.2495 14.589 12.0649 15.0338 11.7368 15.3618C11.4088 15.6899 10.964 15.8745 10.5 15.875H3.5C3.03603 15.8745 2.59122 15.6899 2.26315 15.3618C1.93508 15.0338 1.75053 14.589 1.75 14.125V4.5H0V2.75H14ZM10.5 0.125H3.5V1.875H10.5V0.125Z' fill='white' />
    </Svg>
  )
}

const DishsPart = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  flex: 1;
`
const Day = styled.div`
  display: flex;
  width: 100%;
  margin: 0px 5px;
  text-transform: uppercase;
  font-weight: 700;
  justify-content: center;
  flex-direction: column;
`
const DayTitle = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  height: 42px;
  margin-bottom: 10px;
`
const DayContent = styled(motion.div)`
  position: relative;
  display: flex;
  border-radius: 5px;
  background: white;
  padding: 10px;
  flex: 1;
  margin: 5px 0px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RemoveVicutalContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 30px;
  text-align: center;
  background: #f2f2f2;
`
function RemoveVicutal (props) {
  return (
    <Svg
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      width='13' height='13'
      onClick={props.onClick}
    >
      <rect x='10.5436' width='2.24218' height='13.4531' rx='1.12109' transform='rotate(45 10.5436 0)' fill='#333333' />
      <rect x='12.0384' y='9.71611' width='2.24218' height='13.4531' rx='1.12109' transform='rotate(135 12.0384 9.71611)' fill='#333333' />
    </Svg>
  )
}

export default function Schedules () {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDishListModalOpen, setIsDishListModalOpen] = useState(false)
  const backgroundColor = useActiveRouteColor()
  const [selected, setSelected] = useLocalStorage('selected-schedule', '')
  const [onSelectDishFn, setOnSelectDishFn] = useState()

  const schedules = useGetSchedules()
  const addSchedule = useAddSchedule()
  const deleteSchedule = useDeleteSchedule()

  const selectedSchedule = useMemo(() => {
    return (schedules || []).find((d) => d.id === selected)
  }, [schedules, selected])

  const usableDays = (selectedSchedule?.days || defaultDays)

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
            <SchedulesPart>
              <Select
                defaultValue={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option key='Select...' value='none'>
                  Select...
                </option>
                {
                  (schedules || [])
                    .sort((a, b) => {
                      return a.label.localeCompare(b.label, undefined, {
                        numeric: true,
                        sensitivity: 'base'
                      })
                    })
                    .map((d) => {
                      return <option key={d.id} value={d.id}>{d.label}</option>
                    })
                }
              </Select>
              {
                selectedSchedule && (
                  <RemoveContainer>
                    <RemoveSchedule
                      onClick={() => deleteSchedule({ id: selectedSchedule.id })}
                    />
                  </RemoveContainer>
                )
              }
            </SchedulesPart>
            <DishsPart>
              {
                Object.keys(usableDays)
                  .map((k) => {
                    return (
                      <Day key={k}>
                        <DayTitle>
                          {k}
                        </DayTitle>
                        {
                          Array(2).fill().map((_, i) => {
                            return (
                              <DayContent
                                key={i}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setOnSelectDishFn(() => {
                                    return (dish) => {
                                      const newDayDishs = [...selectedSchedule.days[k]]
                                      newDayDishs[i] = dish
                                      addSchedule({
                                        ...selectedSchedule,
                                        days: {
                                          ...selectedSchedule.days,
                                          [k]: newDayDishs
                                        }
                                      })
                                    }
                                  })
                                  if (!isDishListModalOpen) setIsDishListModalOpen(true)
                                }}
                              >
                                {
                                  selectedSchedule?.days[k][i]?.label || '+'
                                }
                                {
                                  selectedSchedule?.days[k][i] && (
                                    <RemoveVicutalContainer
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const newDayDishs = [...selectedSchedule.days[k]]
                                        newDayDishs[i] = null
                                        addSchedule({
                                          ...selectedSchedule,
                                          days: {
                                            ...selectedSchedule.days,
                                            [k]: newDayDishs
                                          }
                                        })
                                      }}
                                    >
                                      <RemoveVicutal />
                                    </RemoveVicutalContainer>
                                  )
                                }
                              </DayContent>
                            )
                          })
                        }
                      </Day>
                    )
                  })
              }
            </DishsPart>
            <DishList
              onSelect={onSelectDishFn}
              backgroundColor={backgroundColor}
              isOpen={isDishListModalOpen}
              setIsOpen={setIsDishListModalOpen}
            />
          </Container>
        )
      }
    </PageContainer>
  )
}
