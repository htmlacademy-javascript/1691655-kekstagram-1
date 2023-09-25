import { posts } from './pictures.js';

const picturesLinkList = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', onEscRemove);
  }
};

bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

picturesLinkList.forEach((picture) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onEscRemove);

    bigPicture
      .querySelector('.big-picture__img')
      .getElementsByTagName('img')[0]
      .src = picture.getElementsByTagName('img')[0].src;

    bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__caption').textContent = picture;

    const commentTemplate = document.querySelector('#comment').content;
    const commentItemTemplate = commentTemplate.querySelector('li');
    const commentsList = bigPicture.querySelector('.social__comments');

    commentsList.innerHTML = '';
    const currentPost = posts.find((post) => post.id === parseInt(picture.id, 10));
    currentPost
      .comments
      .forEach((comment) => {
        const commentElement = commentItemTemplate.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comment.avatar;
        commentElement.querySelector('.social__picture').alt = comment.name;
        commentElement.querySelector('.social__text').textContent = comment.message;
        commentsList.appendChild(commentElement);
      });
    bigPicture.querySelector('.social__caption').textContent = currentPost.description;
  });
});


