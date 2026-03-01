import { renderLogin } from './renderLogin.js';

import { boxForComments, authorizationLink, formForNewComments } from './appParts.js';
import { localComments, renewComments } from './model.js';
import { commentsRenderer } from './commentsRenderer.js';
import { addComment } from './listeners.js';
import { getComments } from './api.js';
import { getLink } from './links.js';

// Функция отрисовки главной страницы
function mainPage() {
    const app = document.getElementById('app');
    app.innerHTML = boxForComments + authorizationLink;

    // Вызов функции получения всех комментариев
    getComments(getLink)
        .then((comments) => {
            console.log('Обновляем массив локального хранилища comments от сервера...=', comments);
            console.log(renewComments(comments));
            console.log('рендерим массив из локального хранилища при начальной загрузке...');
            commentsRenderer(localComments);
        })
        .catch((error) => console.log(error));

    // Ставим слушатель на authorizationLink для выхода на страницу логина
    document.querySelector('.authorize-box').addEventListener('click', () => renderLogin());
    
}

export {mainPage};
