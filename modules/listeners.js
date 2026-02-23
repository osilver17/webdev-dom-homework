
import { comments } from './model.js';
import { sanitizeHTML } from './sanitizeHTML.js';
import { commentsRenderer } from './view.js';

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

        const commentDate = new Date().toISOString();

        // Комментарий сначала добавляем в локальное хранилище
        comments.push({
            author: { name: nameWithoutTag },
            date: commentDate,
            text: commentWithoutTag,
            isLiked: false,
            likes: 0,
        })

        // Рендерим из локального хранилища
        commentsRenderer();

        // Затем отправляем на сервер. Такая последовательность корректна?
        fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json' // Устанавливаем заголовок для JSON
            // },
            body: JSON.stringify({ text: commentWithoutTag, name: nameWithoutTag })
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))

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
            let name = comments[itemIndex].author.name;
            let comment = comments[itemIndex].text;

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
            let isLiked = comments[likeButtonIndex].isLiked;
            isLiked ? comments[likeButtonIndex].likes-- : comments[likeButtonIndex].likes++;
            comments[likeButtonIndex].isLiked = !comments[likeButtonIndex].isLiked;

            commentsRenderer();
        });
    })
}

export { addComment, addCommentsListeners, addLikesListeners, dateOptions, timeOptions };
