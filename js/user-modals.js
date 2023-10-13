import { isEscEvent } from './utils.js';

export const onSuccessOpenModal = () => {
  const successModalTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  const successWindow = successModalTemplate.cloneNode(true);
  document.body.appendChild(successWindow);

  const onEscRemoveModal = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successWindow.remove();
      document.removeEventListener('keydown', onEscRemoveModal);
    }
  };
  document.addEventListener ('keydown', onEscRemoveModal);
  successWindow.addEventListener ('click', () => {
    successWindow.remove();
    document.removeEventListener('keydown', onEscRemoveModal);
  });
};

export const onFailOpenModal = (isLoading) => {
  const failModalTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  if (isLoading) {
    failModalTemplate.querySelector('.error__title').innerHTML = 'Ошибка загрузки с сервера';
    failModalTemplate.querySelector('.error__button').classList.add('hidden');
  }
  const failWindow = failModalTemplate.cloneNode(true);
  document.body.appendChild(failWindow);

  const onEscRemoveModal = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      failWindow.remove();
      document.removeEventListener('keydown', onEscRemoveModal);
    }
  };
  document.addEventListener ('keydown', onEscRemoveModal);
  failWindow.addEventListener ('click', () => {
    failWindow.remove();
    document.removeEventListener('keydown', onEscRemoveModal);
  });
};

