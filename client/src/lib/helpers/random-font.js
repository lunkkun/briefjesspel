const fonts = [
  'alittlepot',
  'ChildWriting-Regular',
  'Cute_Font',
  'CuteHandWriting',
  'daniel',
  'Faraco Hand',
  'homeworkpreschooler',
  'kindergarten',
  'Lemon Tuesday',
  'Luna',
  'Morning Coffee',
  'NotebookScribble',
  'Quick note',
  'Southpaw',
  'TheDogAteMyHomework',
]

export default function () {
  return fonts[Math.floor(Math.random() * fonts.length)]
}
