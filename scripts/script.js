//ПЕРЕМЕННЫЕ
/// попапы
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');
const closePopupButtons = document.querySelectorAll('.popup__close');
const popupPhotoDesc = popupPhoto.querySelector('.photo-popup__description');
const popupPhotoPhoto = popupPhoto.querySelector('.photo-popup__photo');

// формы
const popupPlaceForm = document.forms ['placeForm'];
const popupPlaceName = popupPlaceForm.querySelector('.place-form__input_type_name');
const popupPlaceLink = popupPlaceForm.querySelector('.place-form__input_type_link');

const popupProfileForm = document.forms ["profileForm"];
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
}

function closePopup (popup) {
  popup.classList.remove ('popup_opened');
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
  placeCardElement.querySelector('.place__photo').src = link;
  placeCardElement.querySelector('.place__name').textContent = name;
  placeCardElement.querySelector('.place__photo').alt = name;
  addEventListenerForCard (placeCardElement.querySelector('.place'));
  return placeCardElement;
}

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

// start - вывод карточек по умолчанию
import {initialCards} from './initialCards.js'
initialCards.forEach((i) => {
  const placeCardElement = createNewPlaceCard(i.link, i.name);
  placeCards.append(placeCardElement);  
});
// end - вывод карточек по умолчанию

// start - добавление места
function showPopupPlace () {
  openPopup (popupPlace);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault();
  addNewPlaceCard (popupPlaceLink.value, popupPlaceName.value);
  closePopup (evt.target.closest('.popup'));
}

function addNewPlaceCard (link, name) {
  const placeCardElement = createNewPlaceCard (link, name);
  placeCards.prepend(placeCardElement);
}
// end - добавление места

// start - редактирование профиля
function showPopupProfile () {
  openPopup (popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileDescripton.value = profileDescripton.textContent;
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
  openPopup (popupPhoto);
}
//end - вывод попапа фото

//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener ('click',showPopupPlace);
popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);