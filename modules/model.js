// Хранилище данных приложения

let localComments = [
    {
        id: 1,
        author: { name: "Глеб Фокин" },
        date: "2026-02-23T12:28:59.008Z",
        text: "Это будет первый комментарий на этой странице",
        isLiked: false,
        likes: 3,
    },
];

function renewComments(arr) {
    localComments = arr;
    return localComments;
}

export {localComments, renewComments};