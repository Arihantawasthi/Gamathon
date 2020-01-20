const line = document.querySelector('.line');
const teams = document.querySelector('.teams');
const players = document.querySelector('.players');
const leadHead = document.querySelector('.lead-head');
const teamTable = document.querySelector('.top-team-table');
const playerTable = document.querySelector('.top-player-table');


players.addEventListener('click', ()=> {
    line.style.width='6.1';
    line.style.transform= "translate(7.7rem)";
    players.style.opacity = '1';
    teams.style.opacity = '0.6';
    leadHead.innerHTML = 'Players';
    teamTable.style.display ='none';
    playerTable.style.display = 'block';
})

teams.addEventListener('click', ()=> {
    line.style.width='5.9';
    line.style.transform= "translate(0)";
    teams.style.opacity = '1';
    players.style.opacity = '0.6';
    leadHead.innerHTML = 'Teams';
    teamTable.style.display ='block';
    playerTable.style.display = 'none';
})