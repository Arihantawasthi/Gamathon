const validateModal = document.querySelector('.bg-validate-modal');
const register = document.querySelector('.tourney-register')
const registered = document.querySelector('.tourney-registered');
const validation = document.querySelector('.tourney-register-validate');
const validateContent = document.querySelector('.validate-modal-content')
const validateClose = document.querySelector('.validate-modal-close');
const shareBtn = document.querySelector('.copyLink');
const overview = document.querySelector('.overview');
const ladder = document.querySelector('.ladder');
const rules = document.querySelector('.rules');
const schedule = document.querySelector('.schedule');
const prizes = document.querySelector('.prizes');
const players = document.querySelector('.players');
const sessionStatus = document.querySelector('#session');
const ladderCont = document.querySelector('.ladder-content');
const prizesCont = document.querySelector('.prizes-content');
const playersCont = document.querySelector('.players-content');
const scheduleContent = document.querySelector('.schedule-content');
const rulesCont = document.querySelector('.rules-content');
const overviewCont = document.querySelector('.overview-container');
const tracker = document.querySelector('.line4');
const login = document.querySelector('#tourney-login-modal');
const tourneyLoginContent = document.querySelector('#tourney-login-modal-content')
const loginClose = document.querySelector('#tourney-login-modal-close');
const userExists = document.querySelector('#user-exists')
const userJoined = document.querySelector('#user-joined')
const notify = document.querySelector('.notify-div')
const joinForm = document.querySelector('#tour-registration')
const teamRegister = document.querySelector('.tourney-register-team')
const loginWarning = document.querySelector('.loginWarning')

