"use strict";

// Хранилище данных приложения
const comments = [
    {
        dataName: "Глеб Фокин",
        dataDateTime: "12.02.22 12:18",
        dataComment: "Это будет первый комментарий на этой странице",
        dataIsLiked: false,
        dataLikesCounter: 3,
    },
    {
        dataName: "Варвара Н.",
        dataDateTime: "13.02.22 19:22",
        dataComment: "Мне нравится как оформлена эта страница! ❤",
        dataIsLiked: true,
        dataLikesCounter: 75,
    },
];

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

// Объявляем глобальные переменные для полей и кнопки формы 
const formNameInput = document.querySelector('.add-form-name');
const formTextArea = document.querySelector('.add-form-text');
const formButton = document.querySelector('.add-form-button');

// Функция отрисовки комментариев:
function commentsRenderer() {
    const resultComments = comments.map((item, index) => {
        return `<li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${item.dataName}</div>
                        <div>${item.dataDateTime}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${item.dataComment}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${item.dataLikesCounter}</span>
                            <button class="like-button ${item.dataIsLiked ? '-active-like' : ''}" data-index="${index}"></button>
                        </div>
                    </div>
                </li>`;
    }).join("");

    const commentsEl = document.querySelector('.comments');
    commentsEl.innerHTML = resultComments;
    addCommentsListeners();
    addLikesListeners();
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

// Функция привязки клика к коментариям для их копирования в форму
function addCommentsListeners() {
    const commentsCollection = document.querySelectorAll('.comment');

    commentsCollection.forEach(item => {
        item.addEventListener('click', function (e) {
            let itemIndex = item.dataset.index;
            let name = comments[itemIndex].dataName;
            let comment = comments[itemIndex].dataComment;
            let text = name + ": " + comment;
            let textFormatted = `<<${text}>>`;
            formTextArea.innerHTML = textFormatted;
        });
    })
}

// Функция привязки клика к кнопке формы
formButton.addEventListener('click', function (e) {

    const name = formNameInput.value.trim();
    const comment = formTextArea.value.trim();

    if (name === "" || comment === "") return;

    const nameWithoutTag = name.replace(/(<([^>]+)>)/gi, '');
    const commentWithoutTag = comment.replace(/(<([^>]+)>)/gi, '');

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

// Отрисовка данных в хранилище
commentsRenderer();