const modal = document.querySelector('.bg-validate-modal');
const emailBtn = document.querySelector('.change-email-btn');
const passBtn = document.querySelector('.change-pass-btn');
const emailModal = document.querySelector('#email-modal');
const modalClose = document.querySelectorAll('.validate-modal-close');
const passwordModal = document.querySelector('#password-modal');
const usernameModal = document.querySelector('#username-modal');
const nameHead = document.querySelector('.name-head');

emailBtn.addEventListener('click', ()=> {
    emailModal.style.display = 'block';
    passwordModal.style.display = 'none';
    usernameModal.style.display = 'none';
});

passBtn.addEventListener('click', ()=> {
    emailModal.style.display = 'none';
    passwordModal.style.display = 'block';
    usernameModal.style.display = 'none';   
});

for (let i = 0; i < modalClose.length; i++) {
    modalClose[i].addEventListener('click', ()=> {
        emailModal.style.display = 'none';
        passwordModal.style.display = 'none';
        usernameModal.style.display = 'none';
    })
}

document.querySelector('.notify-close').addEventListener('click', ()=> {
    document.querySelector('.notify-div').style.right = '-100%';
    setTimeout(() => {
        document.querySelector('.notify-div').style.display = 'none'
    }, 500)
})

if (document.querySelector('#session').innerHTML === 'True') {
    document.querySelector('.lower-sec-login').style.display = 'none'
    document.querySelector('.lower-sec-profile').style.display = 'block'
    document.querySelector('.my-profile').href = `/profile/${document.querySelector('#sessionUser').innerHTML}`
    document.querySelector('.acc-settings').href = `/profile-settings/${document.querySelector('#sessionUser').innerHTML}`
    document.querySelector('.wallet').href = `/wallet/${document.querySelector('#sessionUser').innerHTML}`
}
else {
    document.querySelector('.lower-sec-login').style.display = 'block'
    document.querySelector('.lower-sec-profile').style.display = 'none'
    document.querySelector('.my-profile').href = "#"
    document.querySelector('.acc-settings').href = "#"
    document.querySelector('.wallet').href = "#"
}

$(document).on('submit','#validate-email-form', function(e) {
    e.preventDefault();

    var formData = {
        'query': document.querySelector('#email-field').value,
        'queryFor': 'email',
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: `/profile-settings/${document.querySelector('#sessionUser').innerHTML}`,
        data: formData,
    }).done(function(response_data) {
        emailModal.style.display = 'none';
        document.querySelector('.notify-div').style.display = 'block'
        setTimeout(function(){ 
            document.querySelector('.notify-heading-content').innerHTML = response_data.status
            document.querySelector('.notify-message').innerHTML = response_data.message
            document.querySelector('.notify-div').style.right = '1rem' 
            if (response_data.status == 'Success :)')
                document.querySelector('.current-email').innerHTML = formData.query
        }, 200);
    })
})

$(document).on('submit','#validate-password-form', function(e) {
    e.preventDefault();

    var formData = {
        'query': document.querySelector('#pass-field').value,
        'queryFor': 'pass',
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: `/profile-settings/${document.querySelector('#sessionUser').innerHTML}`,
        data: formData,
    }).done(function(response_data) {
        passwordModal.style.display = 'none';
        document.querySelector('.notify-div').style.display = 'block'
        setTimeout(function(){ 
            document.querySelector('.notify-heading-content').innerHTML = response_data.status
            document.querySelector('.notify-message').innerHTML = response_data.message
            document.querySelector('.notify-div').style.right = '1rem' 
        }, 200);
    })
})