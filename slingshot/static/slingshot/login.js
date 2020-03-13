const notifyDiv = document.querySelector('.notify-div');
const notifyHead = document.querySelector('.notify-heading-content');
const notifyMessage = document.querySelector('.notify-message')
const notifyClose = document.querySelector('.notify-close');
const warning = document.querySelector('.warning')

$('.username-field').keyup(function() {
    if (document.querySelector('.username-field').value.length < 4 || document.querySelector('.pass-field').value.length === 0) {
        warning.style.display = 'none'
    }
})

$('.pass-field').keyup(function() {
    if (document.querySelector('.username-field').value.length < 4 || document.querySelector('.pass-field').value.length === 0) {
        warning.style.display = 'none'
    }
})

/* ---FORM TO LOGIN USER USING AJAX */
$(document).on('submit','#login-form', function(e) {
    e.preventDefault();

    var formData = {
        'username': $('input[name=loginUsername]').val(),
        'password': $('input[name=loginPass]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    document.querySelector('.login-modal-button').innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>'
    $.ajax({
        type:'POST',
        url: '/login',
        data: formData,
    }).done(function(response_data) {
        if (response_data.status === 0) {
            warning.style.display = 'block'
            warning.innerHTML = response_data.message
            document.querySelector('.login-modal-button').innerHTML = "Login"
        }
        else {
            window.location.replace('https://gamathon.gg')
        }
    })
})