
import { addCommentsListeners, addLikesListeners, dateOptions, timeOptions } from './listeners.js';

// Функция отрисовки комментариев:
function commentsRenderer(arr) {
    const allComments = arr.map((item, index) => {
        return `<li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${item.author.name}</div>
                        <div>${new Date(item.date).toLocaleDateString('ru-RU', dateOptions) + " " + new Date(item.date).toLocaleTimeString('ru-RU', timeOptions)}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${item.text}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${item.likes}</span>
                            <button class="like-button${item.isLiked ? ' -active-like' : ''}" data-index="${index}"></button>
                        </div>
                    </div>
                </li>`;
    }).join("");

    // Находим элемент "комментарии"
    const commentsEl = document.querySelector('.comments');

    // Отрисовка всех данных
    commentsEl.innerHTML = allComments;

    // К отрисованным элементам прикрепляем слушателей кликов
    addCommentsListeners();
    addLikesListeners();
}

export { commentsRenderer };