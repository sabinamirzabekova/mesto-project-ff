import './index.css';
import { initialCards } from "./components/cards.js";
import { openModal, closePopup } from './components/modal.js';
import { likeCard } from './components/card.js';
import { createCard, deleteCard } from './components/card.js';
import { enableValidation, clearValidation} from './components/validation.js';
import { getAboutUser,
    getInitialCards,
    patchProfile,
    postNewCard,
    patchAvatar,
    baseUser,} from './components/api.js'; 

const imagePopup = document.querySelector('.popup__image'); 
const popupCaption = document.querySelector('.popup__caption'); 
const popupTypeImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const cardContainer = document.querySelector('.places__list');

const popupCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const popupOpen = document.querySelectorAll('.popup_is-opened');
const formNewPlace = document.querySelector('[name="new-place"]');
const placeInpit = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const descriptionInput = formEditProfile.elements.description;

const popupButton = formEditProfile.querySelector('.popup__button')
const newForm = document.forms["new-place"];
const placeNameInput = newForm.elements["place-name"];
const imageSrcInput = newForm.elements.link;
const newCardSubmitBtn = popupCard.querySelector(".popup__button");
const newSubmitButton = newForm.querySelector('.popup__button');

const validationConfig = {
    formSelector : '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// @todo: Функция создания карточки
function openModalImage(evt) { 
    openModal (popupTypeImage);
    imagePopup.src = evt.target.src; 
    popupCaption.textContent = evt.target.alt; 
    imagePopup.textContent = evt.target.alt;
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const itemCard = createCard(item, deleteCard, likeCard, openModalImage);
    cardContainer.append(itemCard);
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', (evt) =>{
    evt.preventDefault();

    popupButton.textContent = "Сохранение...";

    patchProfile(nameInput.value, descriptionInput.value)
    .then((res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
        popupButton.textContent = "Сохранить";
    });
}); 

function clearForm(form) {
    form.reset();
}

function handlePlacesFormSubmit(evt){
    evt.preventDefault();
    const placeValue = placeInpit.value;
    const imageValue = urlInput.value;
    const newCard = {
        name: placeValue,
        link: imageValue
    };
    const createNewCard = createCard(newCard, deleteCard, likeCard, openModalImage);
    cardContainer.prepend(createNewCard);
    clearForm(formNewPlace);
    closePopup(popupTypeNewCard);
}

function popupSmoothly(evt){
    evt.style.transition = 'opacity 2.5s, linear';
    evt.style.opacity = '0';
}

buttonAdd.addEventListener('click', () => {
    openModal(popupCard);
    clearValidation(popupCard, validationConfig);
});

newForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    popupButton.textContent = "Сохранение...";
    postNewCard(placeNameInput.value, imageSrcInput.value)
        .then((res) => {
            cardContainer.prepend(
            createCard(res, deleteCard, likeCard, openModalImage, res.owner)
        );
        newForm.reset();
        closePopup(popupCard);
        })
        .catch((err) => console.log(err))
        .finally(() => {
        newCardSubmitBtn.textContent = "Сохранить";
    });
});

buttonEdit.addEventListener('click', () => {
    
    nameInput.value = profileName.textContent; 
    jobInput.value = profileDescription.textContent; 
    clearValidation(popupTypeEdit, validationConfig);
    openModal(popupTypeEdit) });

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

popupOpen.forEach(popup => {
    popup.style.opacity = '0'; // начальное состояние
    popupSmoothly(popup); 
});

formNewPlace.addEventListener('submit', handlePlacesFormSubmit);

Promise.all([getAboutUser(), getInitialCards()])
    .then(([user, cards]) =>{
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        imagePopup.style.backgroundImage = `url("${user.avatar}")`;
        cards.forEach((card) =>{
            cardContainer.append(createCard(card, deleteCard, likeCard, imagePopup, user));
        });
    })
    .catch((err) => {
        console.error("Ошибка получения данных пользователя и карточек:", err);
    
        profileName.textContent = baseUser.name;
        profileDescription.textContent = baseUser.about;
        imagePopup.style.backgroundImage = `url("${baseUser.avatar}")`;
    
        initialCards.forEach((card) => {
            cardContainer.append(
            createCard(card, deleteCard, likeCard, imagePopup, baseUser)
        );
        });
    });