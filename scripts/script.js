// start - добавление места
const newPlaceButton = document.querySelector ('.profile__add-button');

const popupPlace = document.querySelector ('.popup_place');
const poupCloseButtonPlace = popupPlace.querySelector ('.popup__close');
const popupPlaceForm = popupPlace.querySelector ('.place-form');
const popupPlaceName = popupPlace.querySelector ('.place-form__input_type_name');
const popupPlaceLink = popupPlace.querySelector ('.place-form__input_type_link');

const placeCardTemplate = document.querySelector ('#placeCard').content;
const placeCards = document.querySelector ('.places');

function showPopupPlace () {
  popupPlace.classList.add('popup_opened');
}

function addNewPlaceCard () {
  const placeCardElement = placeCardTemplate.cloneNode(true);
  placeCardElement.querySelector('.place__photo').src = popupPlaceLink.value;
  placeCardElement.querySelector('.place__name').textContent = popupPlaceName.value;
  addEventListenerForCard (placeCardElement.querySelector('.place'));
  placeCards.prepend(placeCardElement);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  addNewPlaceCard ();
  closePopup ();
}
// end - добавление места

// start - добавление event listeners на карточку места
function addEventListenerForCard (placeSelector) {
  const del = placeSelector.querySelector ('.place__delete-btn')
  const like = placeSelector.querySelector ('.place__like')
  const photo = placeSelector.querySelector ('.place__photo-wrap')
  del.addEventListener ('click', function (event) {
    placeSelector.remove()
    event.preventDefault();
  })
  like.addEventListener ('click',function (event) {
    placeSelector.querySelector('.place__like').classList.toggle('place__like_active')
    event.preventDefault();
  }) 
  photo.addEventListener ('click',showPhotoPopup);  
}
// end - добавление event listeners на карточку места

// start - редактирование профиля
const profileEditButton = document.querySelector ('.profile__edit-button');

const popupProfile = document.querySelector ('.popup_profile');
const popupProfileForm = popupProfile.querySelector ('.profile-form');
const poupProfileCloseButton = popupProfile.querySelector ('.popup__close');
const popupProfileName = popupProfile.querySelector ('.profile-form__input_type_name');
const popupProfileDescripton = popupProfile.querySelector ('.profile-form__input_type_descripton');

const profileName = document.querySelector ('.profile__name');
const profileDescripton = document.querySelector ('.profile__description');

function showPopupProfile () {
  popupProfile.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileDescripton.value = profileDescripton.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDescripton.textContent = popupProfileDescripton.value;
  closePopup ();
}
// end - редактирование профиля

// start - вывод карточек по умолчанию
import {initialCards} from './initialCards.js'
initialCards.forEach((i) => {
  const num = initialCards.indexOf(i);
  const placeCardElement = placeCardTemplate.cloneNode(true);
  placeCardElement.querySelector('.place__photo').src = initialCards[num].link;
  placeCardElement.querySelector('.place__name').textContent = initialCards[num].name;
  addEventListenerForCard (placeCardElement.querySelector('.place'));
  placeCards.append(placeCardElement);  
});
// end - вывод карточек по умолчанию

//start - вывод попапа фото
const photoPopupTemplate = document.querySelector ('#photoPopup').content;
const page = document.querySelector ('.page');

function showPhotoPopup () {
  const placeName = this.parentElement.querySelector('.place__name').textContent;
  const placePhotoLink = this.parentElement.querySelector('.place__photo').src;

  const photoPoupElement = photoPopupTemplate.cloneNode(true);
  let photoPopup = photoPoupElement.querySelector('.popup')
  photoPopup.querySelector('.photo-popup__description').textContent = placeName;
  photoPopup.querySelector('.photo-popup__photo').src = placePhotoLink;

  page.prepend(photoPopup);

  photoPopup.classList.add('popup_opened');
  photoPopup.querySelector('.popup__close').addEventListener('click', closePhotoPopup);
}
//end - вывод попапа фото

// start - закрытие попапов
function closePopup () {
  popupProfile.classList.remove('popup_opened');
  popupPlace.classList.remove('popup_opened');
}

function closePhotoPopup (i) {
  let photoPopupSelector = this.closest('.popup')
  photoPopupSelector.remove(); 
}
// end - закрытие попапов

//event listeners
poupProfileCloseButton.addEventListener ('click', closePopup);
profileEditButton.addEventListener ('click', showPopupProfile);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener ('click',showPopupPlace);
poupCloseButtonPlace.addEventListener ('click', closePopup);
popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);