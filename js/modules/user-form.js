import { isEscapeKey } from './util.js';
import { MAX_LENGTH_OF_COMMENTS, MAX_COUNT_OF_HASHTAGS, HASHTAG_FORMAT, EFFECTS } from './constants.js';
import { sendData } from './api.js';

const input = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__wrapper');
const body = document.querySelector('body');

const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const closeButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const scaleSmallerBtn = form.querySelector('.scale__control--smaller');
const scaleBiggerBtn = form.querySelector('.scale__control--bigger');
const scaleValueInput = form.querySelector('.scale__control--value');
const imgPreview = form.querySelector('.img-upload__preview img');

const effectInput = form.querySelector('.effect-level__value');
const effectSlider = form.querySelector('.effect-level__slider');
const sliderWrapper = form.querySelector('.img-upload__effect-level');

const effectNone = form.querySelector('#effect-none');
const chrome = form.querySelector('#effect-chrome');
const sepia = form.querySelector('#effect-sepia');
const marvin = form.querySelector('#effect-marvin');
const phobos = form.querySelector('#effect-phobos');
const heat = form.querySelector('#effect-heat');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successButton = successElement.querySelector('.success__button');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');

const fileInput = form.querySelector('#upload-file');

let effect = '';

const openForm = () => {
  formOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  scaleValueInput.value = '100%';
  imgPreview.style.transform = 'scale(1)';

  createUiSlider();
  sliderWrapper.classList.add('hidden');
  imgPreview.style.removeProperty('filter');
};

input.addEventListener('change', openForm);

const closeForm = () => {
  formOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  input.value = '';
  hashtagsField.value = '';
  commentsField.value = '';

  effectSlider.noUiSlider.destroy();

  submitButton.disabled = false;
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

closeButton.addEventListener('click', closeForm);

const disableEscape = (evt) => {
  evt.stopPropagation();
};

hashtagsField.addEventListener('keydown', disableEscape);
commentsField.addEventListener('keydown', disableEscape);

//Валидация

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function validateHashtagsCount(value) {
  let result = true;

  value = value.trim();
  const hashtagsList = value.split(' ');

  if (hashtagsList.length > MAX_COUNT_OF_HASHTAGS) {
    result = false;
  }
  return result;
}

function validateHashtagsFormat(value) {
  let result = true;

  if (value === '') {
    result = true;
  } else {
    value = value.trim();
    const hashtagsList = value.split(' ');

    hashtagsList.forEach((hashtag) => {
      if (!HASHTAG_FORMAT.test(hashtag)) {
        result = false;
      }
    });
  }
  return result;
}

function validateHashtagsRepeat(value) {
  let result = true;

  value = value.trim();
  const hashtagsList = value.toLowerCase().split(' ');
  const checkHashtags = [];

  hashtagsList.forEach((hashtag) => {
    if (checkHashtags.includes(hashtag)) {
      result = false;
    }
    checkHashtags.push(hashtag);
  });
  return result;
}

function validateComments(value) {
  return value.length <= MAX_LENGTH_OF_COMMENTS;
}

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Кол-во хештегов не больше ${MAX_COUNT_OF_HASHTAGS}`
);
pristine.addValidator(
  hashtagsField,
  validateHashtagsFormat,
  'Хештег должен начинаться с символа # и содержать только буквы и цифры (длина хештега не больше 20 символов)'
);
pristine.addValidator(
  hashtagsField,
  validateHashtagsRepeat,
  'Хештеги не должны повторяться'
);
pristine.addValidator(
  commentsField,
  validateComments,
  `Длина комментария не должна превышать ${MAX_LENGTH_OF_COMMENTS} символов`
);

function formInputHandler (evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

form.addEventListener('input', formInputHandler);

//Масштабирование изображения

function increaseScaleValue () {
  let scaleValue = Number(scaleValueInput.value.slice(0, -1));
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleValueInput.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue/100})`;
  }
}

function decreaseScaleValue () {
  let scaleValue = Number(scaleValueInput.value.slice(0, -1));
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleValueInput.value = `${scaleValue}%`;
    imgPreview.style.transform = `scale(${scaleValue/100})`;
  }
}

scaleBiggerBtn.addEventListener('click', increaseScaleValue);
scaleSmallerBtn.addEventListener('click', decreaseScaleValue);

//Логика наложения эффектов

function createUiSlider () {
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value;
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectSlider.noUiSlider.on('update', () => {
    effectInput.value = effectSlider.noUiSlider.get();
    imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
  });

}

effectNone.addEventListener('click', () => {
  sliderWrapper.classList.add('hidden');
  imgPreview.style.removeProperty('filter');
  effect = EFFECTS.none;
});

chrome.addEventListener('click', () => {
  sliderWrapper.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  });
  effect = EFFECTS.chrome;
  imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
});

sepia.addEventListener('click', () => {
  sliderWrapper.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  });
  effect = EFFECTS.sepia;
  imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
});

marvin.addEventListener('click', () => {
  sliderWrapper.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  });
  effect = EFFECTS.marvin;
  imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
});

phobos.addEventListener('click', () => {
  sliderWrapper.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
  });
  effect = EFFECTS.phobos;
  imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
});

heat.addEventListener('click', () => {
  sliderWrapper.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
  });
  effect = EFFECTS.heat;
  imgPreview.style.filter = `${effect.name}(${effectInput.value}${effect.unit})`;
});

//отправка данных

const blockSubmitBtn = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'ОТПРАВКА...';
};

const unblockSubmitBtn = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
};

const removeErrorElement = () => {
  errorElement.remove();
  formOverlay.classList.remove('hidden');
  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', clickOutsideMessage);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeSuccessElement = () => {
  successElement.remove();
  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', clickOutsideMessage);
};

function onMessageKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorElement();
    removeSuccessElement();
  }
}

function clickOutsideMessage (evt) {
  const successInner = document.querySelector('.success__inner');
  const errorInner = document.querySelector('.error__inner');
  const click = evt.composedPath();

  if (!click.includes(successInner) && !click.includes(errorInner)) {
    removeSuccessElement();
    removeErrorElement();
  }
}

const onSuccessPost = () => {
  unblockSubmitBtn();
  closeForm();

  body.appendChild(successElement);

  successButton.addEventListener('click', () => {
    removeSuccessElement();
  });

  document.addEventListener('click', clickOutsideMessage);
  document.addEventListener('keydown', onMessageKeydown);
};

const onFailPost = () => {
  unblockSubmitBtn();
  formOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);

  body.appendChild(errorElement);

  errorButton.addEventListener('click', () => {
    removeErrorElement();
  });

  document.addEventListener('click', clickOutsideMessage);
  document.addEventListener('keydown', onMessageKeydown);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  blockSubmitBtn();

  sendData(
    () => onSuccessPost(),
    () => onFailPost(),
    new FormData(evt.target),
  );
});


// загрузка фото

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];

  imgPreview.src = URL.createObjectURL(file);
});
