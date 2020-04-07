export default function (team1, team2) {
  if (team1.score > team2.score){
    return -1;
  } else if (team1.score < team2.score){
    return 1;
  } else {
    return 0;
  }
}
