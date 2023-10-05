import { onPictureClick } from './big-picture.js';
// import { createPosts } from './data.js';

const picturePlace = document.querySelector('.pictures');
const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');

const picturesList = document.createDocumentFragment();

// const randomPosts = createPosts();

const drawPicutres = (posts) => {
  console.log(posts);

  posts.forEach((post) => {
    const newPicture = pictureTemplate.cloneNode(true);

    newPicture.querySelector('.picture__img').id = post.id;
    newPicture.querySelector('.picture__img').src = post.url;
    newPicture.querySelector('.picture__likes').textContent = post.likes;
    newPicture.querySelector('.picture__comments').textContent = post.comments.length;

    picturesList.appendChild(newPicture);
  });

  picturePlace.appendChild(picturesList);
  picturePlace.addEventListener('click', (evt) => onPictureClick(evt, posts));
};

export {drawPicutres};
