import { posts } from './pictures.js';

const ADD_POSTS_NUMBER = 5;

const picturesLinkList = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

// Логика закрытия полноразмерного изображения
const toDefaultValues = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  loadMoreButton.classList.remove('hidden');
  commentsList.innerHTML = '';
};

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    toDefaultValues();
    document.removeEventListener('keydown', onEscRemove);
  }
};

bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
  toDefaultValues();
  document.removeEventListener('keydown', onEscRemove);
});

// Логика отображения полноразмерного изображения
picturesLinkList.forEach((picture) => {
  picture.addEventListener('click', () => {
    const currentPost = posts.find((post) => post.id === parseInt(picture.id, 10));

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
    let htmlFragment = (commentsNumber === 0)
      ? 'комментариев пока нет..'
      : `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
    bigPicture.querySelector('.social__comment-count').innerHTML = htmlFragment;

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
        if (commentsNumber - showedCommentsNumber <= ADD_POSTS_NUMBER) {

          loadMoreButton.classList.add('hidden');
          loadMoreButton.removeEventListener('click', handleMoreCommentsClick);

          currentPost.comments.slice(showedCommentsNumber, commentsNumber).forEach((comment) => {
            showNewComment(comment);
          });
          showedCommentsNumber += commentsNumber - showedCommentsNumber;
          htmlFragment = `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
          bigPicture.querySelector('.social__comment-count').innerHTML = htmlFragment;

        // Если - порций осталось несколько
        } else {

          currentPost.comments.slice(showedCommentsNumber, showedCommentsNumber + ADD_POSTS_NUMBER).forEach((comment) => {
            showNewComment(comment);
          });
          showedCommentsNumber += ADD_POSTS_NUMBER;
          htmlFragment = `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;
          bigPicture.querySelector('.social__comment-count').innerHTML = htmlFragment;
        }
      };
      loadMoreButton.addEventListener('click', handleMoreCommentsClick);
    }
  });
});


