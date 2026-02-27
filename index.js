"use strict";
import { renewComments } from './modules/model.js';
import { commentsRenderer } from './modules/view.js';
import { addComment } from './modules/listeners.js';
import { getComments } from './modules/api.js';

const getLink = 'https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments';
const postLink = 'https://wedev-api.sky.pro/api/v1/oleg-serebrennikov/comments';

// Вызов функции получения всех комментариев
getComments(getLink)
    .then((comments) => {
        console.log('Обновляем массив локального хранилища данными от сервера...');
        renewComments(comments);
        console.log('рендерим массив из локального хранилища при начальной загрузке...');
        commentsRenderer(comments);
    })
    .catch((error) => console.log(error));

// Вызов функции добавления нового комментария 
addComment(postLink, getLink);


