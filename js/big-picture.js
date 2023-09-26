import { posts } from './pictures.js';

const ADD_POSTS_NUMBER = 5;

const picturesLinkList = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const loadMoreButton = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

<<<<<<< HEAD
=======
// Логика закрытия полноразмерного изображения
const toDefaultValues = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  loadMoreButton.classList.remove('hidden');
  commentsList.innerHTML = '';
};

>>>>>>> b128cdc (Отображение комментариев)
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

<<<<<<< HEAD
=======
// Логика отображения полноразмерного изображения
>>>>>>> b128cdc (Отображение комментариев)
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
    bigPicture.querySelector('.social__caption').textContent = picture;

    const commentTemplate = document.querySelector('#comment').content;
    const commentItemTemplate = commentTemplate.querySelector('li');

    commentsList.innerHTML = '';
    const currentPost = posts.find((post) => post.id === parseInt(picture.id, 10));
    const commentsNumber = currentPost.comments.length;

    bigPicture.querySelector('.social__caption').textContent = currentPost.description;

    // Отображение комментариев
    const showNewComment = (comment) => {
      const commentElement = commentItemTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      commentsList.appendChild(commentElement);
    };

    const showedCommentsNumber = (commentsNumber <= ADD_POSTS_NUMBER) ? commentsNumber : ADD_POSTS_NUMBER;
    const htmlFragment = `${showedCommentsNumber} из <span class="comments-count">${commentsNumber}</span> комментариев`;

    bigPicture.querySelector('.social__comment-count').innerHTML = htmlFragment;
    if (commentsNumber <= ADD_POSTS_NUMBER) {
      loadMoreButton.classList.add('hidden');
      currentPost
        .comments
        .forEach((comment) => {
          showNewComment(comment);
        });
    } else {
      currentPost
        .comments
        .slice(0, ADD_POSTS_NUMBER)
        .forEach((comment) => {
          showNewComment(comment);
        });
      loadMoreButton.addEventListener('click', () => {
        console.log('click');

        if (commentsNumber - showedCommentsNumber <= ADD_POSTS_NUMBER) {
          currentPost
            .comments
            .slice(showedCommentsNumber, commentsNumber)
            .forEach((comment) => {
              showNewComment(comment);
            });
        }
      });
    }
  });
});


