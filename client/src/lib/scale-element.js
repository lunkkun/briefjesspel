const span = document.createElement('span')
span.style.visibility = 'hidden'
span.style.position = 'absolute'
document.body.appendChild(span)

export default function scaleElement(el, text, fontClass, bigSizeClass, ...smallerSizeClasses) {
  if (!smallerSizeClasses.length) return

  span.className = `${fontClass} ${bigSizeClass}`
  span.innerText = text

  const smallSizeClass = smallerSizeClasses.shift()

  if (span.offsetWidth > el.offsetWidth) {
    el.classList.replace(bigSizeClass, smallSizeClass)
    scaleElement(el, text, fontClass, smallSizeClass, ...smallerSizeClasses)
  } else {
    el.classList.remove(smallSizeClass, ...smallerSizeClasses)
    el.classList.add(bigSizeClass)
  }
}
