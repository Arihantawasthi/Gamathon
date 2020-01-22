/* ---FORM TO RECOVER PASSWORD USER USING AJAX */
$(document).on('submit','#reset-form', function(e) {
    e.preventDefault();

    var formData = {
        'pass': $('input[id=pass]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: window.location.href,
        data: formData,
    }).done(function(response_data) {
        if (response_data.status === 1) {
            window.location.replace('http://13.235.100.9/signin')
        }
    })
})