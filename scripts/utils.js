export {openPopup,closePopup,closePopupByOvelayClick}

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