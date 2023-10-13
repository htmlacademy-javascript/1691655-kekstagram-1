import { onPictureClick } from './big-picture.js';
import { getFilteredPosts } from './filters.js';

const picturePlace = document.querySelector('.pictures');
const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');

const picturesList = document.createDocumentFragment();

const drawPicture = (post) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').id = post.id;
  newPicture.querySelector('.picture__img').src = post.url;
  newPicture.querySelector('.picture__likes').textContent = post.likes;
  newPicture.querySelector('.picture__comments').textContent = post.comments.length;

  picturesList.appendChild(newPicture);
};

export const drawPicutres = (posts) => {
  getFilteredPosts(posts.slice())
    .forEach((post) => drawPicture(post));

  picturePlace.appendChild(picturesList);
  picturePlace
    .querySelectorAll('.picture')
    .forEach((pictureLink) => {
      pictureLink.addEventListener('click', (evt) => onPictureClick(evt, posts));
    });
};
