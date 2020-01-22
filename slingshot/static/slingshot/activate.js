const notifyDiv = document.querySelector('.notify-div');
const notifyHead = document.querySelector('.notify-heading-content');
const notifyMessage = document.querySelector('.notify-message')
const notifyClose = document.querySelector('.notify-close');
const warning = document.querySelector('.warning')

setTimeout(function() {
    notifyHead.innerHTML = 'Congratulations!'
    notifyMessage.innerHTML = 'Your account has been verified. Login to start playing exciting tournaments.' 
    notifyDiv.style.right = '1rem';
}, 200)

notifyClose.addEventListener('click', ()=> {
    notifyDiv.style.right = '-100%';
    setTimeout(() => {
        notifyDiv.style.display = 'none'
    }, 500)
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
        if (response_data.status === 0) {
            warning.style.display = 'block'
            warning.innerHTML = response_data.message
        }
        else {
            window.location.replace('http://13.126.115.12:8000')
        }
    })
})