import React from 'react'
import CountUp from 'react-countup'
import styled from '@emotion/styled'

import routes from 'common/routes'

import { useGetVictuals } from 'flow/victuals'
import { useGetDishs } from 'flow/dishs'

import PageContainer from 'pages/components/Container'

const Container = styled.div`
  max-width: 800px;
  min-height: 80vh;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 50px;
  display: flex;
  align-items: self-end;
  justify-content: center;
`

const Module = styled.div`
  border-radius: 10px;
  background: #f2f2f2;
  padding: 20px 40px;
  min-width: 300px;
  height: auto;
  text-align: right;
  font-size: 30px;
  font-weight: 900;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Value = styled.div`
  font-size: 80px;
  line-height: 70px;
  color: ${(props) => props.color};
`

export default function Dishs () {
  const victuals = useGetVictuals()
  const dishs = useGetDishs()

  return (
    <PageContainer>
      <Container>
        {
          dishs && (
            <Module>
              <Value color={routes.dishs.color}>
                <CountUp
                  start={0}
                  end={dishs.length}
                  duration={1}
                />
              </Value>
              Dishs
            </Module>
          )
        }
        {
          victuals && (
            <Module>
              <Value color={routes.victuals.color}>
                <CountUp
                  start={0}
                  end={victuals.length}
                  duration={1}
                />
              </Value>
              Victuals
            </Module>
          )
        }
      </Container>
    </PageContainer>
  )
}
