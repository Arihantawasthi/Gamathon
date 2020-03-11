let counter = 0
/* How many participants should be loaded at once.(quantity) */
let quantity = 20

function loadParticipants() {
    const start = counter;
    const end = start + quantity + 1 
    counter = end + 1

    var formData = {
        'start': start,
        'end': end
    }
    $.ajax({
        type: "GET",
        url: window.location.href + '/participants',  // URL to your view that serves new info
        data: formData
    })
    .done(function(response) {
        $('.players-content').append(response);
    });
}

document.querySelector('.players').addEventListener('click', () => {
    document.querySelector('.ladder').style.opacity = '0.6';
    $('.ladder-content').fadeOut();
    document.querySelector('.overview').style.opacity = '0.6';
    $('.overview-container').fadeOut();
    document.querySelector('.rules').style.opacity = '0.6';
    $('.rules-content').fadeOut();
    document.querySelector('.prizes').style.opacity = '0.6'
    $('.prizes-content').fadeOut();
    document.querySelector('.schedule').style.opacity = '0.6'
    $('.schedule-content').fadeOut();
    document.querySelector('.players').style.opacity = '1';
    $('.players-content').fadeIn();
    document.querySelector('.line4').style.transform = 'translate(11.1rem)';
    document.querySelector('.line4').style.width = '4.2rem';

    loadParticipants()
})

//If clicked load more button, load other 20 participants
$(document).on('click', '#load-participants', () => {
    $('#load-participants').remove()
    loadParticipants()
})