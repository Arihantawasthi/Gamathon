/* ---FORM FOR TRANSFER AMOUNT FROM USER TO TEAM USING AJAX */
$(document).on('submit','.team-wallet-transfer-form', function(e) {
    e.preventDefault();

    var formData = {
        'amount': $('input[name=team-transfer-amt]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    if (parseInt(formData.amount) > 0) {
        console.log(formData)
        $.ajax({
            type:'POST',
            url: `/team-wallet/${document.querySelector('.team-name-head').innerHTML}`,
            data: formData,
        }).done(function(response_data) {
            localStorage.setItem('fire', true)
            localStorage.setItem('recordHead', response_data['status'])
            localStorage.setItem('recordMessage', response_data['message'])
            window.location.reload()
            /* document.querySelector('.notify-div').style.display = 'block'
            setTimeout(function(){ 
                console.log(response_data)
                document.querySelector('.notify-heading-content').innerHTML = response_data.status
                document.querySelector('.notify-message').innerHTML = response_data.message
                document.querySelector('.notify-div').style.right = '1rem' 
                document.querySelector('.team-wallet-current').innerHTML = "&#8377 "+response_data.team_wallet+' INR'
                document.querySelector('.user-wallet-current').innerHTML = "&#8377 "+response_data.user_wallet+' INR'
                document.querySelector('.team-wallet-current2').innerHTML = "&#8377 "+response_data.team_wallet+' INR'
            }, 200); */
        })
    }
    else {
        notifyDiv.style.display = 'block'
        setTimeout(function(){ 
            notifyHead.innerHTML = 'Failed'
            notifyMessage.innerHTML = 'Please Provide a valid amount Homie!'
            notifyDiv.style.right = '1rem' 
        }, 200);
    }
})


/* ---FORM TO TRANSFER AMOUNT FROM TEAM TO USER USING AJAX */
$(document).on('submit','.player-transfer-form', function(e) {
    e.preventDefault();

    var formData = {
        'member': $(".player-transfer-options").val(),
        'amount': $('input[name=member-transfer-amt]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }

    if (parseInt(formData.amount) > 0) {
        console.log(formData)
        $.ajax({
            type:'POST',
            url: `/teamUserTXN/${document.querySelector('.team-name-head').innerHTML}`,
            data: formData,
        }).done(function(response_data) {
            localStorage.setItem('fire', true)
            localStorage.setItem('recordHead', response_data['status'])
            localStorage.setItem('recordMessage', response_data['message'])
            window.location.reload()
            /* notifyDiv.style.display = 'block'
            setTimeout(function(){ 
                notifyHead.innerHTML = response_data.status
                notifyMessage.innerHTML = response_data.message
                notifyDiv.style.right = '1rem' 
            }, 200); */
        })
    }
    else {
        notifyDiv.style.display = 'block'
        setTimeout(function(){ 
            notifyHead.innerHTML = 'Failed'
            notifyMessage.innerHTML = 'Please Enter a valid amount Homie!'
            notifyDiv.style.right = '1rem' 
        }, 200);
    }
})