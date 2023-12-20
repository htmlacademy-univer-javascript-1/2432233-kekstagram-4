import { URLS } from './constants.js';

const getData = (onSuccess, onFail) => {
  fetch(URLS.GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Ошибка загрузки данных, попробуйте обновить страницу');
      }
    })
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onFail('Ошибка загрузки данных, попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URLS.SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
