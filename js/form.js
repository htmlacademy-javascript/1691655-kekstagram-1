import { isEscEvent, isProperHashtag } from './utils.js';

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
    filter: 'none',
    connect: 'lower',
  },
  {
    name: 'chrome',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: .1,
    filter: 'grayscale',
    unit: '',
  },
  {
    name: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: .1,
    filter: 'sepia',
    unit: '',
  },
  {
    name: 'marvin',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  {
    name: 'phobos',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: .1,
    filter: 'blur',
    unit: 'px',
  },
  {
    name: 'heat',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: .1,
    filter: 'brightness',
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];

const editImageForm = document.querySelector('#upload-select-image');
const fileUploadInput = editImageForm.querySelector('#upload-file');
const editImageContainer = editImageForm.querySelector('.img-upload__overlay');
const editedImage = editImageForm.querySelector('.img-upload__preview img');

const closeEditImageForm = () => {
  editImageContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  editImageForm.reset();
};

const onEscRemove = (evt) => {
  if (isEscEvent(evt)) {
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
const scaleImageInput = editImageForm.querySelector('#scale-value');
let currentScale = scaleImageInput.value;

scaleImageInput.setAttribute('value', '100%');
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
const imageEffectsSet = editImageContainer.querySelector('.img-upload__effects');
const effectLevelContainer = editImageContainer.querySelector('.img-upload__effect-level');
const sliderElement = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');
// начальные значения
let currentEffect = DEFAULT_EFFECT;
noUiSlider.create(sliderElement, {
  range: {
    min: currentEffect.range.min,
    max: currentEffect.range.max,
  },
  start: currentEffect.start,
  step: currentEffect.step,
  connect: 'lower',
});
effectLevelValue.value = sliderElement.noUiSlider.get();
effectLevelContainer.classList.add('hidden');

// обработчики
const onChangeEffect = (evt) => {
  evt.preventDefault();
  editedImage.classList.remove(`effects__preview--${currentEffect.name}`);
  editedImage.style = '';
  currentEffect = EFFECTS.find((el) => el.name === evt.target.value);

  sliderElement.noUiSlider.updateOptions({
    name: currentEffect.name,
    range: {
      min: currentEffect.range.min,
      max: currentEffect.range.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });

  if (currentEffect !== DEFAULT_EFFECT) {
    effectLevelContainer.classList.remove('hidden');
    editedImage.classList.add(`effects__preview--${currentEffect.name}`);
  } else {
    effectLevelContainer.classList.add('hidden');
  }
};

sliderElement.noUiSlider.on('change', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  editedImage.style.filter = (currentEffect === DEFAULT_EFFECT)
    ? DEFAULT_EFFECT.filter
    : `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
});

imageEffectsSet.addEventListener('change', onChangeEffect);

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
  const isEveryHashtags = hashtags.every(isProperHashtag);
  const isHashtagUnique = (new Set(hashtags)).size === hashtags.length;
  const isAvailableHashtagsAmount = hashtags.length <= MAX_HASHTAGS_NUMBER;

  return isEveryHashtags && isHashtagUnique && isAvailableHashtagsAmount;
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


