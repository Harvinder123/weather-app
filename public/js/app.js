const URL = 'http://localhost:3000';
const weatherForm = document.querySelector('#search_form');
const search = document.querySelector('#location');
const messageOne = document.querySelector('#message_1');
const messageTwo = document.querySelector('#message_2');
if(weatherForm) { 
    weatherForm.addEventListener('submit', (e) => {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        e.preventDefault(); 
        const location = search.value;
            fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error;
                    messageTwo.textContent = '';
                } else {
                    messageOne.textContent = data.name;
                    messageTwo.textContent = data.content;
                }
            })
        })
    })
}

const loginForm = document.querySelector('#login_form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const successMessage = document.querySelector('#success_message');
const errorMessage = document.querySelector('#error_message');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        errorMessage.textContent = '';
        e.preventDefault();
        
        fetch('/signin?username='+username.value+'&password='+password.value).then((response) => {
            response.json().then((data) => {
                
                if(data.error) {
                    errorMessage.textContent = data.error;
                    successMessage.textContent = '';
                }  else {
                     errorMessage.textContent = '';
                     successMessage.textContent = data.content;
                }
            })
        })
    })
}

const registrationForm = document.querySelector('#registration_form');
const regUsername = document.querySelector('#username');
const regPassword = document.querySelector('#password');
const regErrorMessage = document.querySelector('#error_message');
const regSuccessMessage = document.querySelector('#success_message');
if(registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        regSuccessMessage.textContent = '';
        regErrorMessage.textContent = '';
        e.preventDefault();
        fetch('/registration?username='+regUsername.value+'&password='+regPassword.value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    regErrorMessage.textContent = data.error
                    regSuccessMessage.textContent = ''
                } else {
                    regErrorMessage.textContent = ''
                    regSuccessMessage.textContent = data.content
                }  
            })
        })
    })
}

const contactForm = document.querySelector('#contact_form');
const contactFirstName = document.querySelector('#first_name');
const contactLastName = document.querySelector('#last_name');
const contactEmail = document.querySelector('#email');
const contactMessage = document.querySelector('#message');
const contactSuccessMessage = document.querySelector('#success_message');
const contactErrorMessage = document.querySelector('#error_message');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactSuccessMessage.textContent = '';
        fetch('/send_mail?first_name='+contactFirstName.value+'&last_name='+contactLastName.value+'&email='+contactEmail.value+'&message='+contactMessage.value).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    contactErrorMessage.textContent = data.error
                    contactSuccessMessage.textContent = ''
                } else {
                    contactErrorMessage.textContent = ''
                    contactSuccessMessage.textContent = data.content
                }  
            })
        })
    })
}