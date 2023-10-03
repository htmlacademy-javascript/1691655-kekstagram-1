import { isProperHashtag } from './utils.js';

const MAX_HASHTAGS_NUMBER = 5;

const input = document.querySelector('#upload-file');
const editImageForm = document.querySelector('#upload-select-image');
const editImageContainer = editImageForm.querySelector('.img-upload__overlay');
const editedImage = document.querySelector('.img-upload__preview img');


const toDefaultValues = () => {
  editImageContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  editImageForm.reset();
};

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    toDefaultValues();
    document.removeEventListener('keydown', onEscRemove);
  }
};

editImageForm.querySelector('#upload-cancel').addEventListener('click', () => {
  toDefaultValues();
  document.removeEventListener('keydown', onEscRemove);
});

input.addEventListener('change', () => {
  editImageContainer.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEscRemove);

  editedImage.src = URL.createObjectURL(input.files[0]);
});

const pristine = new Pristine (editImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// условие по хэтегам
const hashtagsInput = editImageContainer.querySelector('.text__hashtags');
const validateHashtags = (hashtagsString) => {
  if (hashtagsString.trim().length === 0) {
    return true;
  }
  const hashtags = hashtagsString.trim().split(/\s+/);
  // проверка каждого хэштега
  let isProperHashtags = hashtags.every(isProperHashtag);
  // проверка наличия повторояющихся хэштегов
  isProperHashtags = isProperHashtags && (new Set(hashtags)).size === hashtags.length;
  // проверка количества хэштегов
  isProperHashtags = isProperHashtags && hashtags.length <= MAX_HASHTAGS_NUMBER;

  return isProperHashtags;
};
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'ошибка при вводе хэштегов'
);
hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

// условие по комментариям
const commnentsInput = editImageContainer.querySelector('.text__description');
pristine.addValidator(
  commnentsInput,
  (commentString) => commentString.length < 5,
  'ошибка при вводе комментария'
);
commnentsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

editImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

