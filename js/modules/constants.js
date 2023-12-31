const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Иван', 'Александр', 'Михаил', 'Дмитрий', 'Артем', 'Николай', 'Сергей', 'Екатерина',
  'Анастасия', 'Анна', 'Мария', 'Ольга', 'Татьяна', 'Елена', 'Светлана'];

const DESCRIPTIONS = [
  'Прекрасный закат на океане',
  'Величественные горы в снежных вершинах',
  'Романтическая прогулка по цветочным полям',
  'Таинственный лес с лучами солнца',
  'Удивительные оттенки осени в парке',
  'Милая кошка, сидящая на окне',
  'Облака в форме сказочного замка',
  'Уютная деревенская избушка',
  'Темный лес с пеленой тумана',
  'Экзотические пальмы на пляже'
];

const NUMBER_OF_PHOTO = 25;

const COUNT_OF_COMMENTS_TO_SHOW = 5;

const HASHTAG_FORMAT = /^#[a-zа-яё0-9]{1,19}$/i;

const MAX_LENGTH_OF_COMMENTS = 140;

const MAX_COUNT_OF_HASHTAGS = 5;

const EFFECTS = {
  none: {name: 'none', unit: ''},
  chrome: {name: 'grayscale', unit: ''},
  sepia: {name: 'sepia', unit: ''},
  marvin: {name: 'invert', unit: '%'},
  phobos: {name: 'blur', unit: 'px'},
  heat: {name: 'brightness', unit: ''},
};

const SHOW_ALERT_TIME = 2000;

const URLS = {
  GET_DATA_URL: 'https://29.javascript.pages.academy/kekstagram/data',
  SEND_DATA_URL: 'https://29.javascript.pages.academy/kekstagram',
};

const COUNT_RANDOM_PICTURES = 10;

const RENDER_DELAY = 500;

export {MESSAGES, NAMES, DESCRIPTIONS, NUMBER_OF_PHOTO, COUNT_OF_COMMENTS_TO_SHOW, MAX_LENGTH_OF_COMMENTS,
  MAX_COUNT_OF_HASHTAGS, HASHTAG_FORMAT, SHOW_ALERT_TIME, EFFECTS, URLS, COUNT_RANDOM_PICTURES, RENDER_DELAY};
