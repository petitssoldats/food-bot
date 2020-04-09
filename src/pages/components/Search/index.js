import React, { useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

import Fuse from 'fuse.js'

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: #f2f2f2;
  height: 50px;
  border-radius: 5px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  background: none;
  border: none;
  display: flex;
  flex: 1;
  /* width: calc(100% - 30px); */
  font-size: 20px;
  outline: none;
  font-weight: 700;
  padding: 4px 0px;
  border-bottom: 2px solid transparent;

  &:focus {
    border-bottom: 2px solid grey;
  }
`

const Svg = styled(motion.svg)`
  cursor: pointer;
  margin-left: 8px;
`

function CloseBtn (props) {
  return (
    <Svg
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      width='23' height='23'
      onClick={props.onClick}
    >
      <rect x='19.8004' width='4.62292' height='27.7375' rx='1' transform='rotate(45 19.8004 0)' fill='#333333' />
      <rect x='22.8823' y='20.0327' width='4.62292' height='27.7375' rx='1' transform='rotate(135 22.8823 20.0327)' fill='#333333' />
    </Svg>
  )
}

export default function (props) {
  const { value, setResults } = props
  const fuse = useMemo(() => {
    const keys = {
      shouldSort: true,
      threshold: 0.2,
      // distance: 5,
      // minMatchCharLength: 3,

      keys: ['id', 'label']
    }

    return new Fuse(props.items, keys)
  }, [props.items])

  useEffect(() => {
    if (value) {
      setResults(
        fuse.search(value).map((d) => d.item)
      )
    } else {
      setResults([])
    }
  }, [value, setResults, fuse])

  const resetValue = useCallback(() => {
    props.setValue('')
    props.setResults([])
  }, [props])

  const handleInput = useCallback((e) => {
    props.setValue(e.target.value)
  }, [props])

  const handleESC = useCallback((e) => {
    if (e.keyCode === 27) {
      resetValue()
    }
  }, [resetValue])

  return (
    <Container>
      <Input
        type='text'
        placeholder='Search'
        value={props.value}
        onChange={handleInput}
        onKeyDown={handleESC}
      />
      {
        props.value && <CloseBtn onClick={resetValue} />
      }
    </Container>
  )
}
