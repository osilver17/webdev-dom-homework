import { comments } from './model.js';
import { addCommentsListeners, addLikesListeners } from './listeners.js';

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
                            <button class="like-button${item.dataIsLiked ? ' -active-like' : ''}" data-index="${index}"></button>
                        </div>
                    </div>
                </li>`;
    }).join("");

    // Находим элемент "комментарии"
    const commentsEl = document.querySelector('.comments');

    // Отрисовка всех данных
    commentsEl.innerHTML = resultComments;

    // К отрисованным элементам прикрепляем слушателей кликов
    addCommentsListeners();
    addLikesListeners();
}

export { commentsRenderer };