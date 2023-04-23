//ИМПОРТ
import {validationConfig,checkValidation, removeValidationErrors} from './validate.js'
import {initialCards} from './initialCards.js'

//ПЕРЕМЕННЫЕ
// попапы
const popupOverlay =  Array.from(document.querySelectorAll('.popup'));
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const inputsPopupProfile = Array.from(popupProfile.querySelectorAll ('.form__input'));
const formPopupProfile = popupProfile.querySelector ('.form');
const popupPhoto = document.querySelector('.popup_photo');
const closePopupButtons = document.querySelectorAll('.popup__close');
const popupPhotoDesc = popupPhoto.querySelector('.photo-popup__description');
const popupPhotoPhoto = popupPhoto.querySelector('.photo-popup__photo');

// формы
const popupPlaceForm = document.forms ['placeForm'];
const popupPlaceName = popupPlaceForm.querySelector('.place-form__input_type_name');
const popupPlaceLink = popupPlaceForm.querySelector('.place-form__input_type_link');

const popupProfileForm = document.forms ['profileForm'];
const popupProfileName = popupProfileForm.querySelector('.profile-form__input_type_name');
const popupProfileDescripton = popupProfileForm.querySelector('.profile-form__input_type_descripton');

// новое место
const newPlaceButton = document.querySelector('.profile__add-button');
const placeCardTemplate = document.querySelector('#placeCard').content;
const placeCards = document.querySelector('.places');

// профиль
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescripton = document.querySelector('.profile__description');

// ФУНКЦИИ 
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

// start - добавление event listeners на кнопку закрытия попапа
closePopupButtons.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener ('click', () => closePopup (popup));
})
// end - добавление event listeners на кнопку закрытия попапа

// создание карточки места
function createNewPlaceCard (link, name) {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  const placeCardElementPhoto = placeCardElement.querySelector('.place__photo');
  const placeCardElementName = placeCardElement.querySelector('.place__name');
  placeCardElementPhoto.src = link;
  placeCardElementName.textContent = name;
  placeCardElementPhoto.alt = name;
  addEventListenerForCard (placeCardElement.querySelector('.place'));
  return placeCardElement;
}

// start - добавление event listeners на карточку места
function addEventListenerForCard (placeSelector) {
  const elementDeleteCard = placeSelector.querySelector ('.place__delete-btn')
  const like = placeSelector.querySelector ('.place__like')
  const photo = placeSelector.querySelector ('.place__photo-wrap')
  elementDeleteCard.addEventListener ('click', function (event) {
    placeSelector.remove()
    event.preventDefault();
  })
  like.addEventListener ('click',function (event) {
    like.classList.toggle('place__like_active')
    event.preventDefault();
  }) 
  photo.addEventListener ('click',showPhotoPopup);  
}
// end - добавление event listeners на карточку места

// start - вывод карточек по умолчанию
initialCards.forEach((cardData) => {
  const placeCardElement = createNewPlaceCard(cardData.link, cardData.name);
  placeCards.append(placeCardElement);  
});
// end - вывод карточек по умолчанию

// start - добавление места
function showPopupPlace () {
  openPopup (popupPlace);
  checkValidation (popupPlace, validationConfig);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  addNewPlaceCard (popupPlaceLink.value, popupPlaceName.value);
  evt.target.reset();
  closePopup (evt.target.closest('.popup'));
}

function addNewPlaceCard (link, name) {
  const placeCardElement = createNewPlaceCard (link, name);
  placeCards.prepend(placeCardElement);
}
// end - добавление места

// start - редактирование профиля
function showPopupProfile () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescripton.value = profileDescripton.textContent;
  openPopup (popupProfile);
  removeValidationErrors (inputsPopupProfile,formPopupProfile);
  checkValidation (formPopupProfile,validationConfig);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescripton.textContent = popupProfileDescripton.value;
  closePopup (evt.target.closest('.popup'));
}
// end - редактирование профиля

//start - вывод попапа фото
function showPhotoPopup (evt) {
  const placeOpened = evt.target.closest('.place')
  const placeName = placeOpened.querySelector('.place__name').textContent;
  const placePhotoLink = placeOpened.querySelector('.place__photo').src;
  popupPhotoDesc.textContent = placeName;
  popupPhotoPhoto.src = placePhotoLink;
  popupPhotoPhoto.alt = placeName;
  openPopup (popupPhoto);
}
//end - вывод попапа фото

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener ('click',showPopupPlace);
popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

popupOverlay.forEach((popup)=>{popup.addEventListener('click', closePopupByOvelayClick)});