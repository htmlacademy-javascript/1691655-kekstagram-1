import './pictures.js';
import './big-picture.js';
import { getData } from './api.js';
import { drawPicutres } from './pictures.js';
import { setFormSubmit } from './form.js';
import { onFailOpenModal, onSuccessOpenModal } from './user-modals.js';
import { setFilter } from './filters.js';
import { debounce } from './utils.js';

getData(
  (posts) => {
    const filtersContainer = document.querySelector('.img-filters');

    drawPicutres(posts);
    filtersContainer.classList.remove('img-filters--inactive');
    setFilter(debounce(() => drawPicutres(posts), 500));
  },
  () => onFailOpenModal(true)
);

setFormSubmit(onSuccessOpenModal, onFailOpenModal);
