
export const boxForComments = `
<ul class="comments">
    <p class="primary-loader">
        Пожалуйста подождите. Загружаю комментарии...
    </p>
</ul>`

export const authorizationLink = `
<div class="authorize-box">
<p class="authorize-link">Чтобы добавить комментарий, авторизуйтесь</p>
</div>`

export function getFormForNewComment(userName) {
    return `
    <p class="comment-loader">
        Пожалуйста подождите. Добавляю комментарий...
    </p>
    <div class="add-form">
        <input
            type="text"
            class="add-form-name"
            placeholder="${userName}"
            readonly
            value="${userName}"
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

