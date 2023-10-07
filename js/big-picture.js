// import { posts } from './pictures.js';
import { isEscEvent } from './utils.js';

const ADD_POSTS_NUMBER = 5;

const bigPicture = document.querySelector('.big-picture');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

// Логика закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  loadMoreButton.classList.remove('hidden');
  commentsList.innerHTML = '';
};

const onEscRemove = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onEscRemove);
  }
};

bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
  closeBigPicture();
  document.removeEventListener('keydown', onEscRemove);
});

// Логика отображения полноразмерного изображения
export const onPictureClick = (evt, posts) => {
  const currentPost = posts.find((post) => post.id === parseInt(evt.target.id, 10));

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEscRemove);

  bigPicture
    .querySelector('.big-picture__img img')
    .src = currentPost.url;
  bigPicture.querySelector('.likes-count').textContent = currentPost.likes;
  bigPicture.querySelector('.social__caption').textContent = currentPost.description;

  const commentTemplate = document.querySelector('#comment').content;
  const commentItemTemplate = commentTemplate.querySelector('li');

  commentsList.innerHTML = '';

  const commentsNumber = currentPost.comments.length;

  bigPicture.querySelector('.social__caption').textContent = currentPost.description;

  // Добавление комментария в разметку
  const showNewComment = (comment) => {
    const commentElement = commentItemTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsList.appendChild(commentElement);
  };

  let showedCommentsNumber = (commentsNumber <= ADD_POSTS_NUMBER) ? commentsNumber : ADD_POSTS_NUMBER;
  let commentsInfoFragment = (commentsNumber === 0)
    ? 'комментариев пока нет..'
    : `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
  bigPicture.querySelector('.social__comment-count').innerHTML = commentsInfoFragment;

  // Вывод комментариев
  if (commentsNumber <= ADD_POSTS_NUMBER) {
    loadMoreButton.classList.add('hidden');
    currentPost.comments.forEach((comment) => {
      showNewComment(comment);
    });
  } else {
    currentPost.comments.slice(0, ADD_POSTS_NUMBER).forEach((comment) => {
      showNewComment(comment);
    });
    // При нажатии на Загрузить еще
    const handleMoreCommentsClick = () => {
      // Если осталось загрузить последнюю порцию
      const lastCommentChungRemaining = commentsNumber - showedCommentsNumber <= ADD_POSTS_NUMBER;
      if (lastCommentChungRemaining) {

        loadMoreButton.classList.add('hidden');
        loadMoreButton.removeEventListener('click', handleMoreCommentsClick);

        currentPost.comments.slice(showedCommentsNumber, commentsNumber).forEach((comment) => {
          showNewComment(comment);
        });
        showedCommentsNumber += commentsNumber - showedCommentsNumber;
        commentsInfoFragment = `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
        bigPicture.querySelector('.social__comment-count').innerHTML = commentsInfoFragment;

      // Если - порций осталось несколько
      } else {

        currentPost.comments.slice(showedCommentsNumber, showedCommentsNumber + ADD_POSTS_NUMBER).forEach((comment) => {
          showNewComment(comment);
        });
        showedCommentsNumber += ADD_POSTS_NUMBER;
        commentsInfoFragment = `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
        bigPicture.querySelector('.social__comment-count').innerHTML = commentsInfoFragment;
      }
    };
    loadMoreButton.addEventListener('click', handleMoreCommentsClick);
  }
};
