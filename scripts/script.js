const openPopupBtn = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const titleInput = document.querySelector('#title-input');
const profileSubtitle = document.querySelector('.profile__subtitle');
const subtitleInput = document.querySelector('#subtitle-input');
const editForm = document.querySelector('.popup__form');

openPopupBtn.addEventListener('click', function () {
  titleInput.value = profileTitle.textContent;
  subtitleInput.value = profileSubtitle.textContent;
  editPopup.classList.add('popup_opened');
});

closePopupBtn.addEventListener('click', function () {
  editPopup.classList.remove('popup_opened');
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;

  profileSubtitle.textContent = subtitleInput.value;

  editPopup.classList.remove('popup_opened');
});

const openPopupAddBtn = document.querySelector('.profile__add-button');
const editPopupAdd = document.querySelector('#popup');
const closePopupAddBtn = document.querySelector('#popup__close-button');
const addForm = document.querySelector('#popup__form');

openPopupAddBtn.addEventListener('click', function () {
  editPopupAdd.classList.add('popup_opened');
});

closePopupAddBtn.addEventListener('click', function () {
  editPopupAdd.classList.remove('popup_opened');
});

const template = document.querySelector('#template-element');
const templateContent = template.content;
const templateList = document.querySelector('.elements__list');
const templateListEl = templateContent.querySelector('.element');
const mestoInput = document.querySelector('#mesto-input');
const imageInput = document.querySelector('#image-input');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (item) {
  const newCard = createCards(item);
  templateList.prepend(newCard);
});

function createCards(value) {
  const newCard = templateListEl.cloneNode(true);

  const mestoTextEl = newCard.querySelector('.element__title');
  mestoTextEl.textContent = value.name;

  const imageEl = newCard.querySelector('.element__image');
  imageEl.src = value.link;
  imageEl.alt = value.name;

  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__button-like_active');
  });

  const deleteButton = newCard.querySelector('.element__button-remove');
  deleteButton.addEventListener('click', function () {
    templateList.removeChild(newCard);
  });

  imageEl.addEventListener('click', function () {
    openPopupView(value);
  });

  return newCard;
}

addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newCardData = {
    name: mestoInput.value,
    link: imageInput.value
  };

  const newCard = createCards(newCardData);
  templateList.prepend(newCard);

  mestoInput.value = '';
  imageInput.value = '';

  editPopupAdd.classList.remove('popup_opened');
});

function openPopupView(data) {
  const popupView = document.querySelector('#popup-view');
  const popupImage = popupView.querySelector('.popup__image');
  const popupTitle = popupView.querySelector('.popup__title-image');

  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupTitle.textContent = data.name;

  popupView.classList.add('popup_opened');
}

document.querySelector('#popup-view__close-button').addEventListener('click', function () {
  document.querySelector('#popup-view').classList.remove('popup_opened');
});
