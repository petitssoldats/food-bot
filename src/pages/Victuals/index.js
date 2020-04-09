import React, { useState } from 'react'

import { useActiveRouteColor } from 'flow/pages'

import Add from 'pages/components/Add'
import Container from 'pages/components/Container'
import Search from 'pages/components/Search'

import { useGetVictuals } from 'flow/victuals'

import Form from './form'
import List from './list'

const defaultItemsList = []

export default function Victuals () {
  const [search, setSearch] = useState()
  const [results, setResults] = useState()
  const victuals = useGetVictuals()
  const backgroundColor = useActiveRouteColor()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  if (!victuals) return null

  return (
    <Container motionKey='victuals'>
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

      <Search
        value={search}
        setValue={setSearch}
        setResults={setResults}
        items={victuals || defaultItemsList}
      />

      {
        !!victuals && (
          <List
            items={search ? results : victuals}
            backgroundColor={backgroundColor}
          />
        )
      }
    </Container>
  )
}
