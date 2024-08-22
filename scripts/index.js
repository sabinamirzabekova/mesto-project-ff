// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list')
// @todo: Функция создания карточки
function addSong(place, deleteCard){
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = place.link;
    cardElement.querySelector('.card__image').alt = place.name;
    cardElement.querySelector('.card__title').textContent = place.name;
    
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}
// @todo: Функция уда
function deleteCard(item){
    item.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const itemCard = addSong(item, deleteCard);
    cardContainer.append(itemCard);
});