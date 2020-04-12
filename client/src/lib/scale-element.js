const span = document.createElement('span')
span.style.visibility = 'hidden'
span.style.position = 'absolute'
document.body.appendChild(span)

function scaleElement(el, initialSizeClass, ...smallerSizeClasses) {
  if (!smallerSizeClasses.length) return
  const smallSizeClass = smallerSizeClasses.shift()

  if (span.offsetWidth > el.offsetWidth) {
    el.classList.replace(initialSizeClass, smallSizeClass)
    span.classList.replace(initialSizeClass, smallSizeClass)
    scaleElement(el, smallSizeClass, ...smallerSizeClasses)
  } else {
    el.classList.remove(smallSizeClass, ...smallerSizeClasses)
    el.classList.add(initialSizeClass)
  }
}

export default function (el, text, initialSizeClass, ...smallerSizeClasses) {
  span.style.fontFamily = window.getComputedStyle(el).fontFamily
  span.className = initialSizeClass
  span.innerText = text

  scaleElement(el, initialSizeClass, ...smallerSizeClasses)
}
