export default function (state) {
  const interval = setInterval(() => {
    state.turnTimeLeft--

    if (state.turnTimeLeft <= 0) {
      clearInterval(interval)
    }
  }, 1000)

  state.timer = interval
}
