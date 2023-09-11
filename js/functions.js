function checkPalindrom (word) {
  let result = true;

  word = word.replace(/ /g, '').toLowerCase();
  const len = word.length;

  for (let i = 0; i < len; i++) {
    if (word[i] !== word[len - i - 1]) {
      result = false;
    }
  }

  return result;
}

function extractNumber (str) {
  let result = '';
  const numberRegExp = /\d/;
  str = str.toString();
  for (let i = 0; i < str.length; i++) {
    if (numberRegExp.test(str[i])) {
      result += str[i];
    }
  }

  return result;
}

function buildFullString (initStr, len, addStr) {
  if (initStr.length >= len) {
    return initStr;
  }

  let result = initStr;
  let currentAdd = '';
  while (result.length < len) {
    currentAdd = addStr.substring(0, len - result.length);
    result = currentAdd + result;
  }
  return result;
}


function isStringProperLen (str, len) {
  return str.length <= len;
}

checkPalindrom('Лёша на полке клопа нашёл ');
extractNumber('Лёша н235а полке кл5235опа нашёл 1');
buildFullString('1', 2, '0');
isStringProperLen('проверяемая строка', 18);
