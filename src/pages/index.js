//ИМПОРТ
import {initialCards} from '../utils/initialCards.js'
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'

import '../pages/index.css'

//ПЕРЕМЕННЫЕ
//валидация
const validationConfig = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  errorClass: 'form__input_disabled'
}

// попапы
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');

// формы
const popupPlaceForm = document.forms ['placeForm'];
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

//создание попапа фото
const popupPhotoAdd = new PopupWithImage (popupPhoto);
popupPhotoAdd.setEventListeners ();

// вывод карточек по умолчанию
const newPlaceCard = new Section (createCard,placeCards);
newPlaceCard.renderItem(initialCards);

//создание карточки
function createCard (cardData) {
  const placeCard = new Card (cardData,'#placeCard', popupPhotoAdd.openPopup.bind(popupPhotoAdd));
  const placeCardElement = placeCard.createNewPlaceCard();
  return placeCardElement;
}

// start - добавление места
const popupPlaceAdd = new PopupWithForm (popupPlace,handlePlaceFormSubmit);
popupPlaceAdd.setEventListeners();

function showPopupPlace () {
  popupPlaceAdd.openPopup();
  popupPlaceFormValid.checkValidation();
}

function handlePlaceFormSubmit (card) {
  newPlaceCard.renderItem([card]);
  popupPlaceAdd.closePopup();
}

// start - редактирование профиля
const popupProfileAdd = new PopupWithForm (popupProfile, handleProfileFormSubmit);
popupProfileAdd.setEventListeners ();
const userInfo = new UserInfo (profileName, profileDescripton);

function showPopupProfile () {
  popupProfileAdd.openPopup();
  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.profileName;
  popupProfileDescripton.value = userInfoData.profileDescripton;
  popupProfileFormValid.removeValidationErrors();
  popupProfileFormValid.checkValidation();
}

function handleProfileFormSubmit (data) {
  userInfo.setUserInfo(data);
  popupProfileAdd.closePopup();
}
// end - редактирование профиля

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
newPlaceButton.addEventListener ('click',showPopupPlace);