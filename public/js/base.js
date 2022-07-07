// Alert JS
$(".alert-close").click(function () {
    $(this)
        .parent(".alert")
        .fadeOut();
});

// Navbar toggle
const navToggle = document.querySelector('.navbar-toggle');
const navbarNav = document.querySelector('.navbar-nav');

const navbarLink = document.querySelector('.navbar-link');

navToggle.addEventListener('click', function () {
    navbarNav.classList.toggle('navbar-active');
});


// Accordion script 
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
            }, 2000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});

// const modal = document.getElementById("myModal");
// const modalBtn = document.getElementById("myBtn");
// const modalSpan = document.getElementsByClassName("close")[0];

// modalBtn.onclick = function () {
//     modal.style.display = "block";
// }

// modalSpan.onclick = function () {
//     modal.style.display = "none";
// }

// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// Tabs Group
function openEvent(evt, content) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }

    document.getElementById(content).style.display = 'block';
    evt.currentTarget.className += ' active';
}

// Form Validation
const email_reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pass_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const campgroundForm = document.getElementById('campgroundForm');

const registerForm = document.getElementById('signup');

campgroundForm.addEventListener('submit', (e) => {
    const message = document.getElementById('message')

    const title = document.getElementById('title').value.trim()
    const description = document.getElementById('description').value.trim()
    const price = document.getElementById('price').value.trim()
    const image = document.getElementById('image').value.trim()
    const location = document.getElementById('location').value.trim()

    e.preventDefault();
})


registerForm.addEventListener('submit', (e) => {


    e.preventDefault()
})
