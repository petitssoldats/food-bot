import React, { useState } from 'react'

import Add from 'pages/components/Add'
import Search from 'pages/components/Search'

import Form from './form'
import List from './list'

const defaultItemsList = []

export default function (props) {
  const [search, setSearch] = useState()
  const [results, setResults] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const usableItems = props.dishs || defaultItemsList

  return (
    <>
      <Add
        backgroundColor={props.backgroundColor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Form
        backgroundColor={props.backgroundColor}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Search
        value={search}
        setValue={setSearch}
        setResults={setResults}
        items={usableItems}
      />

      {
        !!props.dishs && (
          <List
            items={search ? results : usableItems}
            backgroundColor={props.backgroundColor}
          />
        )
      }

    </>
  )
}
