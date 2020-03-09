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

    $.ajax({
        type: "GET",
        url: window.location.href + '/participants',  // URL to your view that serves new info
    })
    .done(function(response) {
        document.querySelector('.players-content').innerHTML = response;
    });
})