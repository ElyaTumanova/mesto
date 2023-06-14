//ИМПОРТ
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithDelete} from '../components/PopupWithDelete.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'

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
const popupDelete = document.querySelector('.popup_delete-confirm');
const popupAvatarEdit = document.querySelector('.popup_update-avatar');

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

//аватар
const popupAvatarForm = document.forms ['avatarForm'];
const profileAvatar = document.querySelector('.profile__avatar-wrap');
const profileAvatarLink =  document.querySelector('.profile__avatar');
const profileAvatarEditButton = document.querySelector('.profile__avatar-edit');

// ФУНКЦИИ 

//валидация
const popupPlaceFormValid = new FormValidator (validationConfig, popupPlaceForm)
popupPlaceFormValid.enableValidation();

const popupProfileFormValid = new FormValidator (validationConfig, popupProfileForm)
popupProfileFormValid.enableValidation();

const popupAvatarFormValid = new FormValidator (validationConfig, popupAvatarForm);
popupAvatarFormValid.enableValidation ();

//API, Promise
const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '0573a051-c261-46c2-9f99-9d24a33a3c63'
  }
})
const cardsPromise = api.getCards ();
const userInfoPromise = api.getUserInfo ();

///карточки мест
//создание попапа фото
const popupPhotoAdd = new PopupWithImage (popupPhoto);
popupPhotoAdd.setEventListeners ();

// вывод карточек по умолчанию
const newPlaceCard = new Section (createCard,placeCards);

Promise.all ([cardsPromise,userInfoPromise])
.then(function (values) {
  const cards = values[0];
  const user = values[1];
  newPlaceCard.renderItem(cards,user)
})
.catch((err)=>console.log (`catch:${err}`));

//создание карточки
function createCard (cardData, userInfo) {
  const placeCard = new Card (
    cardData,
    '#placeCard', 
    popupPhotoAdd.openPopup.bind(popupPhotoAdd),
    handleCardLike,
    userInfo,
    handleDeleteCard);
  const placeCardElement = placeCard.createNewPlaceCard();
  return placeCardElement;
}

// лайк карточки
function handleCardLike (cardId,isLiked) {
  if (!isLiked) {
    api.likeCard (cardId).then (res => this.updateLikes(res.likes))
    .catch((err)=>console.log (`catch:${err}`));
  } else {
    api.deleteLikeCard (cardId).then (res => this.updateLikes(res.likes))
    .catch((err)=>console.log (`catch:${err}`));
  }
}

// start - добавление места
const popupPlaceAdd = new PopupWithForm (popupPlace,handlePlaceFormSubmit);
popupPlaceAdd.setEventListeners();

function showPopupPlace () {
  popupPlaceAdd.openPopup();
  popupPlaceFormValid.checkValidation();
}

function handlePlaceFormSubmit (card) {
  const imageData = {
    name: card.placeName,
    link: card.placeImageLink
  }
  const addCardsPromise = api.addCard(imageData);
  const userInfoPromise = api.getUserInfo ();
  popupPlaceAdd.renderLoading (true);
  Promise.all ([addCardsPromise,userInfoPromise])
  .then(function (values) {
    const cards = values[0];
    const user = values [1];
    newPlaceCard.renderItem([cards],user)
  })
  .catch((err)=>console.log (`catch:${err}`))
  .finally(() => {popupPlaceAdd.renderLoading(false)})
  popupPlaceAdd.closePopup();
}

//удаление карточки
const popupDeleteAdd = new PopupWithDelete (popupDelete);
popupDeleteAdd.setEventListeners ();

function handleDeleteCard (card) {
  popupDeleteAdd.openPopup();
  popupDeleteAdd.setSubmitAction (() => {
    api.deleteCard (card._cardId);
    this._placeCard.remove();
    this._placeCard = null;
  })
} 

///профиль и аватар
// start - редактирование профиля
const popupProfileAdd = new PopupWithForm (popupProfile, handleProfileFormSubmit);
popupProfileAdd.setEventListeners ();
const userInfo = new UserInfo (profileName, profileDescripton, profileAvatarLink);

userInfoPromise
.then ( (info) => {
        const userData =  {
          profileName:info.name,
          profileDesccription:info.about,
          profileAvatar:info.avatar
        };
        userInfo.setUserInfo(userData);
        })
.catch((err)=>console.log (`catch:${err}`));

function showPopupProfile () {
  popupProfileAdd.openPopup();
  const userInfoData = userInfo.getUserInfo();
  popupProfileName.value = userInfoData.profileName;
  popupProfileDescripton.value = userInfoData.profileDescripton;
  popupProfileFormValid.removeValidationErrors();
  popupProfileFormValid.checkValidation();
}

function handleProfileFormSubmit (data) {
  userInfo.updateUserInfo(data);
  popupProfileAdd.renderLoading(true);
  api.upadateUserInfo (data)
  .finally(()=>{popupProfileAdd.renderLoading(false)});
  popupProfileAdd.closePopup();
}
// end - редактирование профиля

// start - редактирование аватара
const popupAvatarEditAdd = new PopupWithForm (popupAvatarEdit, handleAvatarEdit);
popupAvatarEditAdd.setEventListeners ();

function showPopupAvatar () {
  popupAvatarEditAdd.openPopup();
  popupPlaceFormValid.checkValidation();
}

function handleAvatarEdit (linkObj) {
  popupAvatarEditAdd.renderLoading (true);
  api.changeAvatar (linkObj.avatarImageLink)
  .finally(() => {popupAvatarEditAdd.renderLoading(false)});
  userInfo.updateUserAvatar (linkObj.avatarImageLink);
  popupAvatarEditAdd.closePopup();
}
// end - редактирование аватара

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
newPlaceButton.addEventListener ('click',showPopupPlace);

profileAvatar.addEventListener ('mouseover',() => {
  profileAvatarEditButton.classList.add('profile__avatar-edit_active')
});
profileAvatar.addEventListener ('mouseout',() => {
  profileAvatarEditButton.classList.remove('profile__avatar-edit_active')
});

profileAvatarEditButton.addEventListener ('click', showPopupAvatar);