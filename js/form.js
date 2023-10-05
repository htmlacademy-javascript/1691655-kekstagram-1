import { isProperHashtag } from './utils.js';

const MAX_HASHTAGS_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const IMAGE_SCALE_VALUES = ['25%', '50%', '75%', '100%'];
const EFFECTS = [
  {
    name: 'none',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  }
];

const editImageForm = document.querySelector('#upload-select-image');
const fileUploadInput = editImageForm.querySelector('#upload-file');
const editImageContainer = editImageForm.querySelector('.img-upload__overlay');
const editedImage = editImageForm.querySelector('.img-upload__preview img');
const scaleImageInput = editImageForm.querySelector('#scale-value');

scaleImageInput.setAttribute('value', '100%');

const closeEditImageForm = () => {
  editImageContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  editImageForm.reset();
};

const onEscRemove = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeEditImageForm();
    document.removeEventListener('keydown', onEscRemove);
  }
};

editImageForm.querySelector('#upload-cancel').addEventListener('click', () => {
  closeEditImageForm();
  document.removeEventListener('keydown', onEscRemove);
});

fileUploadInput.addEventListener('change', () => {
  editImageContainer.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEscRemove);

  editedImage.src = URL.createObjectURL(fileUploadInput.files[0]);
});

// изменение масштаба изображения
const convertScaleStringToDigit = (strValue) => parseInt(strValue.slice(0, -1), 10) / 100;
let currentScale = scaleImageInput.value;
editImageForm
  .querySelector('.scale__control--smaller')
  .addEventListener('click', () => {
    if (currentScale !== IMAGE_SCALE_VALUES[0]) {
      currentScale = IMAGE_SCALE_VALUES[Math.max(0, IMAGE_SCALE_VALUES.indexOf(currentScale) - 1)];
      scaleImageInput.setAttribute('value', currentScale);
      editedImage.style.transform = `scale(${convertScaleStringToDigit(currentScale)})`;
    }
  });
editImageForm
  .querySelector('.scale__control--bigger')
  .addEventListener('click', () => {
    if (currentScale !== IMAGE_SCALE_VALUES[IMAGE_SCALE_VALUES.length - 1]) {
      currentScale = IMAGE_SCALE_VALUES[Math.min(IMAGE_SCALE_VALUES.length - 1, IMAGE_SCALE_VALUES.indexOf(currentScale) + 1)];
      scaleImageInput.setAttribute('value', currentScale);
      editedImage.style.transform = `scale(${convertScaleStringToDigit(currentScale)})`;
    }
  });

// применение эффектов наложения
const imageEffectsSet = editImageForm.querySelector('.img-upload__effects');
const sliderElement = editImageContainer.querySelector('.img-upload__effect-level');
let currentEffect = '';
noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS[0].range.min,
    max: EFFECTS[0].range.max,
  },
  start: EFFECTS[0].start,
  step: EFFECTS[0].step,
});
sliderElement.noUiSlider.on('change', () => {
  console.log(sliderElement.noUiSlider.get());
});

// sliderElement.classList.add('hidden');
imageEffectsSet.addEventListener('change', (evt) => {
  evt.preventDefault();

  editedImage.classList.remove(`effects__preview--${currentEffect}`);
  if (evt.target.value !== 'none') {
    currentEffect = evt.target.value;
    editedImage.classList.add(`effects__preview--${currentEffect}`);
    sliderElement.classList.remove('hidden');

  } else {
    sliderElement.classList.add('hidden');
  }
});

// валидация полей хэштегов и комментария
const pristine = new Pristine (editImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// условие по хэштегам
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
  (commentString) => commentString.length < MAX_COMMENT_LENGTH,
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


