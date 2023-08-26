import '../pages/index.css';
import { Card } from '../components/Card.js';
import { settings } from '../utils/constants';
import { FormValidation } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupRemove } from '../components/PopupRemove.js';
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
const openUpdateAvatarPopupBtn = document.querySelector('.profile__button-avatar');
const popupRemove = new PopupRemove('.popup_remove');
const popupWithImage = new PopupWithImage('.popup_image');
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: '73e5a98c-079b-4b9e-b964-5323cdfb16c2',
    'Content-Type': 'application/json'
  }
});

let userId;

openEditPopupBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  titleInput.value = userData.name;
  subtitleInput.value = userData.about;
  editPopup.open();

  editFormValidator.toggleButtonState();
});

openAddPopupBtn.addEventListener('click', () => {
  addPopup.open();
  addFormValidator.toggleButtonState();
});

openUpdateAvatarPopupBtn.addEventListener('click', () => {
  updateAvatarPopup.open();
  updateAvatarFormValidator.toggleButtonState();
});

const editPopup = new PopupWithForm(
  '.popup_edit-profile',
  formData => {
    const userData = {
      name: formData['input-title'],
      about: formData['input-description']
    };
    return api
      .updateUserInfo(userData)
      .then(updatedUserData => {
        console.log(updatedUserData);
        userInfo.setUserInfo(updatedUserData);
        editPopup.close();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  },
  api,
  userInfo
);

const updateAvatarPopup = new PopupWithForm(
  '.popup_update-avatar',
  formData => {
    return api
      .updateUserAvatar(formData['input-avatar'])
      .then(updatedUserData => {
        console.log(updatedUserData);
        userInfo.setUserAvatar(updatedUserData.avatar);
        updateAvatarPopup.close();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  },
  api,
  userInfo
);

const addPopup = new PopupWithForm(
  '.popup_add-card',
  formData => {
    const newCardData = {
      name: formData['input-name'],
      link: formData['input-link']
    };

    return api
      .addNewCard(newCardData)
      .then(cardData => {
        console.log(cardData);
        const newCard = createCard(cardData, userId);
        cardsSection.addItem(newCard);
        addPopup.close();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  },
  api,
  userInfo
);

function handleLike(cardId, action) {
  if (action === 'add') {
    return api
      .addLike(cardId)
      .then(data => {
        return data.likes.length;
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  } else if (action === 'remove') {
    return api
      .removeLike(cardId)
      .then(data => {
        return data.likes.length;
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }
}

function handleDelete(cardId) {
  popupRemove.setDeleteInfo(api, cardId, this.getElement());
  popupRemove.open();
}

popupRemove.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
popupWithImage.setEventListeners();
updateAvatarPopup.setEventListeners();

export const editFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form')
);
const addFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_add-card')
);
const updateAvatarFormValidator = new FormValidation(
  settings,
  document.querySelector('.popup__form_avatar')
);

function handleCardClick(data) {
  popupWithImage.open(data);
}

function createCard(cardData, userId) {
  cardData.cardId = cardData._id;
  const card = new Card(
    cardData,
    '#template-element',
    handleCardClick,
    handleLike,
    handleDelete,
    userId
  );
  return card.generateCard();
}

const cardsSection = new Section(
  {
    items: [],
    renderer: item => {
      const newCard = createCard(item);
      return newCard;
    }
  },
  '.elements__list'
);

cardsSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();

api
  .getInfoUser()
  .then(res => {
    console.log(res);
    userInfo.setUserInfo({
      name: res.name,
      about: res.about
    });
    userId = res._id;

    userInfo.setUserAvatar(res.avatar);
  })
  .catch(err => {
    console.error(`Ошибка: ${err}`);
  });

api
  .getInitialCards()
  .then(cardsData => {
    console.log(cardsData);
    cardsData.forEach(item => {
      const newCard = createCard(item, userId);
      cardsSection.addItem(newCard);
    });
  })
  .catch(err => {
    console.error(`Ошибка: ${err}`);
  });
