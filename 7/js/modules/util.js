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

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, getRandomId, isEscapeKey };
