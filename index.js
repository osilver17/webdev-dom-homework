"use strict";
import { commentsRenderer } from './modules/view.js';
import { addComment } from './modules/listeners.js';
import { renewComments } from './modules/model.js';


// Функция запроса данных с сервера и обновления локальных данных в модели
fetch('https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments', {
    method: "GET",
})
    .then((response) => response.json())
    .then((data) => {
        renewComments(data.comments);
        // Отрисовка данных из хранилища
        commentsRenderer();
    })
    .catch((error) => console.log(error));

// Вызов функции добавления нового комментария 
addComment();


