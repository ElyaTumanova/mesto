let profileEditButton = document.querySelector ('.profile__edit-button');
let popup = document.querySelector ('.popup');
let popupForm = document.querySelector ('.profile-form');
let poupCloseButton = document.querySelector ('.popup__close');
let popupName = document.querySelector ('.profile-form__input_type_name');
let popupDescripton = document.querySelector ('.profile-form__input_type_descripton');
let profileName = document.querySelector ('.profile__name');
let profileDescripton = document.querySelector ('.profile__description');

function showPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescripton.value = profileDescripton.textContent;
}



function closePopup () {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescripton.textContent = popupDescripton.value;
  closePopup ();
}

poupCloseButton.addEventListener ('click', closePopup);
profileEditButton.addEventListener ('click', showPopup);
popupForm.addEventListener('submit', handleFormSubmit);