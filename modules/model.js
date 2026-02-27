// Хранилище данных приложения

let comments = [
    // {
    //     id: 1,
    //     author: { name: "Глеб Фокин" },
    //     date: "2026-02-23T12:28:59.008Z",
    //     text: "Это будет первый комментарий на этой странице",
    //     isLiked: false,
    //     likes: 3,
    // },
];

function renewComments(data) {
    comments = data;
}

export {comments, renewComments};