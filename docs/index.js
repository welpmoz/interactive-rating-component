const ratingForm = document.getElementById('rating-form');
const thankView = document.getElementById('thank-view');
const formView = document.getElementById('form-view');

const dismissThankButton = document.getElementById('dismiss-button');

const nullValidation = {
    rating: (value) => value !== undefined,
};

const cleanUp = (oldRating) => {
    let selectedRating = document.getElementById(`rating-${oldRating}`);
    selectedRating.checked = false;
};

const renderSuccess = (rating) => {
    const ratingContainer = document.getElementById('rating-selected');
    ratingContainer.innerHTML = rating;
    formView.classList.replace('presentation__item--visible', 'presentation__item--hidden');
    thankView.classList.replace('presentation__item--hidden', 'presentation__item--visible');
};

const formIsValid = (formData, validators) => {
    let isValid = false;
    
    Object.keys(formData).forEach((name) => {
        if (dataIsValid(name, formData[name], validators)) {
            isValid = true;
        }
    });

    return isValid;
};

const dataIsValid = (name, value, validators) => {
    return validators[name](value);
};

const handleSubmitRating = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (formIsValid(data, nullValidation)) {
        renderSuccess(data.rating);
    }
};

const handleDismissThank = (e) => {
    const ratingContainer = document.getElementById('rating-selected');
    let oldRating = ratingContainer.innerHTML;
    cleanUp(oldRating);
    formView.classList.replace('presentation__item--hidden', 'presentation__item--visible');
    thankView.classList.replace('presentation__item--visible', 'presentation__item--hidden');
};

ratingForm.addEventListener('submit', handleSubmitRating);

dismissThankButton.addEventListener('click', handleDismissThank);