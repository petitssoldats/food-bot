import React from 'react'
import { useHistory } from 'react-router-dom'
import { motion, SharedMagicMotion } from 'framer-motion'
import styled from '@emotion/styled'

import { pages, useActiveRoute } from 'flow/pages'

const Container = styled.div`
  height: 80px;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  background: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  * {
    font-weight: 800;
    box-sizing: border-box;
  }
`

const Ol = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
`

const Li = styled(motion.li)`
  list-style: none;
  padding: 0;
  margin: 0px 10px;
  user-select: none;
  font-size: 20px;
  position: relative;
  cursor: pointer;

  &.selected {
    font-size: 32px;
  }
`

const Underline = styled(motion.div)`
  width: 100%;
  height: 6px;
  border-radius: 4px;
  background: black;
  position: absolute;
  bottom: -4px;
`

export default function App () {
  const activeRoute = useActiveRoute()
  const history = useHistory()

  return (
    <Container>
      <SharedMagicMotion>
        <Ol style={{ transform: 'translateZ(0)' }}>
          {
            pages
              .map((d, i) => {
                const usablePath = d.pattern ? d.pattern.stringify() : d.slug
                const isSelected = activeRoute === d

                return (
                  <Li
                    magic
                    key={i}
                    className={`title ${isSelected && 'selected'}`}
                    selected={isSelected}
                    style={{
                      color: isSelected ? d.color : '#333'
                    }}
                    onClick={() => history.push(usablePath)}
                  >
                    {isSelected && (
                      <Underline
                        sharedId='underline'
                        className='underline'
                        style={{ backgroundColor: d.color }}
                      />
                    )}
                    {d.title}
                  </Li>
                )
              })
          }
        </Ol>
      </SharedMagicMotion>
    </Container>
  )
}
