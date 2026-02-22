
import { commentsRenderer } from './view.js';
import { comments } from './model.js';
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

function addComment() {
    // Объявляем переменную для кнопки формы 
    const formButton = document.querySelector('.add-form-button');
    // Функция привязки клика к кнопке формы
    formButton.addEventListener('click', function (e) {
        const formNameInput = document.querySelector('.add-form-name');
        const formTextArea = document.querySelector('.add-form-text');

        const name = formNameInput.value.trim();
        const comment = formTextArea.value.trim();

        if (name === "" || comment === "") return;

        const nameWithoutTag = sanitizeHTML(name);
        const commentWithoutTag = sanitizeHTML(comment);

        const commentDate = new Date();
        const commentFullTime = commentDate.toLocaleDateString('ru-RU', dateOptions) + " " + commentDate.toLocaleTimeString('ru-RU', timeOptions);

        comments.push({
            dataName: nameWithoutTag,
            dataDateTime: commentFullTime,
            dataComment: commentWithoutTag,
            dataIsLiked: false,
            dataLikesCounter: 0,
        })

        commentsRenderer();
        formNameInput.value = '';
        formTextArea.value = '';

    });
}


// Функция привязки клика к коментариям для их копирования в форму
function addCommentsListeners() {
    const commentsCollection = document.querySelectorAll('.comment');
    const formTextArea = document.querySelector('.add-form-text');

    commentsCollection.forEach(item => {
        item.addEventListener('click', function (e) {
            let itemIndex = item.dataset.index;
            let name = comments[itemIndex].dataName;
            let comment = comments[itemIndex].dataComment;

            let text = name + ": " + comment;
            let textFormatted = `"${text}"`;

            formTextArea.value = textFormatted;
        });
    })
}

// Функция привязки клика к кнопкам лайков
function addLikesListeners() {
    const likesButtonsCollection = document.querySelectorAll('.like-button');

    likesButtonsCollection.forEach(likeButton => {
        likeButton.addEventListener('click', function (e) {
            e.stopPropagation();
            let likeButtonIndex = likeButton.dataset.index;
            let isLiked = comments[likeButtonIndex].dataIsLiked;
            isLiked ? comments[likeButtonIndex].dataLikesCounter-- : comments[likeButtonIndex].dataLikesCounter++;
            comments[likeButtonIndex].dataIsLiked = !comments[likeButtonIndex].dataIsLiked;

            commentsRenderer();
        });
    })
}

export { addComment, addCommentsListeners, addLikesListeners };
