import { MESSAGES, NAMES, DESCRIPTIONS, NUMBER_OF_PHOTO } from './constants.js';
import { getRandomInteger, getRandomArrayElement, getRandomId } from './random.js';

const generateCommentId = getRandomId(1, 500);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const generatePhotoId = getRandomId(1, NUMBER_OF_PHOTO);
const generateUrlId = getRandomId(1, NUMBER_OF_PHOTO);

const createComments = () => Array.from({ length: getRandomInteger(0, 30) }, createComment);

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments(),
});

const createPhotoDescriptions = (count) => Array.from({ length: count }, createPhotoDescription);

export { createPhotoDescriptions };
