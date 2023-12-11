const getData = (onSuccess, onFail) => {
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch(() => {
      onFail('Ошибка загрузки данных, попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://29.javascript.pages.academy/kekstagram/',
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
