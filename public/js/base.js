const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');

const modalClose = document.querySelector('.modal-close');
const planBtn = document.querySelectorAll('#modal-btn');

const navbarToggle = document.querySelector('.navbar-toggle');
const mobileNav = document.querySelector('.mobile-navbar');

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

const toggleBtn = document.getElementsByClassName('navbar-toggle')[0]
const navbarNav = document.getElementsByClassName('navbar-nav')[0]

const navbarLink = document.getElementsByClassName('navbar-link')[0]

toggleBtn.addEventListener('click', () => {
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

function darkMode() {
    var element = document.body;
    var content = document.getElementById("DarkModetext");
    element.className = "dark-mode";
    content.innerText = "Dark Mode is ON";
}
function lightMode() {
    var element = document.body;
    var content = document.getElementById("DarkModetext");
    element.className = "light-mode";
    content.innerText = "Dark Mode is OFF";
}

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

// Form validation
const title = document.getElementById('title')
const password = document.getElementById('password')
const form = document.getElementById('campgroundForm')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
    let messages = []
    if (title.value === '' || title.value == null) {
        messages.push('Campground name is required')
    }

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }

    if (password.value.length >= 20) {
        messages.push('Password must be less than 20 characters')
    }

    if (password.value === 'password') {
        messages.push('Password cannot be password')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})