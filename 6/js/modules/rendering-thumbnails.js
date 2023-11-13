import { createPhotoDescriptions } from './create-photo.js';

const picturesList = document.querySelector('.pictures');
const pixtureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const pictures = createPhotoDescriptions(2);

pictures.forEach((picture) => {
  const pictureElement = pixtureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes.length;

  picturesFragment.append(pictureElement);
});

picturesList.append(picturesFragment);
