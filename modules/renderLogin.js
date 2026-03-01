import {initLoginListener} from './listeners.js'
import {loginLink} from './links.js'

function renderLogin() {
    const app = document.getElementById('app');

    app.innerHTML = `
    <h2 class="enter">Чтобы ввести комментарий, войдите</h2>
    <div class="enter-form">
        <input
            type="text"
            class="enter-form-login"
            placeholder="Введите ваш логин"
        />
        <input
            type="password"
            class="enter-form-password"
            placeholder="Введите ваш пароль"
        ></input>
        <div class="enter-form-row">
            <button class="enter-form-button">Войти</button>
            <button class="enterReg-form-button">Зарегистрироваться</button>
        </div>
    </div>`;

    initLoginListener(loginLink);
}

export {renderLogin};


