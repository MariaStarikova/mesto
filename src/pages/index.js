import '../pages/index.css';
import { Card } from '../components/card.js';
import { initialCards, settings } from '../components/constants.js';
import { FormValidation } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const titleInput = document.querySelector('.popup__input_title');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const templateList = document.querySelector('.elements__list');
const mestoInput = document.querySelector('.popup__input_mesto');
const imageInput = document.querySelector('.popup__input_image');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const openAddPopupBtn = document.querySelector('.profile__add-button');
const viewPopup = new Popup('.popup_image');
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
});

openEditPopupBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  titleInput.value = userData.name;
  subtitleInput.value = userData.info;
  editPopup.open();

  editFormValidator.toggleButtonState();
});

openAddPopupBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidator.toggleButtonState();
});

const editPopup = new PopupWithForm('.popup_edit-profile', formData => {
  userInfo.setUserInfo({ name: formData['input-title'], info: formData['input-description'] });
});

const addPopup = new PopupWithForm('.popup_add-card', () => {
  const newCardData = {
    name: mestoInput.value,
    link: imageInput.value
  };

  const newCard = createCard(newCardData.name, newCardData.link, '#template-element');
  templateList.prepend(newCard);
});

editPopup.setEventListeners();
addPopup.setEventListeners();
viewPopup.setEventListeners();

const editForm = document.querySelector('.popup__form');
export const editFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form')
);
const addFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_add-card')
);

function handleCardClick(data) {
  const popupWithImage = new PopupWithImage('.popup_image');
  popupWithImage.open(data);
}

function createCard(name, link, template, handleCardClick) {
  const card = new Card({ name, link }, template, handleCardClick);
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: item => {
      const cardElement = createCard(item.name, item.link, '#template-element', handleCardClick);
      cardsSection.addItem(cardElement);
    }
  },
  '.elements__list'
);

cardsSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
