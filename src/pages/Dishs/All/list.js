import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

import { useDeleteDish } from 'flow/dishs'
import { useActiveRoute } from 'flow/pages'

const Container = styled.div`
  max-width: 100%;
  padding: 0px 100px; 
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 50px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
`

const CardContainer = styled(motion.div)`
  width: 300px;
  border-radius: 5px;
  background: #f2f2f2;
  overflow: hidden;
  margin: 10px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
  position: relative;
`

const Img = styled.div`
  width: 100%;
  height: 180px;
  background-color: #c7c7c7;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`

const CardContent = styled.div`
  padding: 15px 10px;
  font-size: 18px;
  font-weight: 800;
  text-transform: capitalize;
`

const Svg = styled(motion.svg)`
  cursor: pointer;
  margin-right: 8px;
  position: absolute; 
  right: 5px;
  top: 5px;
`

const deleteVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
}

function Delete (props) {
  return (
    <Svg
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      width='31' height='31'
      variants={deleteVariants}
      onClick={props.onClick}
    >
      <circle cx='15.5' cy='15.5' r='15.5' fill={props.fill} />
      <rect x='21' y='8' width='3' height='18' rx='1' transform='rotate(45 21 8)' fill='white' />
      <rect x='23' y='21' width='3' height='18' rx='1' transform='rotate(135 23 21)' fill='white' />
    </Svg>
  )
}

const Card = (props) => {
  const [hovered, setHovered] = useState()

  const onEnter = useCallback(() => {
    setHovered(true)
  }, [setHovered])

  const onLeave = useCallback(() => {
    setHovered(false)
  }, [setHovered])

  return (
    <CardContainer
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1 }}
      onMouseOver={onEnter}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation()
        props.history.push(
          props.activeRoute.pattern.stringify({ id: props.id })
        )
      }}
    >
      {
        hovered && (
          <Delete
            onClick={props.onDelete}
            fill={props.backgroundColor}
          />
        )
      }
      {props.children}
    </CardContainer>
  )
}

export default function DishsList (props) {
  const history = useHistory()
  const activeRoute = useActiveRoute()
  const deleteDish = useDeleteDish()

  return (
    <Container>
      {
        props.items.map((d) => {
          return (
            <Card
              history={history}
              activeRoute={activeRoute}
              backgroundColor={props.backgroundColor}
              key={d.id}
              id={d.id}
              onDelete={(e) => {
                e.stopPropagation()
                deleteDish(d)
              }}
            >
              <Img src={d.img} />
              <CardContent>
                {d.label}
              </CardContent>
            </Card>
          )
        })
      }
    </Container>
  )
}
