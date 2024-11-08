import baseAvatar from "../images/avatar.jpg";

const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-25",
    headers: {
        authorization: "316e4a9b-05bc-4b79-808c-b1e75a04d6f1",
        'Content-Type': 'application/json'
        }
    }

export function getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-25/cards", {
    headers: {
        authorization: "316e4a9b-05bc-4b79-808c-b1e75a04d6f1",
        'Content-Type': 'application/json'
        }
    })
    .then((res) => getResponseData(res));
    }

export const getAboutUser = () =>{
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-25/users/me",{
        headers: {
            authorization: "316e4a9b-05bc-4b79-808c-b1e75a04d6f1",
            'Content-Type': 'application/json'
            }
    })
    .then((res) => getResponseData(res));
}


export function patchProfile(name, description) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-25/users/me', {
        headers: {
            authorization: "316e4a9b-05bc-4b79-808c-b1e75a04d6f1",
            'Content-Type': 'application/json'
            },
        method: "PATCH",
        body: JSON.stringify({
        name: name,
        about: description,
    }),
    })
    .then((res) => getResponseData(res));
}

export function postNewCard(name, link) {
    return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-25/cards", {
        method: "POST",
        headers:{
            authorization: '316e4a9b-05bc-4b79-808c-b1e75a04d6f1',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: name,
        link: link,
    }),
    })
    .then((res) => getResponseData(res));
}

export function deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-25/cards/${cardId}`, {
        headers: {
            authorization: '316e4a9b-05bc-4b79-808c-b1e75a04d6f1',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
    })
    .then((res) => getResponseData(res));
}

export function putLike(cardId) {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "PUT",
    })
    .then((res) => getResponseData(res));
}

export function deleteLike(cardId) {
    return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: "DELETE",
    })
    .then((res) => getResponseData(res));
}

export function patchAvatar(link) {
    return fetch(`${config.baseURL}/users/me/avatar`, {
        headers: config.headers,
        method: "PATCH",
        body: JSON.stringify({
        avatar: link,
        }),
    })
    .then((res) => getResponseData(res));
}

export function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const baseUser = {
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: baseAvatar,
    _id: "-1",
};