import './pictures.js';
import './big-picture.js';
import { getData } from './api.js';
import { drawPicutres } from './pictures.js';
import { setFormSubmit } from './form.js';
import { onFailOpenModal, onSuccessOpenModal } from './user-modals.js';

getData(
  (posts) => {
    drawPicutres(posts);
    setFormSubmit(onSuccessOpenModal, onFailOpenModal);
  },
  () => onFailOpenModal(true)
);
