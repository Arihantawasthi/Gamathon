var url = window.location.pathname;
var tourid = url.substring(url.lastIndexOf('/')+1);

$('.send-id-pass').submit(function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var formData = {
        'stage_name': document.querySelector('#stage-select').value,
        'group_name': document.querySelector('#group-select').value,
        'roomid': document.querySelector('.room-id').value,
        'password': document.querySelector('.password').value,
        'time': document.querySelector('.time').value,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    
    document.querySelector('.send-roomid-pass').innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>'

    $.ajax({
        type:'POST',
        url: '/orgPortal/tournament/'+tourid,
        data: formData,
    }).done(function(response_data) {
        
        /* localStorage.setItem('fire', true)
        localStorage.setItem('recordHead', response_data['status'])
        localStorage.setItem('recordMessage', response_data['message'])
        window.location.reload() */
        notifyDiv.style.display = 'block'
        document.querySelector('.send-roomid-pass').innerHTML = 'Send Room ID and Password'
        setTimeout(function(){ 
            notifyHead.innerHTML = response_data['group_name']
            notifyMessage.innerHTML = response_data['time']
            notifyMessage.append(response_data['room_id']) 
            notifyMessage.append(response_data['password']) 
            notifyDiv.style.right = '1rem'
        }, 200);
    })
    return false
})