"use strict";
import { commentsRenderer } from './modules/view.js';
import { addComment } from './modules/listeners.js';

// Отрисовка данных из хранилища
commentsRenderer();
// Вызов функции добавления нового комментария 
addComment();
