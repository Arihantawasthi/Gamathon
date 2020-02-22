const line = document.querySelector('.line');
const teams = document.querySelector('.teams');
const players = document.querySelector('.players');
const leadHead = document.querySelector('.lead-head');
const teamTable = document.querySelector('.top-team-table');
const playerTable = document.querySelector('.top-player-table');


/* players.addEventListener('click', ()=> {
    line.style.width='6.1';
    line.style.transform= "translate(7.7rem)";
    players.style.opacity = '1';
    teams.style.opacity = '0.6';
    leadHead.innerHTML = 'Players';
    teamTable.style.display ='none';
    playerTable.style.display = 'block';
}) */

teams.addEventListener('click', ()=> {
    line.style.width='5.9';
    line.style.transform= "translate(0)";
    teams.style.opacity = '1';
    players.style.opacity = '0.6';
    leadHead.innerHTML = 'Teams';
    $('.top-team-table').fadeIn();
    $('.top-player-table').fadeOut();
})

players.addEventListener('click', () => {
    line.style.width='6.1';
    line.style.transform= "translate(7.7rem)";
    players.style.opacity = '1';
    teams.style.opacity = '0.6';
    leadHead.innerHTML = 'Players';
    $('.top-team-table').fadeOut();
    $('.top-player-table').fadeIn();

    $.ajax({
        type: "GET",
        url: window.location.href + '/top-players',  // URL to your view that serves new info
    })
    .done(function(response) {
        document.querySelector('.top-player-table').innerHTML = response
    });
})