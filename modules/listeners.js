
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

        // После захвата полей формы можем ее "спрятать" и показать лоадер
        const form = document.querySelector('.add-form');
        const commentLoader = document.querySelector('.comment-loader');
        form.style.display = 'none';
        commentLoader.style.display = 'block';

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

        // // Рендерим из локального хранилища
        // console.log('рендерим массив из локального хранилища после добавления нового комментария...');
        // commentsRenderer(comments);

        // Затем отправляем на сервер. Такая последовательность корректна?
        fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json' // Устанавливаем заголовок для JSON
            // },
            body: JSON.stringify({ text: commentWithoutTag, name: nameWithoutTag })
        })
            .then(() => fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments'))
            .then((response) => response.json())
            .then((data) => data.comments)
            .then((arr) => {
                console.log('рендерим массив с сервера...');
                commentsRenderer(arr);
                formNameInput.value = '';
                formTextArea.value = '';

                form.style.display = '';
                commentLoader.style.display = '';
            })
            .catch((error) => console.log(error))

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

    likesButtonsCollection.forEach(likeButton => {
        likeButton.addEventListener('click', function (e) {
            e.stopPropagation();
            // Прикрепляем к лайку анимированный стиль "-loading-like"
            likeButton.classList.toggle('-loading-like');
            let likeButtonIndex = likeButton.dataset.index;
            let isLiked = comments[likeButtonIndex].isLiked;
            delay(2000)
                .then(() => {
                    isLiked ? comments[likeButtonIndex].likes-- : comments[likeButtonIndex].likes++;
                    comments[likeButtonIndex].isLiked = !comments[likeButtonIndex].isLiked;
                    likeButton.classList.toggle('-loading-like');
                    commentsRenderer(comments);
                });

            
        });
    })
}

export { addComment, addCommentsListeners, addLikesListeners, dateOptions, timeOptions };
