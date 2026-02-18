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
    addLikesListeners();
}

commentsRenderer();

function addLikesListeners() {
    const likesButtonsCollection = document.querySelectorAll('.like-button');
    likesButtonsCollection.forEach(likeButton => {
        likeButton.addEventListener('click', function (e) {
            let index = likeButton.dataset.index;
            let isLiked = comments[index].isLiked;
            isLiked ? comments[index].likesCounter-- : comments[index].likesCounter++;
            comments[index].isLiked = !comments[index].isLiked;
            
            commentsRenderer();
        });
    })
}

const dateOptions = {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
};

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
};

const buttonEl = document.querySelector('.add-form-button');

buttonEl.addEventListener('click', function (e) {
    const inputNameForm = document.querySelector('.add-form-name');
    const textAreaForm = document.querySelector('.add-form-text');

    const name = inputNameForm.value.trim();
    const comment = textAreaForm.value.trim();

    if (name === "" || comment === "") return;

    const commentDate = new Date();
    const commentFullTime = commentDate.toLocaleDateString('ru-RU', dateOptions) + " " + commentDate.toLocaleTimeString('ru-RU', timeOptions);

    comments.push({
        name: name,
        dateTime: commentFullTime,
        comment: comment,
        isLiked: false,
        likesCounter: 0,
    })

    commentsRenderer();
    inputNameForm.value = '';
    textAreaForm.value = '';

});