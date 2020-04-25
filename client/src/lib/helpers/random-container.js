const containers = [
  'hat',
  'bowl',
  'colander',
]

export default function () {
  return containers[Math.floor(Math.random() * containers.length)]
}