function myFunction() {
    var copyText = document.getElementById("shareLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}
try {
    validation.addEventListener('click', () => {
        validateModal.style.display = 'block';
        setTimeout(() => {
            validateContent.style.transform = 'translate(0rem, 0rem)'
        }, 100)
    })
} catch(e) {}
 
if (sessionStatus.innerHTML === 'True') {
    try {
        register.addEventListener('click', function() {
            try {
            validateModal.style.display = 'block';
            setTimeout(() => {
                validateContent.style.transform = 'translate(0rem, 0rem)'
            }, 100)
        } catch(e) {}
        });  
    } catch(e) {}  
}
else {
    try {
        register.addEventListener('click', function() {
            login.style.display = 'block';
            setTimeout(() => {
                tourneyLoginContent.style.transform = 'translate(0rem, -2rem)'
            }, 100)
        }); 
    } catch(e) {}
}

loginClose.addEventListener('click', () => {
    tourneyLoginContent.style.transform = 'translate(0rem, -5rem)'
    setTimeout(() => {
        login.style.display = 'none';
    }, 100)
})

try {
    validateClose.addEventListener('click', function() {
        validateContent.style.transform = 'translate(0rem, -5rem)'
        setTimeout(() => {
            validateModal.style.display = 'none';
        }, 100)
    });
}
catch(e) {}

shareBtn.addEventListener('click', function() {
    myFunction();
});

/* ladder.addEventListener('click', function() {
    ladder.style.opacity = '1';
    $('.ladder-content').fadeIn();
    overview.style.opacity = '0.6';
    $('.overview-container').fadeOut();
    rules.style.opacity = '0.6';
    $('.rules-content').fadeOut();
    prizes.style.opacity = '0.6'
    $('.prizes-content').fadeOut();
    schedule.style.opacity = '0.6'
    $('.schedule-content').fadeOut();
    players.style.opacity = '0.6';
    $('.players-content').fadeOut();
    tracker.style.transform = 'translate(6rem)';
    tracker.style.width = '4rem';
}); */

overview.addEventListener('click', function() {
    ladder.style.opacity = '0.6';
    $('.ladder-content').fadeOut();
    overview.style.opacity = '1';
    $('.overview-container').fadeIn();
    rules.style.opacity = '0.6';
    $('.rules-content').fadeOut();
    prizes.style.opacity = '0.6'
    $('.prizes-content').fadeOut();
    schedule.style.opacity = '0.6'
    $('.schedule-content').fadeOut();
    players.style.opacity = '0.6';
    $('.players-content').fadeOut();
    tracker.style.transform = 'translate(0)';
    tracker.style.width = '4.8rem';
});

rules.addEventListener('click', function() {
    ladder.style.opacity = '0.6';
    $('.ladder-content').fadeOut();
    overview.style.opacity = '0.6';
    $('.overview-container').fadeOut();
    rules.style.opacity = '1';
    $('.rules-content').fadeIn();
    prizes.style.opacity = '0.6'
    $('.prizes-content').fadeOut();
    schedule.style.opacity = '0.6'
    $('.schedule-content').fadeOut();
    players.style.opacity = '0.6';
    $('.players-content').fadeOut();
    tracker.style.transform = 'translate(26.8rem)';
    tracker.style.width = '3.2rem';
});

prizes.addEventListener('click', function() {
    ladder.style.opacity = '0.6';
    $('.ladder-content').fadeOut();
    overview.style.opacity = '0.6';
    $('.overview-container').fadeOut();
    rules.style.opacity = '0.6';
    $('.rules-content').fadeOut();
    prizes.style.opacity = '1'
    $('.prizes-content').fadeIn();
    schedule.style.opacity = '0.6';
    $('.schedule-content').fadeOut();
    players.style.opacity = '0.6';
    $('.players-content').fadeOut();
    tracker.style.transform = 'translate(16.1rem)';
    tracker.style.width = '3.5rem';
});

schedule.addEventListener('click', function() {
    ladder.style.opacity = '0.6';
    ladderCont.style.display = 'none';
    overview.style.opacity = '0.6';
    overviewCont.style.display = 'none';
    rules.style.opacity = '0.6';
    rulesCont.style.display = 'none';
    prizes.style.opacity = '0.6';
    prizesCont.style.display = 'none'
    schedule.style.opacity = '1'
    scheduleContent.style.display = 'block'
    players.style.opacity = '0.6';
    playersCont.style.display = 'none';
    tracker.style.transform = 'translate(20.7rem)';
    tracker.style.width = '5rem';
});

/* players.addEventListener('click', function() {
    ladder.style.opacity = '0.6';
    ladderCont.style.display = 'none';
    overview.style.opacity = '0.6';
    overviewCont.style.display = 'none';
    rules.style.opacity = '0.6';
    rulesCont.style.display = 'none';
    prizes.style.opacity = '0.6'
    prizesCont.style.display = 'none'
    schedule.style.opacity = '0.6'
    scheduleContent.style.display = 'none'
    players.style.opacity = '1';
    playersCont.style.display = 'block';
    tracker.style.transform = 'translate(11.1rem)';
    tracker.style.width = '4.2rem';
}); */

var url = window.location.pathname;
var tourid = url.substring(url.lastIndexOf('/')+1);

/* ---FORM TO LOGIN USER USING AJAX */
$(document).on('submit','#login-form-tourney', function(e) {
    e.preventDefault();

    var formData = {
        'username': $('input[name=loginUsernamet]').val(),
        'password': $('input[name=loginPasst]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/login',
        data: formData,
    }).done(function(response_data) {
        if (response_data.status === 0) {
            loginWarning.style.display = 'block'
            loginWarning.innerHTML = response_data.message
        }
        else {
            localStorage.setItem('fire', true)
            localStorage.setItem('recordHead', response_data['status'])
            localStorage.setItem('recordMessage', response_data['message'])
            window.location.reload()
            /* login.style.display = 'none';
            notifyDiv.style.display ='block'
            setTimeout(function() { 
                notifyHead.innerHTML = response_data.status
                notifyMessage.innerHTML = response_data.message

                if (response_data.sessionLogged_in === true) {
                    lowerLogin.style.display = 'none'
                    lowerProfile.style.display = 'block'
                    notifyHead.innerHTML = response_data['status']
                    notifyMessage.innerHTML = response_data['message']
                    notifyDiv.style.right = '1rem'
                }
                else {
                    lowerLogin.style.display = 'block'
                    lowerProfile.style.display = 'none'
                }
                notifyDiv.style.right = '1rem' 
            }, 200); */
        }
    })
})

let gamename = document.querySelector('#game')

/* ---FORM TO VALIDATE USER WITH A GAME USING AJAX */
$(document).on('submit','#account-validate-form', function(e) {
    e.preventDefault();

    var formData = {
        'gameid': $('input[name=game_id]').val(),
        'changed': 'False',
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    document.querySelector('.validate-modal-button').disabled=true;
    $.ajax({
        type:'POST',
        url: '/game/'+gamename.innerHTML,
        data: formData,
    }).done(function(response_data) {
        localStorage.setItem('fire', true)
        localStorage.setItem('recordHead', response_data['status'])
        localStorage.setItem('recordMessage', response_data['message'])
        window.location.reload()
        /* validateModal.style.display = 'none';
        notifyDiv.style.display = 'block'
        setTimeout(function(){ 
            notifyHead.innerHTML = response_data['status']
            notifyMessage.innerHTML = response_data['message']
            notifyDiv.style.right = '1rem'
        }, 200); */
    })
})

/* ---FORM TO REGISTER USER USING AJAX */
$(document).on('submit','#tour-registration-entry', function(e) {
    e.preventDefault();

    var formData = {
        'amount': $('input[name=entry-fee').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/tournament/'+tourid,
        data: formData,
    }).done(function(response_data) {
        if (response_data['status'] === 1) {
            localStorage.setItem('registerFire', true)
            localStorage.setItem('recordHead', 'Success :)')
            localStorage.setItem('recordMessage', response_data['message'])
            window.location.reload()
        }
        else {
            notifyDiv.style.display = 'block'
            setTimeout(() => {
                notifyHead.innerHTML = 'Failed :('
                notifyMessage.innerHTML = 'Something went wrong!'
                notifyDiv.style.right = '1rem'
            }, 200)
        }
        /* notifyDiv.style.display = 'block'
        setTimeout(function(){ 
            if (response_data['status'] === 1) {
                notifyHead.innerHTML = 'Success'
                notifyMessage.innerHTML = response_data.message
                notifyDiv.style.height = '5.7rem'
                notifyDiv.style.right = '1rem'

		setTimeout(() => {
			window.location.reload()
		}, 100)

                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
            else {
                notifyHead.innerHTML = 'Failed'
                notifyMessage.innerHTML = 'Something went wrong'
                notifyDiv.style.right = '1rem'
            }
        }, 200); */
    })
})

if(localStorage.getItem('registerFire')) {
    document.querySelector('.notify-div').style.display = 'block'
    document.querySelector('.notify-heading-content').innerHTML = localStorage.getItem('recordHead')
    document.querySelector('.notify-message').innerHTML = localStorage.getItem('recordMessage')
    document.querySelector('.notify-div').style.height = '5.7rem'
    window.onload = () => {
        setTimeout(() => {
            document.querySelector('.notify-div').style.right = '1rem'
        }, 200)
    }
    localStorage.removeItem('registerFire')
    localStorage.removeItem('recordHead')
    localStorage.removeItem('recordMessage')
}

/* LADDER SEARCH */
const searchFun = () => {
    let filter = document.querySelector('#participants-search-bar').value.toUpperCase();
    let table = document.querySelector('.top-team-table')
    let elements = table.querySelectorAll('.top-team-element')

    for (let i=0; i < elements.length; i++) {
        let name = elements[i].querySelector('.participant-name')
        if(name) {
            let textValue = name.innerText
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                elements[i].style.display = ""
            } else {
                elements[i].style.display = 'none';
            }
        }
    }
}

/* PARTICIPANTS SEARCH */
const searchPlayersFun = () => {
    let filter = document.querySelector('#players-search-bar').value.toUpperCase();
    let table = document.querySelector('.players-card-wrapper')
    let elements = document.querySelectorAll('.players-card')

    for (let i=0; i < elements.length; i++) {
        let name = elements[i].querySelector('.player-name')
        if (name) {
            let textValue = name.innerText
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                elements[i].style.display = ""
            } else {
                elements[i].style.display = 'none';
            } 
        }
    }
}

