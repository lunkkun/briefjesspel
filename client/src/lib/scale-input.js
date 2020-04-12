import scaleElement from './scale-element'

export default function (input, ...sizeClasses) {
  scaleElement(input, input.value, ...sizeClasses)
}
