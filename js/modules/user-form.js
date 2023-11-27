import { isEscapeKey } from './util.js';
import { MAX_LENGTH_OF_COMMENTS, MAX_LENGTH_OF_HASHTAG, HASHTAG_FORMAT } from './constants.js';

const input = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const closeButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const openForm = () => {
  form.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

input.addEventListener('change', openForm);

const closeForm = () => {
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  input.value = '';
  hashtagsField.value = '';
  commentsField.value = '';
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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function validateHashtags(value) {
  let result = true;

  if (value === '') {
    result = true;
  } else {
    value.trim();
    const hashtagsList = value.split(' ');

    if (hashtagsList.length > MAX_LENGTH_OF_HASHTAG) {
      result = false;
    }

    const checkHashtags = [];

    hashtagsList.forEach((hashtag) => {
      if (!HASHTAG_FORMAT.test(hashtag) || checkHashtags.includes(hashtag)) {
        result = false;
      }
      checkHashtags.push(hashtag);
    });
  }

  return result;
}

function validateComments(value) {
  return value.length <= MAX_LENGTH_OF_COMMENTS;
}

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Набран некорректный хештег'
);
pristine.addValidator(
  commentsField,
  validateComments,
  `Длина комментария не должна превышать ${MAX_LENGTH_OF_COMMENTS} символов`
);

function formFunction (evt) {
  evt.preventDefault();

  if (!pristine.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

form.addEventListener('input', formFunction);
