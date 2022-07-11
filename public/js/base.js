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


// File Upload 
Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function (button) {
        const hiddenInput = button.parentElement.querySelector(
            ".file-upload__input"
        );
        const label = button.parentElement.querySelector(".file-upload__label");
        const defaultLabelText = "No file(s) selected";

        // Set default text for label
        label.textContent = defaultLabelText;
        label.title = defaultLabelText;

        button.addEventListener("click", function () {
            hiddenInput.click();
        });

        hiddenInput.addEventListener("change", function () {
            const filenameList = Array.prototype.map.call(hiddenInput.files, function (
                file
            ) {
                return file.name;
            });

            label.textContent = filenameList.join(", ") || defaultLabelText;
            label.title = label.textContent;
        });
    }
);