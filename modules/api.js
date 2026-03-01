import {token} from './renderLogin.js';

const regLink = 'https://wedev-api.sky.pro/api/user';


// Функция запроса данных с сервера.

function getComments(getLink) {
    return fetch(getLink, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при чтении с сервера');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос для чтения с сервера');
            }

            if(response.status !== 200) {
                throw new Error(`Err: ${response.status}. Что-то при запросе пошло не так.`);
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

function sendComment(postLink, getLink, comment) {

    return fetch(postLink, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: comment,
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

            if(response.status !== 201) {
                throw new Error(`Err: ${response.status}. Что-то при запросе пошло не так.`);
            }
        })
        .then(() => getComments(getLink));
}

// Функция для удаления комментария.

function deleteComment(postLink, getLink, id) {

    return fetch(`${postLink}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log('При попытке удаления комментария response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке удаления комментария.');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос при удалении комментария.');
            }

            if(response.status !== 201) {
                throw new Error(`Err: ${response.status}. Что-то при запросе пошло не так.`);
            }
        })
        .then(() => getComments(getLink));
}

// Функция для логина.

function logIn(loginLink, login, password) {

    return fetch(loginLink, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            console.log('При попытке входа response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке входа.');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос при входе.');
            }

            if(response.status !== 201) {
                throw new Error(`Err: ${response.status}. Что-то при входе пошло не так.`);
            }

            return response;
        })
        .then((response) => response.json());
}

// Функция для регистрации.

function registration(regLink, login, name, password) {

    return fetch(regLink, {
        method: 'POST',
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    })
        .then((response) => {
            console.log('При попытке входа response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке регистрации.');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный запрос при регистрации.');
            }

            if(response.status !== 201) {
                throw new Error(`Err: ${response.status}. Что-то при регистрации пошло не так.`);
            }

            return response;
        })
        .then((response) => response.json());
}

export { getComments, sendComment, deleteComment, logIn, registration };