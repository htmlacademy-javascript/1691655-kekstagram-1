import './pictures.js';
import './big-picture.js';
import { getData } from './api.js';
import { drawPicutres } from './pictures.js';
import { setFormSubmit } from './form.js';
import { onFailModal, onSuccessModal } from './user-modals.js';

getData(
  (posts) => {
    drawPicutres(posts);
    setFormSubmit(onSuccessModal, onFailModal);
  },
  () => onFailModal(true)
);
