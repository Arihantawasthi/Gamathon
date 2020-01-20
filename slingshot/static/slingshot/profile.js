const line = document.querySelector('.line');
const overview = document.querySelector('.overview');
const teams = document.querySelector('.teams');
const stats = document.querySelector('.stats');
const games = document.querySelector('.games');
const overviewSection = document.querySelector('.overview-section');
const teamSection = document.querySelector('.teams-section');
const statSection = document.querySelector('.stats-section');
const gameSection = document.querySelector('.games-section');
const friendBtn = document.querySelector('.friend-request-btn');
const friend = document.querySelector('.friend');
const modal = document.querySelector('.bg-create-team-modal');
const createTeam = document.querySelector('.create-team-card');
const modalClose = document.querySelector('.create-team-modal-close');
const sessionName = document.querySelector('#sessionUser')
const friendsCard = document.querySelectorAll('.friends-card')


teams.addEventListener('click', ()=> {
    teams.style.opacity = '1';
    overview.style.opacity = '0.6';
    stats.style.opacity = '0.6';
    games.style.opacity = '0.6';
    line.style.transform= "translate(6.1rem)";
    line.style.width = "3.4rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'none';
    gameSection.style.display = 'none';
    teamSection.style.display = 'block';
});

overview.addEventListener('click', ()=> {
    teams.style.opacity = '0.6';
    overview.style.opacity = '1';
    stats.style.opacity = '0.6';
    games.style.opacity = '0.6';
    line.style.transform= "translate(0rem)";
    line.style.width = "4.5rem";
    overviewSection.style.display = 'block';
    statSection.style.display = 'none';
    gameSection.style.display = 'none';
    teamSection.style.display = 'none';
});

stats.addEventListener('click', ()=> {
    teams.style.opacity = '0.6';
    overview.style.opacity = '0.6';
    stats.style.opacity = '1';
    games.style.opacity = '0.6';
    line.style.transform= "translate(10.8rem)";
    line.style.width = "4.8rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'block';
    gameSection.style.display = 'none';
    teamSection.style.display = 'none';
});

games.addEventListener('click', ()=> {
    teams.style.opacity = '0.6';
    overview.style.opacity = '0.6';
    stats.style.opacity = '0.6';
    games.style.opacity = '1';
    line.style.transform= "translate(17.1rem)";
    line.style.width = "3.5rem";
    overviewSection.style.display = 'none';
    statSection.style.display = 'none';
    gameSection.style.display = 'block';
    teamSection.style.display = 'none';
});

modalClose.addEventListener('click', ()=> {
    modal.style.display = 'none';
    setTimeout(() => {
        notifyDiv.style.display = 'none'
    }, 500)
});

if (sessionUser.innerHTML === document.querySelector('.profile-name').innerHTML){
    createTeam.addEventListener('click', ()=> {
    modal.style.display = 'block';
    });
}

var url = window.location.pathname;

/* ---FORM FOR FOLLOWING USERS USING AJAX */
let followed = document.querySelector('.profile-name').innerHTML
$(document).on('submit','#follow-form', function(e) {
    e.preventDefault();

    var formData = {
        'followed': document.querySelector('.profile-name').innerHTML,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }
    $.ajax({
        type:'POST',
        url: '/following/'+followed,
        data: formData,
    }).done(function(response_data) {
        notifyDiv.style.display = 'block'
        setTimeout(function(){ 
            notifyHead.innerHTML = response_data.status
            notifyMessage.innerHTML = response_data.message
            notifyDiv.style.right = '1rem' 
            document.querySelector('.friend-request-btn').innerHTML = 'Following'
            document.querySelector('.friend-request-btn').disabled = true
            document.querySelector('.friend-request-btn').style.cursor = 'default'
        }, 200);
    })
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.profile-back').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('.profile-back-save-btn').style.display = 'block'
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
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
            var data = reader.result;
            var node = $( ".nodeCenter" ).css( "background-image", 'url(' + data + ')' );
                var image = new Image();
                image.src = data;
                image.onload = function() {
                EXIF.getData(image, function() {
                    var orientation = EXIF.getTag(this, "Orientation");
                    switch(orientation) {
                    case 3:
                        node.css('transform', 'rotate(180deg)');
                        break;
                    case 6:
                        node.css('transform', 'rotate(90deg)');
                        break;
                    case 8:
                        node.css('transform', 'rotate(-90deg)');
                        break;
                    }
                });
            };
            document.querySelector('.profile-img').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('.profile-pic-save-btn').style.display = 'block'
            document.querySelector('.img-label').style.pointerEvents = 'none'
        };

        reader.readAsDataURL(input.files[0]);
    }
}