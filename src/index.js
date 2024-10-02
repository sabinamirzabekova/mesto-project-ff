import './index.css';
import { initialCards } from "../components/cards.js";
import { OpenModal, closePopup } from '../components/modal.js';
import { likeCard } from '../components/card.js';
import { createCard, deleteCard } from '../components/card.js';
// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const popups = document.querySelectorAll('.popup');
const cardContainer = document.querySelector('.places__list');
const buttonAdd = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// @todo: Функция создания карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const itemCard = createCard(item, deleteCard, likeCard, openModalImage);
    cardContainer.append(itemCard);
});

buttonAdd.addEventListener('click', () => {
    OpenModal(popupCard);
});

buttonEdit.addEventListener('click', () => {
    
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent; 

    OpenModal(popupTypeEdit) });

export function openModalImage(evt) { 
    OpenModal (popupTypeImage);
    const imagePopup = document.querySelector('.popup__image'); 
    const popupCaption = document.querySelector('.popup__caption'); 
    imagePopup.src = evt.target.src; 
    popupCaption.textContent = evt.target.alt; 
}
//закрывает через крестик
popups.forEach((popup) => {
    const popupClosed = popup.querySelector('.popup__close');
    popupClosed.addEventListener("click", () =>{
        closePopup(popup)
    });
});

//закрывает через оверлей
popups.forEach((popup) =>{
    popup.addEventListener('mousedown', (evt)=>{
        if (evt.target.classList.contains('popup')){
            closePopup(popup);
        }
    })
})

//закрывает по esc
popups.forEach((popup) =>{
    popup.addEventListener('keydown', function(evt){
        if (evt.key === 'Escape'){
            closePopup(popup);
        }
    })
})

const formElement = document.querySelector('[name="edit-profile"]');
function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

function clearForm(form) {
    form.reset();
}

const formNewPlace = document.querySelector('[name="new-place"]');
const placeInpit = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placesList = document.querySelector('.places__list');
function FormPlace(evt){
    evt.preventDefault();
    const placeValue = placeInpit.value;
    const imageValue = urlInput.value;
    const newCard = {
        name: placeValue,
        link: imageValue
    };
    const createNewCard = createCard(newCard, deleteCard, likeCard, openModalImage);
    placesList.prepend(createNewCard);
    clearForm(formNewPlace);
    closePopup(popupTypeNewCard);
}

const popupOpen = document.querySelectorAll('.popup_is-opened')
function popupSmoothly(evt){
    evt.style.transition = 'opacity 2.5s, linear';
    evt.style.opacity = '0';
}

popupOpen.forEach(popup => {
    popup.style.opacity = '0'; // начальное состояние
    popupSmoothly(popup); 
});

formNewPlace.addEventListener('submit', FormPlace);