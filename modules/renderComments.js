
export function renderComments() {
    const app = document.getElementById('app');

    app.innerHTML = `
    <ul class="comments">
        <p class="primary-loader">
            Пожалуйста подождите. Загружаю комментарии...
        </p>
    </ul>

    <a class="comment-loader">Чтобы добавить комментарий, авторизуйтесь</a>

    <div class="add-form">
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
        />
        <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
        ></textarea>
        <div class="add-form-row">
            <button class="add-form-button">Написать</button>
        </div>
    </div>`
}