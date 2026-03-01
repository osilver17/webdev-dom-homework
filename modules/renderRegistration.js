
import {regLink} from './links.js'
import {initRegListener} from './listeners.js'


function renderRegistration() {
    const app = document.getElementById('app');

    app.innerHTML = `
    <h1 class="reg">Страница регистрации</h1>
    <div class="reg-form">
        <input
            type="text"
            class="reg-form-name"
            placeholder="Введите ваше имя"
        />
        <input
            type="text"
            class="reg-form-login"
            placeholder="Введите ваш логин"
        />
        <input
            type="password"
            class="reg-form-password"
            placeholder="Введите ваш пароль"
        ></input>
        <div class="reg-form-row">
            <button class="reg-form-button">Отправить</button>
        </div>
    </div>`;

    initRegListener(regLink);
}

export {renderRegistration};
