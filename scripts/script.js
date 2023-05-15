//ИМПОРТ
import {validationConfig} from './FormValidator.js'
import {initialCards} from './initialCards.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

//ПЕРЕМЕННЫЕ
// попапы
const popupOverlay =  Array.from(document.querySelectorAll('.popup'));
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const closePopupButtons = document.querySelectorAll('.popup__close');

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoDesc = popupPhoto.querySelector('.photo-popup__description');
const popupPhotoPhoto = popupPhoto.querySelector('.photo-popup__photo');

// формы
const popupPlaceForm = document.forms ['placeForm'];
const popupPlaceName = popupPlaceForm.querySelector('.place-form__input_type_name');
const popupPlaceLink = popupPlaceForm.querySelector('.place-form__input_type_link');

const popupProfileForm = document.forms ['profileForm'];
const popupProfileName = popupProfileForm.querySelector('.profile-form__input_type_name');
const popupProfileDescripton = popupProfileForm.querySelector('.profile-form__input_type_descripton');

// место
const newPlaceButton = document.querySelector('.profile__add-button');
const placeCards = document.querySelector('.places');

// профиль
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescripton = document.querySelector('.profile__description');

// ФУНКЦИИ 

//валидация
const popupPlaceFormValid = new FormValidator (validationConfig, popupPlaceForm)
popupPlaceFormValid.enableValidation();

const popupProfileFormValid = new FormValidator (validationConfig, popupProfileForm)
popupProfileFormValid.enableValidation();

//создание карточки
function createCard (cardData) {
  const placeCard = new Card (cardData,'#placeCard',showPhotoPopup);
  const placeCardElement = placeCard.createNewPlaceCard();
  return placeCardElement;
}

// вывод карточек по умолчанию
initialCards.forEach((cardData) => {
  addNewPlaceCard(cardData);
});

//добавление event listeners на кнопку закрытия попапа
closePopupButtons.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener ('click', () => closePopup (popup));
})

// start - добавление места
function showPopupPlace () {
  openPopup (popupPlace);
  popupPlaceFormValid.checkValidation();
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value
  }
  addNewPlaceCard (card);
  evt.target.reset();
  closePopup (evt.target.closest('.popup'));
}

function addNewPlaceCard (card) {
  const placeCardElement = createCard (card);
  placeCards.prepend(placeCardElement);
}
// end - добавление места

// start - редактирование профиля
function showPopupProfile () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescripton.value = profileDescripton.textContent;
  openPopup (popupProfile);
  popupProfileFormValid.removeValidationErrors();
  popupProfileFormValid.checkValidation();
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescripton.textContent = popupProfileDescripton.value;
  closePopup (evt.target.closest('.popup'));
}
// end - редактирование профиля

// попапы
function openPopup (popup) {
  popup.classList.add ('popup_opened');
  document.addEventListener('keydown',pressEsc);
}

function closePopup (popup) {
  popup.classList.remove ('popup_opened');
  document.removeEventListener('keydown',pressEsc);
}

function pressEsc (evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }     
}

function closePopupByOvelayClick (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
}

//вывод попапа фото
function showPhotoPopup (name, link) {
  popupPhotoDesc.textContent = name;
  popupPhotoPhoto.src = link;
  popupPhotoPhoto.alt = name;
  openPopup (popupPhoto);
}

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener ('click',showPopupPlace);
popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

popupOverlay.forEach((popup)=>{popup.addEventListener('click', closePopupByOvelayClick)});