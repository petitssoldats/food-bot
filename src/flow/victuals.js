import { useCallback, useState, useEffect } from 'react'
import slug from 'slug'

import useSocket from './socket'

export const types = [
  {
    id: 'unity',
    label: 'Unity',
    unit: 'x'
  },
  {
    id: 'gram',
    label: 'Gram',
    unit: 'g'
  },
  {
    id: 'centilitre',
    label: 'Centilitre',
    unit: 'cl'
  }
]

export function useAddVictual (callback) {
  const socket = useSocket()

  const addFn = useCallback((datum) => {
    if (socket && socket.connected) {
      const datumWithId = {
        ...datum,
        id: slug(datum.label.toLowerCase())
      }
      socket.emit('add-victual', datumWithId, (err, res) => {
        if (err) console.log(err)
        if (callback) callback(err, res)
      })
    }
  }, [socket, callback])

  return addFn
}

export function useDeleteVictual (callback) {
  const socket = useSocket()

  const deleteFn = useCallback((datum) => {
    if (socket && socket.connected) {
      socket.emit('delete-victual', datum, (err, res) => {
        if (err) console.log(err)
        if (callback) callback(err, res)
      })
    }
  }, [socket, callback])

  return deleteFn
}

export function useGetVictuals () {
  const socket = useSocket()
  const [victuals, setVictuals] = useState()

  useEffect(() => {
    let onPush
    if (socket && socket.connected) {
      onPush = (docs) => setVictuals(docs)
      socket.on('push-victuals', onPush)

      socket.emit('get-victuals', (err, res) => {
        if (err) {
          console.log(err)
        } else {
          setVictuals(res)
        }
      })
    }

    return () => {
      if (onPush && socket) socket.off('push-victuals', onPush)
    }
  }, [socket])

  return victuals
}
