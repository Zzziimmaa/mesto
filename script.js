let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
    document.querySelector('#formName').value = document.querySelector('.profile__name').textContent
    document.querySelector('#formJob').value = document.querySelector('.profile__profession').textContent
})

popupCloseBtn.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#formName');
let jobInput = document.querySelector('#formJob');


function formSubmitHandler(evt) {
    evt.preventDefault();

    document.querySelector('.profile__name').textContent = nameInput.value
    document.querySelector('.profile__profession').textContent = jobInput.value;
    popup.classList.remove('popup_opened');

}

formElement.addEventListener('submit', formSubmitHandler);

let popupSubmitButton = document.querySelector('.popup__submit-button');