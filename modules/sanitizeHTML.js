// Функция удаления тегов при их вводе в форму
export function sanitizeHTML(value) {
    return value.replaceAll("<", "&lt").replaceAll(">", "&gt");
}