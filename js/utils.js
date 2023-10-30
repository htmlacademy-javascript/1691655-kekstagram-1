
export const isProperHashtag = (hashtag) => {
  const regexExp = /^#[a-zа-яё0-9]{1,19}$/i;

  return regexExp.test(hashtag) && hashtag.length < 21;
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

export const debounce = (callback, timeoutDelay) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...args) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

