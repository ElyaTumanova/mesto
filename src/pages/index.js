//ИМПОРТ

import {
  validationConfig, 
  popupPlace, popupProfile, popupPhoto, popupDelete, popupAvatarEdit,
  popupPlaceForm, popupProfileForm,popupProfileName, popupProfileDescripton,
  newPlaceButton, placeCards,
  profileEditButton,profileName, profileDescripton,
  popupAvatarForm, profileAvatar, profileAvatarLink, profileAvatarEditButton
}
  from '../utils/constants.js'

import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithDelete} from '../components/PopupWithDelete.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'

import '../pages/index.css'


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
    newPlaceCard.renderItem([cards],user);
    popupPlaceAdd.closePopup();
  })
  .catch((err)=>console.log (`catch:${err}`))
  .finally(() => {popupPlaceAdd.renderLoading(false)})
}

//удаление карточки
const popupDeleteAdd = new PopupWithDelete (popupDelete);
popupDeleteAdd.setEventListeners ();

function handleDeleteCard (card) {
  popupDeleteAdd.openPopup();
  popupDeleteAdd.setSubmitAction (() => {
    api.deleteCard (card._cardId)
    .then (() => {
      this._placeCard.remove();
      this._placeCard = null;
      popupDeleteAdd.closePopup();
    })
    .catch((err)=>console.log (`catch:${err}`));
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
  popupProfileAdd.renderLoading(true);
  api.upadateUserInfo (data)
  .then (()=> {
    popupProfileAdd.closePopup();
    userInfo.updateUserInfo(data);
  })
  .catch((err)=>console.log (`catch:${err}`))
  .finally(()=>{popupProfileAdd.renderLoading(false)});
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
  .then (()=> {
    popupAvatarEditAdd.closePopup();
    userInfo.updateUserAvatar (linkObj.avatarImageLink);
  })
  .catch((err)=>console.log (`catch:${err}`))
  .finally(() => {popupAvatarEditAdd.renderLoading(false)});
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