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

const handleRatingChecked = (e) => {
    let label = e.currentTarget;
    if (e.key === 'Enter' || e.key === ' ') {
        label.click();
    }
};

// This code was written with the help of github copilot
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    // Prevent the default Tab behavior
    event.preventDefault();

    // Get all elements with a valid tabindex, sorted by tabindex value
    const tabbableElements = Array.from(document.querySelectorAll('[tabindex]'))
      .filter(el => el.tabIndex >= 0) // Ensure the tabindex is valid
      .sort((a, b) => a.tabIndex - b.tabIndex); // Sort by tabindex

    if (tabbableElements.length === 0) return; // Exit if there are no tabbable elements

    // Find the currently focused element
    const currentIndex = tabbableElements.indexOf(document.activeElement);

    // Determine the next element to focus
    const nextIndex = event.shiftKey
      ? (currentIndex <= 0 ? tabbableElements.length - 1 : currentIndex - 1) // Shift + Tab (go backward)
      : (currentIndex >= tabbableElements.length - 1 ? 0 : currentIndex + 1); // Tab (go forward)

    // Focus the next element
    tabbableElements[nextIndex].focus();
  }
});



// I have elements that are not focusable, so I need to add the tabindex attribute to them
// I chose to add the tabindex attribute to the labels, since they are the elements that are being clicked
ratingForm.querySelectorAll('label.button--clickable').forEach((label) => {
    // a handler for the enter or spacec keyboard event is needed
    label.addEventListener('keydown', handleRatingChecked);
});

ratingForm.addEventListener('submit', handleSubmitRating);

dismissThankButton.addEventListener('click', handleDismissThank);