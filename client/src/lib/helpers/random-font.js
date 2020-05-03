const fonts = [
  'ChildWriting-Regular',
  'Cute_Font',
  'daniel',
  'Faraco Hand',
  'homeworkpreschooler',
  'kindergarten',
  'Lemon Tuesday',
  'Luna',
  'Morning Coffee',
  'NotebookScribble',
  'Southpaw',

  // 'alittlepot',
  // 'CuteHandWriting',
  // 'Quick note',
  // 'TheDogAteMyHomework',
]

export default function () {
  return fonts[Math.floor(Math.random() * fonts.length)]
}
