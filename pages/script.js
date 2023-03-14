let profileEditButton = document.querySelector ('.profile__edit-button');
let popup = document.querySelector ('.popup');
let popupForm = document.querySelector ('.popup__container');
let poupCloseButton = document.querySelector ('.popup__close');
let popupName = document.querySelector ('.popup__name');
let popupDescripton = document.querySelector ('.popup__descripton');
let profileName = document.querySelector ('.profile__name');
let profileDescripton = document.querySelector ('.profile__description');


profileEditButton.addEventListener ('click', showPopup);

function showPopup () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescripton.value = profileDescripton.textContent;
}

poupCloseButton.addEventListener ('click', closePopup);

function closePopup () {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  let a = popupName.value;
  let b = popupDescripton.value;
  profileName.textContent = a;
  profileDescripton.textContent = b;
  popup.classList.remove('popup_opened')
}

popupForm.addEventListener('submit', handleFormSubmit);