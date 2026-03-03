import { commentsRenderer } from './commentsRenderer.js';
import { boxForComments, getFormForNewComment } from './appParts.js';
import { localComments } from './model.js';
import { addComment } from './listeners.js';
import { postLink, getLink } from './links.js';
import { userName } from './user.js';


export function renderAddNewComment() {
    
    const app = document.getElementById('app');
    app.innerHTML = boxForComments + getFormForNewComment(userName);
    commentsRenderer(localComments);

    // Вызов функции добавления нового комментария 
    addComment(postLink, getLink);

}