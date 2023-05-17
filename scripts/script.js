let openPopupBtn = document.querySelector('.edit-button');
let editPopup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-button');
let profileTitle = document.querySelector('.profile__title');
let titleInput = document.querySelector('#title-input');
let profileSubtitle = document.querySelector('.profile__subtitle');
let subtitleInput = document.querySelector('#subtitle-input');
let editForm = document.querySelector('.popup__form');
let saveSubmit = document.querySelector('.popup__button');

openPopupBtn.addEventListener('click', function () {
  editPopup.classList.add('popup_opened');
});

closePopupBtn.addEventListener('click', function () {
  editPopup.classList.remove('popup_opened');
});

titleInput.value = profileTitle.textContent;

subtitleInput.value = profileSubtitle.textContent;

saveSubmit.addEventListener('click', function () {
  editPopup.classList.remove('popup_opened');
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileTitle.textContent = titleInput.value;

  profileSubtitle.textContent = subtitleInput.value;
});
