//ИМПОРТ
import {validationConfig} from './FormValidator.js'
import {initialCards} from './initialCards.js'
import {Card} from './Card.js'
import {openPopup,closePopup,closePopupByOvelayClick} from './utils.js'
import {FormValidator} from './FormValidator.js'

//ПЕРЕМЕННЫЕ
// попапы
const popupOverlay =  Array.from(document.querySelectorAll('.popup'));
const popupPlace = document.querySelector('.popup_place');
const popupProfile = document.querySelector('.popup_profile');
const closePopupButtons = document.querySelectorAll('.popup__close');

// формы
const popupPlaceForm = document.forms ['placeForm'];
const popupPlaceName = popupPlaceForm.querySelector('.place-form__input_type_name');
const popupPlaceLink = popupPlaceForm.querySelector('.place-form__input_type_link');

const popupProfileForm = document.forms ['profileForm'];
const popupProfileName = popupProfileForm.querySelector('.profile-form__input_type_name');
const popupProfileDescripton = popupProfileForm.querySelector('.profile-form__input_type_descripton');

// новое место
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
initialCards.forEach((cardData) => {
  const placeCard = new Card (cardData,'#placeCard');
  const placeCardElement = placeCard.createNewPlaceCard();
  placeCards.append(placeCardElement);  
});

//добавление event listeners на кнопку закрытия попапа
closePopupButtons.forEach ((button) => {
  const popup = button.closest('.popup');
  button.addEventListener ('click', () => closePopup (popup));
})

// start - добавление места
function showPopupPlace () {
  openPopup (popupPlace);
  const popupPlaceFormValid = new FormValidator (validationConfig, popupPlaceForm)
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
  const placeCard = new Card (card,'#placeCard');
  const placeCardElement = placeCard.createNewPlaceCard();
  placeCards.prepend(placeCardElement);
}
// end - добавление места

// start - редактирование профиля
function showPopupProfile () {
  popupProfileName.value = profileName.textContent;
  popupProfileDescripton.value = profileDescripton.textContent;
  openPopup (popupProfile);
  const popupProfileFormValid = new FormValidator (validationConfig, popupProfileForm)
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



//EVENT LISTENERS
profileEditButton.addEventListener ('click', showPopupProfile);
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener ('click',showPopupPlace);
popupPlaceForm.addEventListener('submit', handlePlaceFormSubmit);

popupOverlay.forEach((popup)=>{popup.addEventListener('click', closePopupByOvelayClick)});