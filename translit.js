const translitMap = {
  'dz': 'ձ',
  'gh': 'ղ',
  'sh': 'շ',
  'ch': 'չ',
  'zh': 'ժ',
  'ts': 'ց',
  'u': 'ու',
  'tch': 'ճ', 
  'dzʼ': 'ձ', 

  'a': 'ա',
  'b': 'բ',
  'g': 'գ',
  'd': 'դ',
  'e': 'ե',
  'z': 'զ',
  'i': 'ի',
  'y': 'յ',
  'k': 'կ',
  'l': 'լ',
  'm': 'մ',
  'n': 'ն',
  'o': 'օ',
  'p': 'պ',
  'r': 'ր',
  's': 'ս',
  't': 'տ',
  'v': 'վ',
  'h': 'հ',
  'f': 'ֆ',
  'j': 'ջ',
  'q': 'ք',
  'c': 'ց',
  'x': 'խ',
  'w': 'ւ', 

  'é': 'է',
  'ë': 'ե',
  'ê': 'է'
};

function translitToArmenian(input) {
  let result = '';
  const text = input.toLowerCase();

  for (let i = 0; i < text.length;) {
    let found = false;

    for (let len = 3; len >= 1; len--) {
      const chunk = text.slice(i, i + len);

      if (translitMap[chunk]) {
        result += translitMap[chunk];
        i += len;
        found = true;
        break;
      }
    }

    if (!found) {
      result += text[i];
      i++;
    }
  }

  return result;
}

module.exports = { translitToArmenian };