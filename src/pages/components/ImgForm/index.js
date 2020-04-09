import React, { useState, useEffect } from 'react'

import styled from '@emotion/styled'

const Container = styled.div`
  width: 300px;
  height: 180px;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`

const Zone = styled.div`
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  margin-left: 3px;
  margin-top: 3px;
  border-radius: 5px;
  border: 2px dashed #c7c6c4;
`

export default function (props) {
  const [isOvered, setIsOvered] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    props.onChange(imgSrc)
  }, [props, imgSrc])

  return (
    <Container
      src={imgSrc}
      onDragEnter={(e) => {
        setIsOvered(true)
        e.preventDefault()
      }}
      onDragLeave={(e) => {
        setIsOvered(false)
        e.preventDefault()
      }}
      onDragOver={(e) => {
        setIsOvered(false)
        e.preventDefault()
      }}
      onDrop={(e) => {
        const reader = new window.FileReader()

        reader.onload = function (e) {
          setImgSrc(e.target.result)
        }
        reader.readAsDataURL(e.dataTransfer.files[0])

        setIsOvered(false)
        e.preventDefault()
      }}
    >
      {isOvered && <Zone />}
    </Container>
  )
}
