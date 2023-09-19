//случайное положительное целое из диапазона
function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  } else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше конечной');
  } else if (startRange === finishRange) {
    return startRange;
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

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

export {getRandomInt, isStringProperLen, buildFullString, extractNumber, checkPalindrom};