/* Generating the notification when team registers the tournament
   coming from -> choose_team.js 
   local storage variables -> registerTeam, recordHead, recordMessage */
if(localStorage.getItem('registerTeam')) {
    document.querySelector('.notify-div').style.display = 'block'
    document.querySelector('.notify-heading-content').innerHTML = localStorage.getItem('recordHead')
    document.querySelector('.notify-message').innerHTML = localStorage.getItem('recordMessage')
    document.querySelector('.notify-div').style.height = '5.7rem'
    window.onload = () => {
        setTimeout(() => {
            document.querySelector('.notify-div').style.right = '1rem'
        })
    }
    localStorage.removeItem('registerTeam')
    localStorage.removeItem('recordHead')
    localStorage.removeItem('recordMessage')
}

/* Timer */

// Set the date we're counting down to
var countDownDate = new Date(document.querySelector('.datetime').innerHTML).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "Registration Closed!";
  }
}, 1000);

$(document).on('click', '.ladder', () => {
    ladder.style.opacity = '1';
    $('.ladder-content').fadeIn();
    overview.style.opacity = '0.6';
    $('.overview-container').fadeOut();
    rules.style.opacity = '0.6';
    $('.rules-content').fadeOut();
    prizes.style.opacity = '0.6'
    $('.prizes-content').fadeOut();
    schedule.style.opacity = '0.6'
    $('.schedule-content').fadeOut();
    players.style.opacity = '0.6';
    $('.players-content').fadeOut();
    tracker.style.transform = 'translate(6rem)';
    tracker.style.width = '4rem';

    $.ajax({
        type: "GET",
        url: window.location.href + '/ladder',  // URL to your view that serves new info
    })
    .done(function(response) {
        document.querySelector('.ladder-content').innerHTML = response;
    });
})

$(document).on('change', '#phases-select', () => {
    var formData = {
        'stage_name': $('#phases-select').val()
    }
    $.ajax({
        type: "GET",
        url: window.location.href + '/ladder',
        data: formData
    })
    .done(function(response) {
        document.querySelector('.break-point').innerHTML = response
    })
})

$(document).on('change', '#groups-select', () => {
    var formData = {
        'stage_name': $('#phases-select').val(),
        'group_name': $('#groups-select').val(),
        'match_name': $('#matches-select').val()
    }
    $.ajax({
        type: "GET",
        url: window.location.href + '/generate-ladder',
        data: formData
    })
    .done(function(response) {
        document.querySelector('.top-team-table').innerHTML = response
    })
})

$(document).on('change', '#matches-select', () => {
    var formData = {
        'stage_name': $('#phases-select').val(),
        'group_name': $('#groups-select').val(),
        'match_name': $('#matches-select').val()
    }
    $.ajax({
        type: "GET",
        url: window.location.href + '/generate-ladder',
        data: formData
    })
    .done(function(response) {
        document.querySelector('.top-team-table').innerHTML = response;
    });
})
