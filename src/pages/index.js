import '../pages/index.css';
import { Card } from '../components/Card.js';
import { initialCards, settings } from '../utils/constants';
import { FormValidation } from '../components/FormValidator.js';
import { Popup } from '../components/Popup.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.svg';

const headerLogo = document.querySelector('.header__logo');
const profileAvatar = document.querySelector('.profile__avatar');

headerLogo.setAttribute('src', logo);
profileAvatar.setAttribute('src', avatar);

const titleInput = document.querySelector('.popup__input_title');
const subtitleInput = document.querySelector('.popup__input_subtitle');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const openAddPopupBtn = document.querySelector('.profile__add-button');
const popupWithImage = new PopupWithImage('.popup_image');
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

const addPopup = new PopupWithForm('.popup_add-card', formData => {
  const newCardData = {
    name: formData['input-name'],
    link: formData['input-link']
  };

  const newCard = createCard(newCardData.name, newCardData.link, '#template-element');
  cardsSection.addItem(newCard);
});

editPopup.setEventListeners();
addPopup.setEventListeners();
popupWithImage.setEventListeners();

const editForm = document.querySelector('.popup__form');
export const editFormValidator = new FormValidation(settings, editForm);
const addFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_add-card')
);

function handleCardClick(data) {
  popupWithImage.open(data);
}

function createCard(name, link) {
  const card = new Card({ name, link }, '#template-element', handleCardClick);
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: item => {
      const newCard = createCard(item.name, item.link);
      cardsSection.addItem(newCard);
    }
  },
  '.elements__list'
);

cardsSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
