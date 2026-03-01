
import { logIn } from './api.js'
import { renderComments } from './renderComments.js'

let token = ``;

function updateToken(newToken) {
    token = newToken;
}

const loginLink = 'https://wedev-api.sky.pro/api/user/login';

function renderLogin() {
    const app = document.getElementById('app');

    app.innerHTML = `
    <ul class="comments">
        <p class="primory-loader">
            Пожалуйста подождите. Загружаю комментарии...
        </p>
    </ul>
    <h1 class="enter">Чтобы ввести комментарий, войдите</h1>
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
}


function initLoginListener() {
    const loginElement = document.querySelector('.enter-form-login');
    const passwordElement = document.querySelector('.enter-form-password');
    const enterButtonElement = document.querySelector('.enter-form-button');
    const enterRegButtonElement = document.querySelector('.enterReg-form-button');

    console.log(enterButtonElement);


    enterButtonElement.addEventListener('click', () => {
        const login = loginElement.value.trim();
        const password = passwordElement.value.trim();
        
        if(password === '' || login === '') {
            alert("Введите логин и пароль!");
            return;
        }

        logIn(
            loginLink,
            login,
            password,
        )
            .then((res) => {
                console.log(res.user.token);
                
                updateToken(res.user.token);
                renderComments();
                console.log('token =', token);
                }
            );
    })
}

export {token, renderLogin, initLoginListener};


