import { comments } from './model.js';
import { commentsRenderer } from './commentsRenderer.js';
import { sendComment } from './api.js';

import { renewComments } from './model.js';
import { sanitizeHTML } from './sanitizeHTML.js';

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

// Асинхронная функция дожатия добавления комментария на сервер
async function sendAndFetchComment(postLink, getLink, comment, name) {
    let stop = false;
    while (true) {
        commentLoader.textContent = 'Комментарий добавляется...';
        if (stop) break;
        stop = await sendComment(postLink, getLink, comment, name)
            .then((arr) => {
                console.log('сохраняем массив с сервера в локальное хранилище...');
                renewComments(arr);
                console.log('рендерим массив...');
                commentsRenderer(arr);

                // Очищаем поля формы
                formNameInput.value = '';
                formTextArea.value = '';

                // Показываем форму и прячем лоадер
                showForm(form, commentLoader);
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
                    showForm(form, commentLoader);
                    return true;
                }
            })
    }
}

// Функция добавления нового комментария 
function addComment(postLink, getLink) {

    // Объявляем переменную для кнопки формы
    const formButton = document.querySelector('.add-form-button');
    // Объявляем переменные для полей формы
    const formNameInput = document.querySelector('.add-form-name');
    const formTextArea = document.querySelector('.add-form-text');

    // Функция привязки клика к кнопке формы
    formButton.addEventListener('click', function (e) {

        // Очищаем содержание полей формы от пробелов
        const name = formNameInput.value.trim();
        const comment = formTextArea.value.trim();

        // Проверяем содержание полей формы на пустоту
        if (isDataBlank(name, comment)) {
            return;
        }

        // Очищаем содержание полей формы от тегов
        const nameWithoutTag = sanitizeHTML(name);
        const commentWithoutTag = sanitizeHTML(comment);

        // Прячем форму и показываем лоадер
        const form = document.querySelector('.add-form');
        const commentLoader = document.querySelector('.comment-loader');
        formHider(form, commentLoader);
        
        // Добавляем комментарий
        sendAndFetchComment(postLink, getLink, commentWithoutTag, nameWithoutTag);

    });
}

// Функция проверки введенных в форму данных на пустоту
function isDataBlank(name, comment) {

    if (name === '' || comment === '') {
        alert('Заполните форму!');
        return true;
    }
    else {
        return false;
    }
}

// Функция сокрытия формы и показа лоадера
function formHider(form, loader) {
    form.style.display = 'none';
    loader.style.display = 'block';
}

// Функция показа формы и сокрытия лоадера
function showForm(form, loader) {
    form.style.display = '';
    loader.style.display = '';
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
            const likeButtonIndex = likeButton.dataset.index;
            const isLiked = comments[likeButtonIndex].isLiked;
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
