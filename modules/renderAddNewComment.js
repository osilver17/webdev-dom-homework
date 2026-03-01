export function renderAddComment() {
    

    app.innerHTML = `
    <ul class="comments">
        <p class="primory-loader">
            Пожалуйста подождите. Загружаю комментарии...
        </p>
    </ul>

    <p class="comment-loader">Комментарий добавляется...</p>

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