let profile__edit_button = document.querySelector('.profile__edit-button');
let popup__close_btn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

profile__edit_button.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
})

popup__close_btn.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('#formName');
let jobInput = document.querySelector('#formJob');


function formSubmitHandler(evt) {
    evt.preventDefault();

    document.querySelector('.profile__name').textContent = nameInput.value
    document.querySelector('.profile__profession').textContent = jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);

let popup__submit_button = document.querySelector('.popup__submit-button');

popup__submit_button.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
})