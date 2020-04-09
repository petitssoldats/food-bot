import React, { useCallback } from 'react'
import styled from '@emotion/styled'

import { useAddDish } from 'flow/dishs'
import { Label as LabelForTitle, Description as DescriptionInput, VictualsSelector } from 'pages/Dishs/All/form'

const Container = styled.div`
  max-width: 800px;
  min-height: 80vh;
  margin: 0 auto;
  border-radius: 10px;
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  display: flex;
  overflow: hidden;
  margin-bottom: 50px;
`

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
`
const RightPart = styled.div`
  padding: 20px;
  flex: 1;
`
const Label = styled(LabelForTitle)`
  margin: 0px;
  height: auto;
  margin-bottom: 10px;
`
const Description = styled(DescriptionInput)`
  width: 100%;
  height: calc(100% - 50px);
`

const Img = styled.div`
  width: 300px;
  height: 180px;
  background: white;
  border-radius: 5px 5px 0px 0px;
  padding: 10px;
  margin: 0 auto;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`

const VictualsSelectorContainer = styled.div`
  background: white;
  padding: 10px;
  border: 5px;
  flex: 1;
`

export default function (props) {
  const { currentDish } = props
  const addDish = useAddDish()

  const onUpdateLabel = useCallback((e) => {
    if (e.target.value) {
      addDish({
        ...currentDish,
        label: e.target.value
      })
    }
  }, [addDish, currentDish])

  const onUpdateDescription = useCallback((e) => {
    if (e.target.value) {
      addDish({
        ...currentDish,
        description: e.target.value
      })
    }
  }, [addDish, currentDish])

  const onUpdateVictuals = useCallback((newVictuals) => {
    addDish({
      ...currentDish,
      victuals: newVictuals
    })
  }, [addDish, currentDish])

  return (
    <Container>
      <LeftPart>
        <Img
          src={currentDish.img}
        />
        <VictualsSelectorContainer>
          <VictualsSelector
            valueColor={props.backgroundColor}
            selecteds={currentDish.victuals}
            setSelected={onUpdateVictuals}
          />
        </VictualsSelectorContainer>
      </LeftPart>
      <RightPart>
        <Label
          value={currentDish.label}
          onChange={onUpdateLabel}
        />
        <Description
          type='aera'
          placeholder='Dish description'
          value={currentDish.description}
          onChange={onUpdateDescription}
        />
      </RightPart>
    </Container>
  )
}
