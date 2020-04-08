export default function (eventName, event) {
  if (!eventName.startsWith('SOCKET_')) return

  let type = eventName.toUpperCase()
  let payload = event

  if (event.data) {
    ({type, payload} = JSON.parse(event.data))
  }

  this.store.commit(type, payload)
}
