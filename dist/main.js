(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t)}function t(e){var t=document.querySelector(".popup_is-opened");"Escape"==e.key&&n(t)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)}function o(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}var r=document.querySelector("#card-template").content,c=document.querySelectorAll(".popup"),p=document.querySelector(".places__list"),u=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_new-card"),a=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_image"),s=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),m=document.querySelector(".popup__input_type_name"),y=document.querySelector(".popup__input_type_description");function v(e,t){var n=r.querySelector(".places__item").cloneNode(!0),c=n.querySelector(".card__like-button"),p=n.querySelector(".card__delete-button"),u=n.querySelector(".card__image");return u.src=e.link,u.alt=e.name,n.querySelector(".card__title").textContent=e.name,p.addEventListener("click",t),c.addEventListener("click",o),u.addEventListener("click",k),n}function f(e){e.target.closest(".places__item").remove()}function k(t){e(i);var n=document.querySelector(".popup__image"),o=document.querySelector(".popup__caption");n.src=t.target.src,o.textContent=t.target.alt}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",owner:{_id:"-1"}},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",owner:{_id:"-1"}},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",owner:{_id:"-1"}},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",owner:{_id:"-1"}},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",owner:{_id:"-1"}},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",owner:{_id:"-1"}}].forEach((function(e){var t=v(e,f);p.append(t)})),u.addEventListener("click",(function(){e(d)})),s.addEventListener("click",(function(){m.value=l.textContent,y.value=_.textContent,e(a)})),c.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){n(e)}))})),c.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&n(e)}))})),c.forEach((function(e){e.addEventListener("keydown",(function(t){"Escape"===t.key&&n(e)}))})),document.querySelector('[name="edit-profile"]').addEventListener("submit",(function(e){e.preventDefault();var t=m.value,o=y.value;l.textContent=t,_.textContent=o,n(a)}));var q=document.querySelector('[name="new-place"]'),S=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".places__list");q.addEventListener("submit",(function(e){e.preventDefault();var t=v({name:S.value,link:g.value},f);L.prepend(t),q.reset(),n(E)}))})();