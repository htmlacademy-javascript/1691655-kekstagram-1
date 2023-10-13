const SERVER_GET_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const SERVER_POST_URL = 'https://28.javascript.pages.academy/kekstagram';

export const getData = (onSuccess, onFail) => {
  fetch(SERVER_GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(onFail)
    .then(onSuccess);
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER_POST_URL,
    {
      method: 'POST',
      body,
    }
  )
    .then ((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    });
};
