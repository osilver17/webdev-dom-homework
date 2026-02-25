import { comments } from './model.js';
import { commentsRenderer } from './view.js';
import { sendComment } from './api.js';

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

    // Функция привязки клика к кнопке формы
    formButton.addEventListener('click', function (e) {
        sendComment();
    });
}

// Функция привязки клика к коментариям для их копирования в форму
function addCommentsListeners() {
    const commentsCollection = document.querySelectorAll('.comment');
    const formTextArea = document.querySelector('.add-form-text');

    commentsCollection.forEach((item) => {
        item.addEventListener('click', function (e) {
            let itemIndex = item.dataset.index;
            let name = comments[itemIndex].author.name;
            let comment = comments[itemIndex].text;

            let text = name + ': ' + comment;
            let textFormatted = `"${text}"`;

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
