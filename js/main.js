import './pictures.js';
import './big-picture.js';
import { getData } from './api.js';
import { drawPicutres } from './pictures.js';
import { setFormSubmit } from './form.js';
import { onFailOpenModal, onSuccessOpenModal } from './user-modals.js';
import { setFilter } from './filters.js';
import { debounce } from './utils.js';

const TIMEOUT_DELAY = 500;

getData(
  (posts) => {
    const filtersContainer = document.querySelector('.img-filters');
    drawPicutres(posts);
    filtersContainer.classList.remove('img-filters--inactive');
    setFilter(debounce(() => drawPicutres(posts), TIMEOUT_DELAY));
  },
  () => onFailOpenModal(true)
);

setFormSubmit(onSuccessOpenModal, onFailOpenModal);
