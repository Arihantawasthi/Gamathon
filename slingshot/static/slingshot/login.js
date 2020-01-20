const notifyDiv = document.querySelector('.notify-div');
const notifyHead = document.querySelector('.notify-heading-content');
const notifyMessage = document.querySelector('.notify-message')
const notifyClose = document.querySelector('.notify-close');
const warning = document.querySelector('.warning')

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
            window.location.replace('http://127.0.0.1:8000')
        }
    })
})