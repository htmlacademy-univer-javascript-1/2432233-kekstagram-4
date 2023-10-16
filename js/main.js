const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Александр',
  'Михаил',
  'Дмитрий',
  'Артем',
  'Николай',
  'Сергей',
  'Екатерина',
  'Анастасия',
  'Анна',
  'Мария',
  'Ольга',
  'Татьяна',
  'Елена',
  'Светлана',
];

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
  'Экзотические пальмы на пляже',
];

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const getRandomId = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = getRandomId(1, 500);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const generatePhotoId = getRandomId(1, 25);
const generateUrlId = getRandomId(1, 25);

const createComments = () => Array.from({ length: getRandomInteger(0, 30) }, createComment);

const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createComments(),
});

const createPhotoDescriptions = () => Array.from({ length: 25 }, createPhotoDescription);

createPhotoDescriptions();
