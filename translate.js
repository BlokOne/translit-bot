const fetch = require('node-fetch');

async function translate(text, targetLang = 'ru') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=hy&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();

  return data[0].map(([translated]) => translated).join('');
}

module.exports = { translate };