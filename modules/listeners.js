import { comments } from './model.js';
import { commentsRenderer } from './view.js';
import { sendComment } from './api.js';

import { renewComments } from './model.js';
import { sanitizeHTML } from './sanitizeHTML.js';

const getLink = 'https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments';
const postLink = 'https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments';

// Опции для преобразования дат и времени в комментариях
const dateOptions = {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
};

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
};

// Функция добавления нового комментария 
function addComment() {

    // Объявляем переменную для кнопки формы
    const formButton = document.querySelector('.add-form-button');
    // Объявляем переменные для полей формы
    const formNameInput = document.querySelector('.add-form-name');
    const formTextArea = document.querySelector('.add-form-text');

    // Функция привязки клика к кнопке формы
    formButton.addEventListener('click', function (e) {
        // Захватываем содержание полей формы
        const name = formNameInput.value.trim();
        const comment = formTextArea.value.trim();

        // Проверяем корректность полей формы
        if (name === '' || comment === '') {
            alert('Заполните форму!');
            return;
        }

        const nameWithoutTag = sanitizeHTML(name);
        const commentWithoutTag = sanitizeHTML(comment);

        // Прячем форму и показываем лоадер
        const form = document.querySelector('.add-form');
        const commentLoader = document.querySelector('.comment-loader');
        form.style.display = 'none';
        commentLoader.style.display = 'block';

        (async () => {
            let stop = false;
            while (true) {
                commentLoader.textContent = 'Комментарий добавляется...';
                if (stop) break;
                stop = await sendComment(postLink, getLink, commentWithoutTag, nameWithoutTag)
                    .then((arr) => {
                        console.log('сохраняем массив с сервера в локальное хранилище...');
                        renewComments(arr);
                        console.log('рендерим массив...');
                        commentsRenderer(arr);

                        // Очищаем поля формы
                        formNameInput.value = '';
                        formTextArea.value = '';

                        // Показываем форму и прячем лоадер
                        form.style.display = '';
                        commentLoader.style.display = '';
                        return true;
                    })
                    .catch(async (error) => {
                        if (error.message.slice(0, 9) === 'Err: 500.') {
                            commentLoader.textContent = 'Отказ сервера. Ждем 5 секунд и пробуем снова...';
                            await new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve();
                                }, 5000);
                            })
                        }
                        else {
                            alert(error);
                            // Показываем форму и прячем лоадер
                            form.style.display = '';
                            commentLoader.style.display = '';
                            return true;
                        }
                    })
            }
        })();
    });
}

// Функция привязки клика к коментариям для их копирования в форму
function addCommentsListeners() {
    const commentsCollection = document.querySelectorAll('.comment');
    const formTextArea = document.querySelector('.add-form-text');

    commentsCollection.forEach((item) => {
        item.addEventListener('click', function (e) {
            const itemIndex = item.dataset.index;
            const name = comments[itemIndex].author.name;
            const comment = comments[itemIndex].text;

            const text = name + ': ' + comment;
            const textFormatted = `"${text}"`;

            formTextArea.value = textFormatted;
        });
    });
}

// Функция задержки для имитации загрузки лайков
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

// Функция привязки клика к кнопкам лайков
function addLikesListeners() {
    const likesButtonsCollection = document.querySelectorAll('.like-button');

    likesButtonsCollection.forEach((likeButton) => {
        likeButton.addEventListener('click', function (e) {
            e.stopPropagation();
            // Прикрепляем к лайку анимированный стиль "-loading-like"
            likeButton.classList.toggle('-loading-like');
            let likeButtonIndex = likeButton.dataset.index;
            let isLiked = comments[likeButtonIndex].isLiked;
            delay(2000).then(() => {
                isLiked
                    ? comments[likeButtonIndex].likes--
                    : comments[likeButtonIndex].likes++;
                comments[likeButtonIndex].isLiked =
                    !comments[likeButtonIndex].isLiked;
                likeButton.classList.toggle('-loading-like');
                commentsRenderer(comments);
            });
        });
    });
}

export {
    addComment,
    addCommentsListeners,
    addLikesListeners,
    dateOptions,
    timeOptions,
};
