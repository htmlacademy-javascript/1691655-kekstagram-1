import { createPosts } from './data.js';

const picturePlace = document.querySelector('.pictures');

const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');

const picturesList = document.createDocumentFragment();

createPosts().forEach((post) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.querySelector('.picture__img').src = post.url;
  picturesList.appendChild(newPicture);
  newPicture.querySelector('.picture__likes').textContent = post.likes;
  newPicture.querySelector('.picture__comments').textContent = post.comments.length;
});

picturePlace.appendChild(picturesList);
