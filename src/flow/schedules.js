import { omit } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import slug from 'slug'
import useSocket from './socket'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const defaultDays = Array(7).fill().reduce((p, c, i) => {
  p[days[i]] = [null, null]
  return p
}, {})

export function useAddSchedule (callback) {
  const socket = useSocket()

  const addFn = useCallback((datum) => {
    if (socket && socket.connected) {
      const datumWithIdAndTime = {
        ...datum,
        id: datum.id || slug(datum.label.toLowerCase()),
        ts: Math.round(Date.now() / 1000),
        days: datum.days || defaultDays
      }
      socket.emit('add-schedule', datumWithIdAndTime, (err, res) => {
        if (err) console.log(err)
        if (callback) callback(err, res)
      })
    }
  }, [socket, callback])

  return addFn
}

export function useDeleteSchedule (callback) {
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
