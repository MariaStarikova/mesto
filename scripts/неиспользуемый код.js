const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button_edit');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const closePopupAddBtn = document.querySelector('.popup__close-button_add');

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

openPopupBtn.addEventListener('click', function () {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup);

  editFormValidator.toggleButtonState();
});

closePopupBtn.addEventListener('click', function () {
  closePopup(editPopup);
});

openPopupAddBtn.addEventListener('click', function () {
  openPopup(editPopupAdd);

  addFormValidator.toggleButtonState();
});

closePopupAddBtn.addEventListener('click', function () {
  closePopup(editPopupAdd);
});

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
