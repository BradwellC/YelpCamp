// Modal JS
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const planBtn = document.querySelectorAll('#modal-btn');

// Navbar JS
const navbarToggle = document.querySelector('.navbar-toggle');
const mobileNav = document.querySelector('.mobile-navbar');

// Form JS
const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#password-confirm');
const form = document.querySelector('#form');

// Reuseable functions
const required = value => value === '' ? false : true;
const between = (length, min, max) => length < min || length > max ? false : true;
const emailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const securePassword = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {
    const formGroup = input.parentElement;

    formGroup.classList.remove('success');
    formGroup.classList.add('error');

    const error = formGroup.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input) => {
    // get the form-field element
    const formGroup = input.parentElement;

    // remove the error class
    formGroup.classList.remove('error');
    formGroup.classList.add('success');

    // hide the error message
    const error = formGroup.querySelector('small');
    error.textContent = '';
}


// Main JS
for (var i = 0; i < planBtn.length; i++) {
    planBtn[i].addEventListener('click', function () {
        modal.classList.add('open');
        backdrop.classList.add('open');
    })
}

backdrop.addEventListener('click', function () {
    mobileNav.classList.remove('open');
    closeModal();
})

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

function closeModal() {
    if (modal) {
        modal.classList.remove('open');
    }
    backdrop.classList.remove('open');
}

// Navbar toggle
const navToggle = document.querySelector('.navbar-toggle');
const navbarNav = document.querySelector('.navbar-nav');

const navbarLink = document.querySelector('.navbar-link');

navToggle.addEventListener('click', function () {
    navbarNav.classList.toggle('open');
});

/*  Accordion script  */
const accordionSelector = document.querySelectorAll(".accordion");
accordionSelector.forEach((accordion) => {
    accordion.onclick = function () {
        this.classList.toggle('open');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };
});

// Smooth Scrolling
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

// Alerts
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () { div.style.display = "none"; }, 600);
    }
}

// Form JS
const usernameCheck = () => {
    let vaild = false;
    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!required(username)) {
        showError(usernameEl, 'Username cannot be blank');
    } else if (!between(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max}`);
    } else {
        showSuccess(usernameEl);
        vaild = true;
    }

    return vaild;
}

const passwordCheck = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!required(password)) {
        showError(passwordEl, 'Pasword cannot be blank!');
    } else if (!securePassword(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
}

const confirmPasswordCheck = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!required(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};

form.addEventListener('submit', (e) => {
    // Prevents form from submitting
    e.preventDefault();

    form.addEventListener('submit', function (e) {
        // prevent the form from submitting
        e.preventDefault();

        // validate forms
        let isUsernameValid = usernameCheck(),
            isEmailValid = emailCheck(),
            isPasswordValid = passwordCheck(),
            isConfirmPasswordValid = confirmPasswordCheck();

        let isFormValid = isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;

        // submit to the server if the form is valid
        if (isFormValid) {

        }
    });
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            usernameCheck();
            break;
        case 'email':
            emailCheck();
            break;
        case 'password':
            passwordCheck();
            break;
        case 'confirm-password':
            confirmPasswordCheck();
            break;
    }
}));

form.addEventListener('input', function (e) {
    switch (e.target.id) {
        case 'username':
            usernameCheck();
            break;
        case 'email':
            emailCheck();
            break;
        case 'password':
            passwordCheck();
            break;
        case 'confirm-password':
            confirmPasswordCheck();
            break;
    }
});