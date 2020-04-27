export default function (textToCopy) {
  let textArea

  function isIOSSafari() {
    const iOS = /iPad|iPhone|iPod/i.test(window.navigator.platform)
    const webkit = /WebKit/i.test(window.navigator.userAgent)
    return iOS && webkit && !/CriOS|FxiOS|OPiOS|mercury/i.test(window.navigator.userAgent)
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea')
    textArea.readOnly = false
    textArea.contentEditable = true
    textArea.value = text
    document.body.appendChild(textArea)
  }

  function selectText() {
    if (isIOSSafari()) {
      const range = document.createRange()
      range.selectNodeContents(textArea)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  function copyTo() {
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  createTextArea(textToCopy)
  selectText()
  copyTo()
}
