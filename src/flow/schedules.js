import { useCallback, useState, useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import slug from 'slug'
import { omit } from 'lodash'

import routes from 'common/routes'

import useSocket from './socket'

export function useAddSchedule (callback) {
  const socket = useSocket()

  const addFn = useCallback((datum) => {
    if (socket && socket.connected) {
      const datumWithIdAndTime = {
        ...datum,
        id: datum.id || slug(datum.label.toLowerCase()),
        ts: Math.round(Date.now() / 1000)
      }
      socket.emit('add-schedule', datumWithIdAndTime, (err, res) => {
        if (err) console.log(err)
        if (callback) callback(err, res)
      })
    }
  }, [socket, callback])

  return addFn
}

export function useDeleteDish (callback) {
  const socket = useSocket()

  const deleteFn = useCallback((datum) => {
    if (socket && socket.connected) {
      socket.emit('delete-schedule', datum, (err, res) => {
        if (err) console.log(err)
        if (callback) callback(err, res)
      })
    }
  }, [socket, callback])

  return deleteFn
}

export function useGetSchedules () {
  const socket = useSocket()
  const [dishs, setDishsOnState] = useState()

  const setDishs = useCallback((values) => {
    setDishsOnState(
      values.map((d) => omit(d, '_id'))
    )
  }, [setDishsOnState])

  useEffect(() => {
    let onPush
    if (socket && socket.connected) {
      onPush = (docs) => setDishs(docs)
      socket.on('push-schedules', onPush)

      socket.emit('get-schedules', (err, res) => {
        if (err) {
          console.log(err)
        } else {
          setDishs(res)
        }
      })
    }

    return () => {
      if (onPush && socket) socket.off('push-dish', onPush)
    }
  }, [socket, setDishs])

  return dishs
}

// export function useCurrentDish () {
//   const history = useHistory()
//   const dishs = useGetDishs()
//   const params = useParams()

//   const currentDish = useMemo(() => {
//     if (dishs) {
//       const ref = dishs.find((d) => d.id === params.id)
//       if (ref) {
//         return ref
//       } else if (params.id) {
//         history.push(routes.dishs.pattern.stringify())
//       }
//     }
//   }, [params, history, dishs])

//   return [currentDish, dishs]
// }
