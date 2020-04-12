const span = document.createElement('span')
span.style.visibility = 'hidden'
span.style.position = 'absolute'
document.body.appendChild(span)

function scaleElement(el, bigSizeClass, ...smallerSizeClasses) {
  if (!smallerSizeClasses.length) return
  const smallSizeClass = smallerSizeClasses.shift()

  if (span.offsetWidth > el.offsetWidth) {
    el.classList.replace(bigSizeClass, smallSizeClass)
    span.classList.replace(bigSizeClass, smallSizeClass)
    scaleElement(el, smallSizeClass, ...smallerSizeClasses)
  } else {
    el.classList.remove(smallSizeClass, ...smallerSizeClasses)
    el.classList.add(bigSizeClass)
  }
}

export default function (el, text, bigSizeClass, ...smallerSizeClasses) {
  span.style.fontFamily = window.getComputedStyle(el).fontFamily
  span.className = bigSizeClass
  span.innerText = text

  scaleElement(el, bigSizeClass, ...smallerSizeClasses)
}
