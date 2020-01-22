const hamburger = document.querySelector('.hamburger');
const sideBar = document.querySelector('.sideBar');
const mobNav = document.querySelector('.mobNav');
const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');
const body = document.getElementsByTagName('body');
const lowerLogin = document.querySelector('.lower-sec-login');
const lowerProfile = document.querySelector('.lower-sec-profile');
const session = document.querySelector('#session');
const sessionUser = document.querySelector('#sessionUser');
const notifyDiv = document.querySelector('.notify-div');
const notifyHead = document.querySelector('.notify-heading-content');
const notifyMessage = document.querySelector('.notify-message')
const notifyClose = document.querySelector('.notify-close');

if (session.innerHTML === 'True') {
    lowerLogin.style.display = 'none'
    lowerProfile.style.display = 'block'
    document.querySelector('.my-profile').href = `/profile/${sessionUser.innerHTML}`
    document.querySelector('.acc-settings').href = `/profile-settings/${sessionUser.innerHTML}`
    document.querySelector('.wallet').href = `/wallet/${sessionUser.innerHTML}`
}
else {
    lowerLogin.style.display = 'block'
    lowerProfile.style.display = 'none'
    document.querySelector('.my-profile').href = "#"
    document.querySelector('.acc-settings').href = "#"
    document.querySelector('.wallet').href = "#"
}

notifyClose.addEventListener('click', ()=> {
    notifyDiv.style.right = '-100%';
})

/* ---FORM TO REGISTERING USER USING AJAX */
$(document).on('submit','#reg-form', function(e) {
    e.preventDefault();

    var formData = {
        'name': $('input[name=name]').val(),
        'username': $('input[name=username]').val(),
        'password': $('input[name=pass]').val(),
        'email': $('input[name=email]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/signup',
        data: formData,
    }).done(function(response_data) {
        registerModal.style.display = 'none';
        setTimeout(function(){ 
            notifyHead.innerHTML = response_data.status
            notifyMessage.innerHTML = response_data.message
            notifyDiv.style.right = '1rem' 
        }, 200);
    })
})


/* ---FORM TO LOGIN USER USING AJAX */
$(document).on('submit','#login-form', function(e) {
    e.preventDefault();

    var formData = {
        'username': $('input[name=loginUsername]').val(),
        'password': $('input[name=loginPass]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/login',
        data: formData,
    }).done(function(response_data) {
        loginModal.style.display = 'none';
        setTimeout(function() { 
            notifyHead.innerHTML = response_data.status
            notifyMessage.innerHTML = response_data.message

            if (response_data.sessionLogged_in === true) {
                lowerLogin.style.display = 'none'
                lowerProfile.style.display = 'block'
            }
            else {
                lowerLogin.style.display = 'block'
                lowerProfile.style.display = 'none'
            }
            notifyDiv.style.right = '1rem' 
        }, 200);
    })
})