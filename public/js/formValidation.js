let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

const username = id('username'),
    email = id('email'),
    password = id('password'),
    passwordCheck = ('password-check'),
    errorMsg = classes('error')

let engine = (id, serial, message) => {

    if (id.value.trim() === "") {
    }

    else {
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    engine(username, 0, "Username cannot be blank");
    engine(email, 1, "Email cannot be blank");
    engine(password, 2, "Password cannot be blank");
    engine(passwordCheck, 3, 'Password doesnt match!')
});
