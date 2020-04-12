const span = document.createElement('span');
span.style.visibility = "hidden";
span.style.position = 'absolute';
document.body.appendChild(span);

export default function (input, fontClass, defaultSizeClass, smallSizeClass, smallerSizeClass){
  span.className = `${fontClass} ${defaultSizeClass}`
  span.innerText = input.value;

  if (span.offsetWidth > input.offsetWidth) {
    input.classList.replace(defaultSizeClass, smallSizeClass)
    span.classList.replace(defaultSizeClass, smallSizeClass)
    if (smallerSizeClass) {
      if (span.offsetWidth > input.offsetWidth) {
        input.classList.replace(smallSizeClass, smallerSizeClass)
        span.classList.replace(smallSizeClass, smallerSizeClass)
      } else {
        input.classList.replace(smallerSizeClass, smallSizeClass)
      }
    }
  } else {
    if (smallerSizeClass) {
      input.classList.replace(smallerSizeClass, defaultSizeClass)
    }
    input.classList.replace(smallSizeClass, defaultSizeClass)
  }
}
