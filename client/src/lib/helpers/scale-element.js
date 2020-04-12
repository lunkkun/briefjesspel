const span = document.createElement('span')
span.style.visibility = 'hidden'
span.style.position = 'absolute'
document.body.appendChild(span)

function _scale(el, initialSizeClass, ...smallerSizeClasses) {
  if (!smallerSizeClasses.length) return
  const smallSizeClass = smallerSizeClasses.shift()

  if (span.offsetWidth > el.offsetWidth) {
    el.classList.replace(initialSizeClass, smallSizeClass)
    span.classList.replace(initialSizeClass, smallSizeClass)
    _scale(el, smallSizeClass, ...smallerSizeClasses)
  } else {
    el.classList.remove(smallSizeClass, ...smallerSizeClasses)
    el.classList.add(initialSizeClass)
  }
}

export function scaleElement(el, text, initialSizeClass, ...smallerSizeClasses) {
  span.style.fontFamily = window.getComputedStyle(el).fontFamily
  span.className = initialSizeClass
  span.innerText = text

  _scale(el, initialSizeClass, ...smallerSizeClasses)
}

export function scaleInput(input, ...sizeClasses) {
  scaleElement(input, input.value, ...sizeClasses)
}
