const teamRegisterModal = document.querySelector('.bg-validate-modal-teamRegister')
const teamForm = document.querySelector('.form1')
const teams = document.querySelectorAll('.team-names')

var url = window.location.pathname;
var tourid = url.substring(url.lastIndexOf('/')+1);
var team_name = ''

try {
    document.querySelector('.modal-heading-createTeam').addEventListener('click', () => {
        document.querySelector('.bg-create-team-modal').style.display = 'block'
        setTimeout(()=> {
            document.querySelector('.create-team-modal-content').style.transform = 'translate(0rem, 1rem)'
        }, 100)
    })
}
catch(e) {
    
}

document.querySelector('.create-team-modal-close').addEventListener('click', ()=> {
    setTimeout(()=> {
        document.querySelector('.bg-create-team-modal').style.display = 'none'
    }, 200)
    document.querySelector('.create-team-modal-content').style.transform = 'translate(0rem, -3rem)'
})

/* ---FORM TO REGISTERING TEAMS IN DATATBASE USING AJAX */
let route = document.querySelector('#sessionUser').innerHTML
$(document).on('submit','#create-team-form', function(e) {
    e.preventDefault();

    var formData = {
        'name': $('input[name=team-name]').val(),
        'password': $('input[name=join-code]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/profile/'+route,
        data: formData,
    }).done(function(response_data) {
        document.querySelector('.bg-create-team-modal').style.display = 'none';
        document.querySelector('.notify-div').style.display = 'block'
        setTimeout(function(){ 
            document.querySelector('.notify-heading-content').innerHTML = response_data.status
            document.querySelector('.notify-message').innerHTML = response_data.message
            document.querySelector('.notify-div').style.right = '1rem' 
        }, 200);
    })
})

/* GETTING PLAYERS OF THE TEAM */
$(document).on('submit', '#team-select', function(e) {
    e.preventDefault();
    for(let i =0; i < teams.length; i++) {
        if (teams[i].checked === true) {
            team_name = teams[i].value
        }
    }
    var formData = {
        'team-name': team_name,
        'request-type': $('input[name=request-type]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: 'http://127.0.0.1:8000/choose-team/registration/'+tourid,
        data: formData,
    }).done(function(response_data) {
        document.querySelector('.form1').style.transform = 'translate(-110%)'
        setTimeout(() => {
            document.querySelector('.form1').style.display = 'none'
        }, 200)
        document.querySelector('.form2').style.display = 'block'
        setTimeout(()=> {
            document.querySelector('.form2').style.transform = 'translate(0%)'
        },200)
        document.querySelector('.player-container-wrapper').innerHTML = response_data.message
    
        document.querySelector('.back-btn').addEventListener('click', ()=> {
            document.querySelector('.form2').style.transform = 'translate(110%)'
            setTimeout(()=> {
                document.querySelector('.form2').style.display = 'none'
                document.querySelector('.form1').style.display = 'block'
            },100)

            setTimeout(()=> {
                document.querySelector('.form1').style.transform = 'translate(0%)'
            }, 200)
        })
    })
})

/* TOURNEY REGISTRATION FORM FOR PAID TOURNAMENTS */
document.querySelector('.form2').onsubmit = ()=> {
    var players = document.querySelectorAll('.members-names')
    var selectedPlayers = []
    for(let i=0; i < players.length; i++) {
        if(players[i].checked === true) {
            selectedPlayers.push(players[i])
        }
    }
    if(selectedPlayers.length < 5) {
        return true
    }
    else {
        notifyDiv.style.display = 'block'
        setTimeout(()=> {
            document.querySelector('.notify-heading-content').innerHTML = 'Failed'
            document.querySelector('.notify-message').innerHTML = 'Team should have 5 members to play this tournament!'
            document.querySelector('.notify-div').style.right = '1rem'
        }, 200)
        return false
    }
}


/* ---FORM TO REGISTER TEAM NAME FOR FREE ENTRY USING USING AJAX */
$(document).on('submit','#player-select', function(e) {
    e.preventDefault();
    const members = document.querySelectorAll('.member-names')
    const team_name = document.querySelector('.team-name-input').value
    var selectedMembers = []
    for(let i = 0; i < members.length; i++){
        if (members[i].checked === true) {
            selectedMembers.push(members[i])
        }
    }

    if(selectedMembers.length > 5) {
        var formData = {
            'team_name': team_name,
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
        }
        $.ajax({
            type:'POST',
            url: 'http://127.0.0.1:8000/tournament/'+tourid,
            data: formData,
        }).done(function(response_data) {
            setTimeout(function(){ 
                if (response_data['status'] === 1) {
                    window.location.replace('http://127.0.0.1:8000/tournament/'+tourid)
                }
    
                else {
                    notifyDiv.style.display = 'block'
                    setTimeout(function(){ 
                        document.querySelector('.notify-heading-content').innerHTML = 'Failed'
                        document.querySelector('.notify-message').innerHTML = response_data['message']
                        document.querySelector('.notify-div').style.right = '1rem'
                    }, 200);
                }
            }, 200);
        })
    }
    else {
        notifyDiv.style.display = 'block'
        setTimeout(()=> {
            document.querySelector('.notify-heading-content').innerHTML = 'Failed'
            document.querySelector('.notify-message').innerHTML = 'Team should have 5 members to play this tournament!'
            document.querySelector('.notify-div').style.right = '1rem'
        }, 200)
    }
})