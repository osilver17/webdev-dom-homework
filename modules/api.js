
// Функция запроса данных с сервера и обновления локальных данных в модели
function getComments(getLink) {
    return fetch(getLink)
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при чтении с сервера');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос для чтения с сервера');
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Передаем массив от сервера');
            return data.comments
        });
}

// Функция для отправки комментария на сервер.

function sendComment(postLink, getLink, comment, userName) {

    return fetch(postLink, {
        method: 'POST',

        body: JSON.stringify({
            text: comment,
            name: userName,
            forceError: true,
        }),
    })
        .then((response) => {
            console.log('При попытке добавления комментария response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке добавления комментария.');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос при добавлении комментария.');
            }
        })
        .then(() => getComments(getLink));
}

export { getComments, sendComment };