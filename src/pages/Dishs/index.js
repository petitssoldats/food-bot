import React from 'react'
import { useHistory } from 'react-router-dom'

import { useActiveRoute, useActiveRouteColor } from 'flow/pages'
import { useCurrentDish } from 'flow/dishs'

import Container from 'pages/components/Container'

import AllItems from './All'
import SingleItem from './Single'

export default function Dishs () {
  const history = useHistory()
  const activeRoute = useActiveRoute()
  const backgroundColor = useActiveRouteColor()
  const [currentDish, dishs] = useCurrentDish()

  if (!dishs) return null

  return (
    <Container motionKey='dishs'>
      {
        !currentDish
          ? (
            <AllItems
              backgroundColor={backgroundColor}
              dishs={dishs}
              onClick={(id) => {
                history.push(
                  activeRoute.pattern.stringify({ id })
                )
              }}
            />
          )
          : (
            <SingleItem
              currentDish={currentDish}
              backgroundColor={backgroundColor}
            />
          )
      }
    </Container>
  )
}
