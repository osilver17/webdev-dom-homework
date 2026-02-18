"use strict";
const comments = [
    {
        name: "Глеб Фокин",
        dateTime: "12.02.22 12:18",
        comment: "Это будет первый комментарий на этой странице",
        isLiked: false,
        likesCounter: 3,
    },
    {
        name: "Варвара Н.",
        dateTime: "13.02.22 19:22",
        comment: "Мне нравится как оформлена эта страница! ❤",
        isLiked: true,
        likesCounter: 75,
    },
];

function commentsRenderer() {
    const resultComments = comments.map((item, index) => {
        return `<li class="comment">
                    <div class="comment-header">
                        <div>${item.name}</div>
                        <div>${item.dateTime}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${item.comment}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${item.likesCounter}</span>
                            <button class="like-button ${item.isLiked?'-active-like':''}" data-index="${index}"></button>
                        </div>
                    </div>
                </li>`;
    }).join("");
    
    const commentsEl = document.querySelector('.comments');
    commentsEl.innerHTML = resultComments;
}

commentsRenderer();

const dateOptions = {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
};

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
};

// const commentsEl = document.querySelector('.comments');
const commentEl = document.querySelector('.comment');
const buttonEl = document.querySelector('.add-form-button');

let likesCounter = 0;

buttonEl.addEventListener('click', function (e) {
    const inputNameEl = document.querySelector('.add-form-name');
    const textAreaEl = document.querySelector('.add-form-text');

    const name = inputNameEl.value.trim();
    const text = textAreaEl.value.trim();

    if (name === "" || text === "") return;

    const newCommentEl = commentEl.cloneNode(true);
    const headerEl = newCommentEl.querySelector('.comment-header');
    const commentTextEl = newCommentEl.querySelector('.comment-text');
    const commentLikesNumberEl = newCommentEl.querySelector('.likes-counter');
    commentLikesNumberEl.textContent = likesCounter;

    const commentDate = new Date();
    const commentFullTime = commentDate.toLocaleDateString('ru-RU', dateOptions) + " " + commentDate.toLocaleTimeString('ru-RU', timeOptions);

    headerEl.firstElementChild.textContent = name;
    headerEl.lastElementChild.textContent = commentFullTime;
    commentTextEl.textContent = text;

    commentsEl.appendChild(newCommentEl);

    inputNameEl.value = '';
    textAreaEl.value = '';

});