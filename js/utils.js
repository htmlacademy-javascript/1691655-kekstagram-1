
//случайное положительное целое из диапазона
export function getRandomInt (startRange, finishRange) {
  if (startRange < 0 || finishRange < 0) {
    throw new Error('Значения границ диапазона не должны быть отрицательными');
  } else if (startRange > finishRange) {
    throw new Error('Начальная граница диапазона не должна быть больше конечной');
  } else if (startRange === finishRange) {
    return startRange;
  }
  return Math.floor(Math.random() * (finishRange + 1 - startRange)) + startRange;
}

export function checkPalindrom (word) {
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

export function extractNumber (str) {
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

export function buildFullString (initStr, len, addStr) {
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

export function isStringProperLen (str, len) {
  return str.length <= len;
}

export const isProperHashtag = (hashtag) => {
  const regexExp = /^#[^ !@#$%^&*(),.?":{}|<>]+$/gi;

  return regexExp.test(hashtag) && hashtag.length < 21;
};

export const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

