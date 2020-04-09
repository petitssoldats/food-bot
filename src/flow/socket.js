import io from 'socket.io-client'

const socket = io(':3001')
// socket.open()

export default function useScoket () {
  return socket
}
