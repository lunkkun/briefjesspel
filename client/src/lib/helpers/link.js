export default function (path = '') {
  const protocol = window.location.protocol
  let host = window.location.host

  if (host === 'localhost:8080') {
    host = 'localhost:4000'
  }

  return `${protocol}//${host}/${path}`
}
