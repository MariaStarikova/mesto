let openPopupBtn = document.querySelector('.profile__edit-button');
let editPopup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-button');
let profileTitle = document.querySelector('.profile__title');
let titleInput = document.querySelector('#title-input');
let profileSubtitle = document.querySelector('.profile__subtitle');
let subtitleInput = document.querySelector('#subtitle-input');
let editForm = document.querySelector('.popup__form');

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
