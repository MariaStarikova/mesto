import { Card } from './card.js';
import { initialCards } from './cards.js';
import { FormValidation } from './FormValidator.js';

const openPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit-profile');
const closePopupBtn = document.querySelector('.popup__close-button_edit');
const profileTitle = document.querySelector('.profile__title');
const titleInput = document.querySelector('.popup__input_title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_underline',
  errorClass: 'popup__input-error_active'
};

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const editForm = document.querySelector('.popup__form');
const editFormValidator = new FormValidation(settings, document.querySelector('.popup__form'));
const addFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_add-card')
);

openPopupBtn.addEventListener('click', function () {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  openPopup(editPopup);

  editFormValidator.checkFormState();
});

closePopupBtn.addEventListener('click', function () {
  closePopup(editPopup);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;

  profileSubtitle.textContent = subtitleInput.value;

  closePopup(editPopup);
});

const openPopupAddBtn = document.querySelector('.profile__add-button');
const editPopupAdd = document.querySelector('.popup_add-card');
const closePopupAddBtn = document.querySelector('.popup__close-button_add');
const addForm = document.querySelector('.popup__form_add-card');

openPopupAddBtn.addEventListener('click', function () {
  openPopup(editPopupAdd);

  addFormValidator.checkFormState();
});

closePopupAddBtn.addEventListener('click', function () {
  closePopup(editPopupAdd);
});

const templateList = document.querySelector('.elements__list');
const mestoInput = document.querySelector('.popup__input_mesto');
const imageInput = document.querySelector('.popup__input_image');

initialCards.forEach(item => {
  const card = new Card(item, '#template-element');
  const cardElement = card.generateCard();
  templateList.prepend(cardElement);
});

addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newCardData = {
    name: mestoInput.value,
    link: imageInput.value
  };

  const card = new Card(newCardData, '#template-element');
  const newCard = card.generateCard();

  templateList.prepend(newCard);

  addForm.reset();

  closePopup(editPopupAdd);
});

const popupView = document.querySelector('.popup_image');
const popupImage = popupView.querySelector('.popup__image');
const popupTitle = popupView.querySelector('.popup__title-image');

export function openPopupView(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupTitle.textContent = data.name;

  openPopup(popupView);
}

const popupViewCloseBtn = document.querySelector('.popup__close-button_view');

popupViewCloseBtn.addEventListener('click', function () {
  closePopup(popupView);
});

const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

editFormValidator.enableValidation();
addFormValidator.enableValidation();
