export const getData = (onSuccess) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((responce) => responce.json())
    .then((data) => {
      onSuccess(data);
    });
};
