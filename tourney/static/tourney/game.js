const validateModal = document.querySelector('.bg-validate-modal');
const validate = document.querySelector('.validate-game');
const validateContent = document.querySelector('.validate-modal-content')
const validateClose = document.querySelector('.validate-modal-close');
const sessionName = document.querySelector('#sessionUser')
const sessionState = document.querySelector('#session')
const login = document.querySelector('.bg-login-modal')
const loginClose = document.querySelector('.modal-close')
const validateHead = document.querySelector('.validate-game-label')
const validateMess = document.querySelector('.validate-game-sub-label')

try {
    validate.addEventListener('click', function() {
        if (sessionState.innerHTML === 'True') {
            validateModal.style.display = 'block'
            setTimeout(() => {
                validateContent.style.transform = 'translate(0rem, 0rem)'
            }, 100)
        }
        else {
            login.style.display = 'block'
        }
    });

    validateClose.addEventListener('click', function() {
        validateContent.style.transform = 'translate(0rem, -5rem)'
        setTimeout(() => {
            validateModal.style.display = 'none';
        }, 100)
    });
}
catch(e) {}

loginClose.addEventListener('click', () => {
    login.style.display = 'none'
})

try {
notifyClose.addEventListener('click', ()=> {
    notifyDiv.style.right = '-100%';
    setTimeout(function () {
        notifyDiv.style.display = 'none'
    }, 500)
})
} catch(e) {}

var url = window.location.pathname;
var gamename = url.substring(url.lastIndexOf('/')+1);

/* Form for sending game id to validate account */
$(document).on('submit','.validate-modal-form', function(e) {
    e.preventDefault();

    var formData = {
        'changed': 'False',
        'gameid': $('input[name=gameid]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    document.querySelector('.validate-modal-button').disabled=true
    document.querySelector('.validate-modal-button').innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>'

    $.ajax({
        type:'POST',
        url: '/game/'+gamename,
        data: formData,
    }).done(function(response_data) {
        localStorage.setItem('fire', true)
        localStorage.setItem('recordHead', response_data['status'])
        localStorage.setItem('recordMessage', response_data['message'])
        window.location.reload()
    })
})

try {
    document.querySelector('.change-ign').addEventListener('click', () => {
        document.querySelector('#change-ign').style.display = 'block'
        setTimeout(() => {
            document.querySelector('#change-ign-content').style.transform = 'translate(0rem, 0rem)'
        },100)
        
        document.querySelector('.change-ign-close').addEventListener('click', () => {
            document.querySelector('#change-ign-content').style.transform = 'translate(0rem, -5rem)'
            setTimeout(() => {
                document.querySelector('#change-ign').style.display = 'none'
            },100)
        })
    })
}
catch(e){}

/* Form for sending changed game id to validate account */
$(document).on('submit','#change-ign-form', function(e) {
    e.preventDefault();

    var formData = {
        'changed': 'True',
        'gameid': $('input[name=changed-game-id]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    document.querySelector('.change-modal-btn').disabled=true
    document.querySelector('.change-modal-btn').innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>'
    $.ajax({
        type:'POST',
        url: '/game/'+gamename,
        data: formData,
    }).done(function(response_data) {
        localStorage.setItem('fire', true)
        localStorage.setItem('recordHead', response_data['status'])
        localStorage.setItem('recordMessage', response_data['message'])
        window.location.reload()
    })
})
