import React, { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { find } from 'lodash'

import Modal from 'pages/components/Modal'
import Img from 'pages/components/ImgForm'

import { useGetVictuals, types } from 'flow/victuals'
import { useAddDish } from 'flow/dishs'

const typeUnits = types.reduce((p, c) => {
  p[c.id] = c.unit
  return p
}, {})

const Container = styled.form`
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #333;
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

export const Description = styled.textarea`
  border-radius: 5px;
  min-height: 180px;
  width: 300px;
  background: white;
  border: none;
  padding: 10px;
  outline: none;
  font-size: 12px;
  font-weight: 500;
`

export const Label = styled.input`
  border-radius: 5px;
  min-width: 80px;
  width: 100%;
  flex: 1;
  background: white;
  border: none;
  padding: 10px;
  outline: none;
  margin: 10px;
  font-size: 15px;
  font-weight: 600;
`

const Content = styled.div`
  display: flex;
`

const Infos = styled.div`
  width: 300px;
  margin-right: 5px;
`

const ImgUploader = styled(Img)`
  margin-bottom: 10px;
`
const Vicutals = styled.div`
  margin-left: 5px;
  width: 300px;
  background: white;
  border-radius: 5px;
  padding: 10px;
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

const AddVictualTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  text-indent: 10px;
  color: #333;
`

const Select = styled.select`
  border-radius: 5px;
  min-width: 80px;
  width: 100%;
  margin: 10px 0px;
  background: #f2f2f2;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 600;
  height: 39px;
  text-indent: 5px;
`

const Victual = styled.div`
  background: #f2f2f2;
  border-radius: 2.5px;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin: 5px 0px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const VictualQuantity = styled.input`
  background: none;
  border: none;
  outline: none;
  text-align: right;
  padding: 5px;
  width: 50px;
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.color};

  &:focus {
    border-bottom: 2px solid grey;
  }
`

const VictualUnit = styled.span`
  font-size: 12px;
  font-weight: 500;
`

const Svg = styled(motion.svg)`
  cursor: pointer;
  margin-left: 15px;
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

export function VictualsSelector (props) {
  const victuals = useGetVictuals()
  const { selecteds, setSelected } = props

  const onSelect = useCallback((e) => {
    const value = e.target.value
    if (value !== 'none') {
      setSelected([
        ...selecteds,
        {
          victual: victuals.find((d) => d.id === value),
          quantity: 0
        }
      ])
    }
  }, [victuals, selecteds, setSelected])

  return (
    <>
      <Select
        required
        onChange={onSelect}
      >
        <option key='Select...' value='none'>
            Select...
        </option>
        {
          (victuals || [])
            .filter((d) => {
              return !find(selecteds, (t) => t.victual.id === d.id)
            })
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
        selecteds.map((d) => {
          return (
            <Victual key={d.victual.id}>
              {d.victual.label}
              <div>
                <VictualQuantity
                  type='text'
                  pattern='[0-9]*'
                  value={d.quantity}
                  color={props.valueColor}
                  onChange={(e) => {
                    const ref = props.selecteds.find((t) => t.victual.id === d.victual.id)
                    ref.quantity = e.target.validity.valid
                      ? e.target.value
                      : ref.quantity

                    props.setSelected([...props.selecteds])
                  }}
                />
                <VictualUnit>
                  {typeUnits[d.victual.type.id]}
                </VictualUnit>
                <RemoveVicutal
                  onClick={() => {
                    props.setSelected(
                      props.selecteds.filter((t) => t.victual.id !== d.victual.id)
                    )
                  }}
                />
              </div>
            </Victual>
          )
        })
      }
    </>
  )
}

export function AddForm (props) {
  const closeModal = useCallback(() => {
    props.setIsOpen(false)
  }, [props])

  const addDish = useAddDish(closeModal)
  const label = useRef()
  const img = useRef()
  const description = useRef()
  const [selectedVictuals, setSelectedVictuals] = useState([])

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault()
        addDish({
          label: label.current,
          description: description.current,
          img: img.current,
          victuals: selectedVictuals
        })
      }}
    >
      <Title>
    Add a dish
      </Title>
      <Label
        required
        placeholder='Dish title'
        onChange={(e) => {
          label.current = e.target.value
        }}
      />
      <Content>
        <Infos>
          <ImgUploader
            onChange={(b64) => {
              img.current = b64
            }}
          />
          <Description
            type='aera'
            placeholder='Dish description'
            onChange={(e) => {
              description.current = e.target.value
            }}
          />
        </Infos>
        <Vicutals>
          <AddVictualTitle
            color={props.backgroundColor}
          >
            Add vicutals
          </AddVictualTitle>

          <VictualsSelector
            valueColor={props.backgroundColor}
            selecteds={selectedVictuals}
            setSelected={setSelectedVictuals}
          />

        </Vicutals>
      </Content>
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
