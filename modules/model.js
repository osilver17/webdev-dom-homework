// Хранилище данных приложения

const localComments = [
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
    localComments.length = 0;
    localComments.push(...arr);
}

export {localComments, renewComments};