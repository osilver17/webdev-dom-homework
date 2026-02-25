import { comments, renewComments } from './model.js';
import { commentsRenderer } from './view.js';
import { sanitizeHTML } from './sanitizeHTML.js';

// Функция запроса данных с сервера и обновления локальных данных в модели

function getComments() {
    fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments', {
        method: "GET",
    })
        .then((response) => {
            console.log('При попытке начального скачивания комментариев response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке начальной загрузки комментариев');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный начальный запрос комментариев');
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => {
            renewComments(data.comments);
        })
        .then(() => {
            // Отрисовка данных из хранилища
            console.log('рендерим массив из локального хранилища при начальной загрузке...');
            commentsRenderer(comments);
        })
        .catch((error) => alert(error));
}

// Функция для отправки комментария на сервер. При Err=500 отправляем заново.

function sendComment() {
    const formNameInput = document.querySelector('.add-form-name');
    const formTextArea = document.querySelector('.add-form-text');

    const name = formNameInput.value.trim();
    const comment = formTextArea.value.trim();

    if (name === '' || comment === '') return;

    const nameWithoutTag = sanitizeHTML(name);
    const commentWithoutTag = sanitizeHTML(comment);

    function fetchNewComment() {
        // Прячем форму и показываем лоадер
        const form = document.querySelector('.add-form');
        const commentLoader = document.querySelector('.comment-loader');
        form.style.display = 'none';
        commentLoader.style.display = 'block';

        fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments', {
            method: 'POST',

            body: JSON.stringify({
                text: commentWithoutTag,
                name: nameWithoutTag,
                forceError: true,
            }),
        }).then((response) => {
            console.log('При попытке добавления комментария response.status =', response.status);

            if (response.status === 500) {
                throw new Error('Err: 500. Сервер сломался при попытке добавления комментария. Пробуем еще раз?');
            }

            if (response.status === 400) {
                throw new Error('Err: 400. Неправильный комментарий');
            }
        })
            .then(() =>
                fetch(
                    'https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments',
                ),
            )
            .then((response) => {

                console.log('При попытке скачивания комментариев response.status =', response.status);

                if (response.status === 500) {
                    throw new Error('Err: 500. Сервер сломался при попытке загрузки комментариев');
                }

                if (response.status === 400) {
                    throw new Error('Err: 400. Неправильный запрос комментариев');
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => data.comments)
            .then((arr) => {
                console.log('сохраняем массив с сервера в локальное хранилище...');
                renewComments(arr);
                console.log('рендерим массив...');
                commentsRenderer(arr);
                formNameInput.value = '';
                formTextArea.value = '';
                form.style.display = '';
                commentLoader.style.display = '';
            })
            .catch((error) => {
                if (error.message.slice(0, 9) === 'Err: 500.') {
                    if (confirm(error.message)) {
                        fetchNewComment();
                    }
                    else {
                        form.style.display = '';
                        commentLoader.style.display = '';
                    }
                }
                else {
                    alert(error);
                    form.style.display = '';
                    commentLoader.style.display = '';
                }
            })
            .finally(() => {
                // form.style.display = '';
                // commentLoader.style.display = '';
            })
    }

    fetchNewComment();
}

export { getComments, sendComment };