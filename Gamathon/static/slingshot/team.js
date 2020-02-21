const line = document.querySelector('.line');
const overview = document.querySelector('.overview');
const members = document.querySelector('.members');
const stats = document.querySelector('.stats');
const games = document.querySelector('.games');
const overviewSection = document.querySelector('.overview-section');
const memberSection = document.querySelector('.members-section');
const statSection = document.querySelector('.stats-section');
const gameSection = document.querySelector('.games-section');
const inviteBtn = document.querySelector('.invite-member-btn');
const friend = document.querySelector('.friend');
const modal = document.querySelector('.bg-create-team-modal');
const modalContent = document.querySelector('.create-team-modal-content')
const inviteMember = document.querySelector('.invite-member-card');
const modalClose = document.querySelector('.create-team-modal-close');
const friendCard = document.querySelectorAll('.friends-card');
const joinTeam = document.querySelector('.join-team-btn');
const joinModal = document.querySelector('.bg-join-team-modal');
const joinModalContent = document.querySelector('.join-team-modal-content')
const joinModalClose = document.querySelector('.join-team-modal-close')

try {
    joinTeam.addEventListener('click', ()=> {
        joinModal.style.display = 'block'
        setTimeout(() => {
            joinModalContent.style.marginTop = '12rem'
        }, 100)
    })

    joinModalClose.addEventListener('click', () => {
        joinModalContent.style.marginTop = '10rem'
        setTimeout(() => {
            joinModal.style.display = 'none'
        }, 400)
    })
}
catch (e) {}

document.querySelector('#shareLink').value = window.location.href

function myFunction() {
    var copyText = document.getElementById("shareLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

document.querySelector('.copyLink').addEventListener('click', function() {
    myFunction();
});

members.addEventListener('click', ()=> {
    members.style.opacity = '1';
    overview.style.opacity = '0.6';
    stats.style.opacity = '0.6';
    games.style.opacity = '0.6';
    line.style.transform= "translate(6rem)";
    line.style.width = "4.7rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'none';
    gameSection.style.display = 'none';
    memberSection.style.display = 'block';
});

overview.addEventListener('click', ()=> {
    members.style.opacity = '0.6';
    overview.style.opacity = '1';
    stats.style.opacity = '0.6';
    games.style.opacity = '0.6';
    line.style.transform= "translate(0rem)";
    line.style.width = "4.5rem";
    overviewSection.style.display = 'block';
    statSection.style.display = 'none';
    gameSection.style.display = 'none';
    memberSection.style.display = 'none';
});

stats.addEventListener('click', ()=> {
    members.style.opacity = '0.6';
    overview.style.opacity = '0.6';
    stats.style.opacity = '1';
    games.style.opacity = '0.6';
    line.style.transform= "translate(12.2rem)";
    line.style.width = "4.7rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'block';
    gameSection.style.display = 'none';
    memberSection.style.display = 'none';
});

games.addEventListener('click', ()=> {
    members.style.opacity = '0.6';
    overview.style.opacity = '0.6';
    stats.style.opacity = '0.6';
    games.style.opacity = '1';
    line.style.transform= "translate(18.5rem)";
    line.style.width = "3.5rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'none';
    gameSection.style.display = 'block';
    memberSection.style.display = 'none';
});

try {
    inviteBtn.addEventListener('click', ()=> {
        modal.style.display = 'block';
        setTimeout(() => {
            modalContent.style.transform = 'translate(0rem, -1rem)'
        }, 100)
    });
}
catch(e) {

}

try {
    inviteMember.addEventListener('click', ()=> {
        modal.style.display = 'block';
        setTimeout(() => {
            modalContent.style.transform = 'translate(0rem, -1rem)'
        }, 100)
    });
}
catch(e) {

}

var url = window.location.pathname;
var teamName = url.substring(url.lastIndexOf('/')+1);

modalClose.addEventListener('click', ()=> {
    modalContent.style.transform = 'translate(0rem, -5rem)'
    setTimeout(() => {
        modal.style.display = 'none';
    }, 200)
});

/* HANDLING SEARCH */
$('#invite-search').keyup(function() {
    document.querySelector('.search-result-container').style.display = 'block'
    formData = {
        'query' : $('#invite-search').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type: "POST",
        url: "/team/"+teamName,
        data: formData,
    }).done(function(response_data) {
        if (formData.query === '') {
            document.querySelector('.search-result-container').style.display = 'none'
        }
        document.querySelector('.search-result-container').innerHTML = response_data.user_results

        if (response_data.user_results === undefined || response_data.user_results === '') {
            document.querySelector('.search-result-container').innerHTML = "<div style='color: black; padding: 0.5rem 1rem; margin: auto; font-size: 14px;'>We could not find any players matching your search. Maybe you already sent the invite or the player is already in your team</div>"
        }
    })
})

/* HANDLING INVITES */
$(document).on('submit','#player-checkbox', function(e) {
    e.preventDefault()
    
    let players = []
    $("input:checkbox[name=players]:checked").each(function(){
        players.push($(this).val());
    });
    formData = {
        'players[]' : players,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    document.querySelector('.create-team-modal-button').disabled=true
    $.ajax({
        type: "POST",
        url: window.location.href,
        data: formData,
    }).done(function(response_data) {
        modal.style.display = 'none'
        document.querySelector('#invite-search').value = ''
        document.querySelector('.search-result-container').innerHTML = ''
        notifyDiv.style.display = 'block'
	document.querySelector('.create-team-modal-button').disabled=true
        setTimeout(function(){ 
            notifyHead.innerHTML = 'Success :)'
            notifyMessage.innerHTML = response_data.message
            notifyDiv.style.right = '1rem' 
        }, 200);
    })
})

const teamUrl = document.querySelector('.team-name').innerHTML

/* FORM FOR SUBMITTING JOIN CODE FOR JOINING THE TEAM */
$(document).on('submit','.join-team-modal-form', function(e) {
    e.preventDefault();

    var formData = {
        'join_code': $('input[name=join-code').val(),
        'username': $('input[name=username-input').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: `/join-team/${teamUrl}`,
        data: formData,
    }).done(function(response_data) {
        
        setTimeout(function(){ 
           if (response_data.status === 0) {
               document.querySelector('.join-code-error').innerHTML = response_data.message
           }
           else if (response_data.status === 1) {
               joinModal.style.display = 'none'
               notifyDiv.style.display = 'block'
               setTimeout(() => {
                  notifyHead.innerHTML = 'Success!'
                  notifyDiv.style.right = '1rem'
                  notifyMessage.innerHTML = response_data.message
               }, 300)
               setTimeout(() => {
                  window.location.replace(window.location.href)
               }, 1000)
           }
        }, 200);
    })
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.team-back').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('.profile-back-save-btn').style.display = 'block'
            document.querySelector('.team-sec').style.marginTop = '3rem'
            document.querySelector('#profile-pic-label').style.pointerEvents = 'none'
            
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function profileReadURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.team-img').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('.profile-pic-save-btn').style.display = 'block'
            document.querySelector('.team-sec').style.marginTop = '3rem'
            document.querySelector('.img-label').style.pointerEvents = 'none'
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
        };

        reader.readAsDataURL(input.files[0]);
    }
}
