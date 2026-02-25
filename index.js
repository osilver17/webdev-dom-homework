"use strict";

import { addComment } from './modules/listeners.js';
import { getComments } from './modules/api.js';

// Вызов функции получения всех комментариев
getComments();

// Вызов функции добавления нового комментария 
addComment();


