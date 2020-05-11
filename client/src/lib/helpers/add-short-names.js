function firstTwoChars(name) {
  return name.substr(0, 1).toUpperCase() + name.substr(1, 1).toLowerCase()
}

export default function (players) {
  // TODO: more complex logic to prevent duplicates
  return players.map((player) => ({...player, shortName: firstTwoChars(player.name)}))
}
