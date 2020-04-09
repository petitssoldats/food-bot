import React, { useMemo, useCallback } from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { groupBy } from 'lodash'

import { useDeleteVictual } from 'flow/victuals'

const Container = styled(motion.div)`
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 50px;
`

const Group = styled(motion.div)`
  display: flex;
  margin: 20px 0px;
  margin-left: -25px;
  padding-right: 25px;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  width: 50px;
`

const Rows = styled.div`
  flex: 1;
`

const RowContainer = styled(motion.div)`
  background: #f2f2f2;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  font-weight: 500;
  margin-bottom: 8px;
  overflow: hidden;
`

const Label = styled.div`
  font-weight: 600;
  width: 50%;
  padding: 13px;
`

const Type = styled.div`
  font-weight: 400;
  padding: 13px;
`

const Actions = styled(motion.div)`
  display: flex;
  align-items: center;
`

const Svg = styled(motion.svg)`
  cursor: pointer;
  margin-right: 8px;
`

// function Edit (props) {
//   return (
//     <Svg
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       width='31' height='31'
//     >
//       <circle cx='15.5' cy='15.5' r='15.5' fill='#22CC88' />
//       <path d='M7.96659 16.7159L7.95 16.7308V16.7531V22V22.05H8H13.6267H13.6469L13.6615 22.0359L22.6741 13.3083C22.6742 13.3082 22.6743 13.3081 22.6744 13.308C23.1753 12.8406 23.1752 12.0612 22.6741 11.594L19.1541 8.31157C18.9048 8.07913 18.5726 7.95 18.24 7.95C17.9075 7.95 17.5755 8.07901 17.3262 8.31124C17.3261 8.31135 17.326 8.31146 17.3259 8.31157L7.96659 16.7159ZM10.5833 17.7949L18.2395 10.8778L19.9541 12.4767L12.5664 19.6374H10.5833V17.7949Z' fill='white' />
//     </Svg>
//   )
// }

function Delete (props) {
  return (
    <Svg
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      width='31' height='31'
      onClick={props.onClick}
    >
      <circle cx='15.5' cy='15.5' r='15.5' fill={props.fill} />
      <rect x='21' y='8' width='3' height='18' rx='1' transform='rotate(45 21 8)' fill='white' />
      <rect x='23' y='21' width='3' height='18' rx='1' transform='rotate(135 23 21)' fill='white' />
    </Svg>
  )
}

function Row (props) {
  const deleteVictual = useDeleteVictual()

  const deleteFn = useCallback(() => {
    deleteVictual(props.item)
  }, [deleteVictual, props.item])

  return (
    <RowContainer
      layoutTransition
      whileHover={{ scale: 1.01 }}
    >
      <Label>
        {props.item.label}
      </Label>
      <Type>
        {props.item.type.label}
      </Type>
      <Actions>
        <Delete
          onClick={deleteFn}
          fill={props.backgroundColor}
        />
      </Actions>
    </RowContainer>
  )
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const groupVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
}

export default function List (props) {
  const groups = useMemo(() => {
    return groupBy(props.items, (d) => d.label[0].toUpperCase())
  }, [props.items])

  return (
    <Container
      variants={variants}
    >
      {
        Object.keys(groups)
          .sort((a, b) => {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: 'base'
            })
          })
          .map((key) => {
            return (
              <Group
                key={key}
                variants={groupVariants}
              >
                <Title>
                  {key}
                </Title>
                <Rows>
                  {
                    groups[key]
                      .sort((a, b) => {
                        return a.label.localeCompare(b.label, undefined, {
                          numeric: true,
                          sensitivity: 'base'
                        })
                      })
                      .map((d) => {
                        return (
                          <Row
                            backgroundColor={props.backgroundColor}
                            key={d.id}
                            item={d}
                          />
                        )
                      })
                  }
                </Rows>
              </Group>
            )
          })
      }
    </Container>
  )
}
