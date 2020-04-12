import scaleElement from './scale-element'

export default function (input, bigSizeClass, ...smallerSizeClasses) {
  scaleElement(input, input.value, bigSizeClass, ...smallerSizeClasses)
}
