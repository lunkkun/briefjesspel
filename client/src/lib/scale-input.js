import scaleElement from './scale-element'

export default function (input, initialSizeClass, ...smallerSizeClasses) {
  scaleElement(input, input.value, initialSizeClass, ...smallerSizeClasses)
}
