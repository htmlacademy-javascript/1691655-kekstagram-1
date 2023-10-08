export const getData = (onSuccess, onFail) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch('https://28.javascript.pages.academy/kekstagram',
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
