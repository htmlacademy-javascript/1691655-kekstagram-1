import { createPosts } from './data.js';

const picturePlace = document.querySelector('.pictures');

const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');

const picturesList = document.createDocumentFragment();
const posts = createPosts();

posts.forEach((post) => {
  const newPicture = pictureTemplate.cloneNode(true);

  newPicture.id = post.id;
  newPicture.querySelector('.picture__img').src = post.url;
  newPicture.querySelector('.picture__likes').textContent = post.likes;
  newPicture.querySelector('.picture__comments').textContent = post.comments.length;

  picturesList.appendChild(newPicture);
});

picturePlace.appendChild(picturesList);

export {posts};
