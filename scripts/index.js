import { Card } from './card.js';
import { initialCards, settings } from './constants.js';
import { FormValidation } from './FormValidator.js';
import { Popup } from './popup.js';

// const editPopup = document.querySelector('.popup_edit-profile');
const profileTitle = document.querySelector('.profile__title');
const titleInput = document.querySelector('.popup__input_title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const subtitleInput = document.querySelector('.popup__input_subtitle');
// const editPopupTest = new Popup(document.querySelector('.popup_edit-profile'));
// const addPopupTest = new Popup(document.querySelector('.popup_add-card'));
const editPopup = new Popup('.popup_edit-profile');
const addPopup = new Popup('.popup_add-card');
editPopup.setEventListeners();
addPopup.setEventListeners();

const editForm = document.querySelector('.popup__form');
export const editFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form')
);
const addFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_add-card')
);

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;

  profileSubtitle.textContent = subtitleInput.value;

  // closePopup(editPopup);
});

// const editPopupAdd = document.querySelector('.popup_add-card');
const addForm = document.querySelector('.popup__form_add-card');
const templateList = document.querySelector('.elements__list');
const mestoInput = document.querySelector('.popup__input_mesto');
const imageInput = document.querySelector('.popup__input_image');

function createCard(name, link, template) {
  const card = new Card({ name, link }, template);
  return card.generateCard();
}

initialCards.forEach(item => {
  const cardElement = createCard(item.name, item.link, '#template-element');
  templateList.prepend(cardElement);
});

addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newCardData = {
    name: mestoInput.value,
    link: imageInput.value
  };

  const newCard = createCard(newCardData.name, newCardData.link, '#template-element');

  templateList.prepend(newCard);

  addForm.reset();

  closePopup(editPopupAdd);
});

addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  createCard();
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

editFormValidator.enableValidation();
addFormValidator.enableValidation();
