import { getRandomInt } from './utils.js';

const POSTS_NUMBERS = 25;
const MIN_LIKES_RATE = 25;
const MAX_LIKES_RATE = 200;
const MAX_COMMENTS_NUMBER = 4;
const MAX_COMMENT_ID = 300;
const TEXT_FOR_COMMENT = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';
const AUTHOR_NAMES = ['Артём', 'Макс', 'Лидия'];

const createPost = (_, index) => {
  const previousCommentIds = [];
  const previousImageNumbers = [];

  const createComment = () => {
    let currentId = getRandomInt(0, MAX_COMMENT_ID);
    while (previousCommentIds.includes(currentId)) {
      currentId = getRandomInt(0, MAX_COMMENT_ID);
    }

    return {
      id: currentId,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: TEXT_FOR_COMMENT
        .match(/\(?[^.?\\!]+[.!?]\)?/g)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .join('')
        .trimStart(),
      name: AUTHOR_NAMES[getRandomInt(0, AUTHOR_NAMES.length - 1)]
    };
  };

  if (previousImageNumbers.length > (POSTS_NUMBERS)) {
    throw(new Error('Необходимое количество объектов создано.'));
  }

  let currentImageNumber = getRandomInt(1, POSTS_NUMBERS);

  while (previousImageNumbers.includes(currentImageNumber)) {
    currentImageNumber = getRandomInt(1, POSTS_NUMBERS);
  }
  previousImageNumbers.push(currentImageNumber);

  return {
    id: index + 1,
    url: `${currentImageNumber}.jpg`,
    description: 'строка — описание фотографии. Описание придумайте самостоятельно.',
    likes: getRandomInt(MIN_LIKES_RATE, MAX_LIKES_RATE),
    comments: Array.from({length: getRandomInt(0, MAX_COMMENTS_NUMBER)}, createComment),
  };
};

const createPosts = () => Array.from({length: POSTS_NUMBERS}, createPost);

export {createPosts};
