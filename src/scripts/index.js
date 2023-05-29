//ИМПОРТ
import {validationConfig} from './FormValidator.js'
import {initialCards} from './initialCards.js'
import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'
import {UserInfo} from './UserInfo.js'

import '../pages/index.css'

//ПЕРЕМЕННЫЕ
// попапы
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');

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

// вывод карточек по умолчанию
const initialCardsAdd = new Section ({
  items:initialCards,
  renderer:createCard,
},
placeCards);
initialCardsAdd.renderItem();

//создание карточки
function createCard (cardData) {
  const placeCard = new Card (cardData,'#placeCard',showPhotoPopup);
  const placeCardElement = placeCard.createNewPlaceCard();
  return placeCardElement;
}

// start - добавление места
const popupPlaceAdd = new PopupWithForm (popupPlace,handlePlaceFormSubmit);

function showPopupPlace () {
  popupPlaceAdd.openPopup();
  popupPlaceFormValid.checkValidation();
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  const card = [{
    name: popupPlaceName.value,
    link: popupPlaceLink.value
  }]
  const newPlaceCard = new Section (
    {items: card,
    renderer: createCard},
    placeCards);
  newPlaceCard.renderItem();
  popupPlaceAdd.closePopup();
}

// start - редактирование профиля
const popupProfileAdd = new PopupWithForm (popupProfile, handleProfileFormSubmit);
const userInfo = new UserInfo (profileName,profileDescripton);

function showPopupProfile () {
  popupProfileAdd.openPopup();
  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.profileName;
  popupProfileDescripton.value = userInfoData.profileDescripton;
  popupProfileFormValid.removeValidationErrors();
  popupProfileFormValid.checkValidation();
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
  popupProfileAdd.closePopup();
}
// end - редактирование профиля

//вывод попапа фото
function showPhotoPopup (name, link) {
  const popupPhotoAdd = new PopupWithImage (name, link, popupPhoto);
  popupPhotoAdd.openPopup ();
}

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
newPlaceButton.addEventListener ('click',showPopupPlace);