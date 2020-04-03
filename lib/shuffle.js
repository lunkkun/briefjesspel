/** Fisher-Yates Shuffle
 *
 * @param array The array to shuffle. Will be shuffled in-place.
 * @param onlyLastItem Set to true if you only want to bury the last item in the pile.
 * @returns array The shuffled array
 */
module.exports = function (array, onlyLastItem = false) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;

    if (onlyLastItem) break;
  }

  return array;
}
