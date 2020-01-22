/* FORM TO CHECK WHETHER USERNAME IS AVAILABLE */
$('#reg-username').keyup(function() {
    formData = {
        'query' : $('#reg-username').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }

    document.querySelector('.username-warning-unavailable').style.display = 'none'
    document.querySelector('.username-warning-available').style.display = 'none'
    if (formData.query.length > 4) {
        $.ajax({
            type: "POST",
            url: "/usernameCheck",
            data: formData,
        }).done(function(response_data) {
            if ($('#reg-username').val().length < 5) {
                document.querySelector('.username-warning-unavailable').style.display = 'none'
                document.querySelector('.username-warning-available').style.display = 'none'
            }
            if (response_data.status === 0) {
                document.querySelector('.username-warning-unavailable').style.display = 'block'
                document.querySelector('.username-warning-available').style.display = 'none'
                document.querySelector('.username-warning-unavailable').innerHTML = '<i class="fa fa-times" style="margin-right: 0.2rem"></i>'+response_data.message
                document.querySelector('.username-warning-unavailable').style.color = 'red'
            }
            else if (response_data.status === 1) {
                document.querySelector('.username-warning-unavailable').style.display = 'none'
                document.querySelector('.username-warning-available').style.display = 'block'
                document.querySelector('.username-warning-available').innerHTML = '<i class="fa fa-check" style="margin-right: 0.2rem"></i>'+response_data.message
                document.querySelector('.username-warning-available').style.color = 'green'
            }
        })
    }
})


/* ---FORM TO REGISTERING USER USING AJAX */
$(document).on('submit','#reg-form', function(e) {
    e.preventDefault();

    var formData = {
        'name': $('input[name=name]').val(),
        'username': $('input[name=username]').val(),
        'password': $('input[name=pass]').val(),
        'email': $('input[name=emails]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/signup',
        data: formData,
    }).done(function(response_data) {
        document.querySelector('.notify-div').style.display = 'block'
        if (response_data.status === 'Failed :(') {
            setTimeout(() => {
                document.querySelector('.notify-heading-content').innerHTML = response_data.status
                document.querySelector('.notify-message').innerHTML = response_data.message
                document.querySelector('.notify-div').style.right = '1rem'
            }, 200)
        }
        else {
            document.querySelector('.notify-div').style.height = '7.5rem';
            document.querySelector('.btn-container').style.display = 'block'
            setTimeout(function(){ 
                document.querySelector('.notify-heading-content').innerHTML = response_data.status
                document.querySelector('.notify-message').innerHTML = response_data.message
                document.querySelector('.notify-div').style.right = '1rem'
            }, 200);
        }
    })
})

document.querySelector('.notify-close').addEventListener('click', () => {
    document.querySelector('.notify-div').style.right = '-100%';
    setTimeout(() => {
        document.querySelector('.notify-div').style.display = 'none'
    }, 200)
})