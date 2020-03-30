export default function (messageType, payload) {
  return {messageType, payload, type: 'sendMessage'}
}
