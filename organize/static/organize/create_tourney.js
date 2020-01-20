const line = document.querySelector('.line4')
const setup = document.querySelector('.setup')
const info = document.querySelector('.info')
const settings = document.querySelector('.settings')
const manage = document.querySelector('.manage')
const brackInfo = document.querySelector('.bracket-info')
const brackIcon = document.querySelector('.fa-info-circle')
const closeInfo = document.querySelector('.close-info')
const setupSection = document.querySelector('.setup-section')
const infoSection = document.querySelector('.info-section')
const settingSection = document.querySelector('.settings-section')
const manageSection = document.querySelector('.manage-section')
const scheduleArea = document.querySelector('.schedule-area')
const prizeArea = document.querySelector('.prize-area')
const footer = document.querySelector('.footer')
const nextBtn = document.querySelector('.next')
const nextBtn2 = document.querySelector('.next-btn')
const backBtn = document.querySelector('.back')
const submitBtn = document.querySelector('#submit-btn')
const emailBtn = document.querySelector('.email-btn')

info.addEventListener('click', () => {
    manageSection.style.display = 'none'
    setupSection.style.display = 'none'
    settingSection.style.display = 'none'
    infoSection.style.display = 'block'
    setTimeout(() => {
        setup.style.opacity = '0.6'
        info.style.opacity = '1'
        settings.style.opacity = '0.6'
        manage.style.opacity = '0.6'
        line.style.transform = 'translate(4rem)'
        line.style.width = '2.2rem'
        infoSection.style.transform = 'translate(0%)'
        setupSection.style.transform = 'translate(-110%)'
        settingSection.style.transform = 'translate(110%)'
        manageSection.style.transform = 'translate(110%)'
        footer.style.marginTop = '95rem'
    }, 100)
})

setup.addEventListener('click', () => {
    manageSection.style.display = 'none'
    setupSection.style.display = 'block'
    settingSection.style.display = 'none'
    infoSection.style.display = 'none'
    setTimeout(() => {
        setup.style.opacity = '1'
        info.style.opacity = '0.6'
        settings.style.opacity = '0.6'
        manage.style.opacity = '0.6'
        line.style.transform = 'translate(0rem)'
        line.style.width = '2.8rem'
        infoSection.style.transform = 'translate(110%)'
        setupSection.style.transform = 'translate(0%)'
        settingSection.style.transform = 'translate(110%)'
        manageSection.style.transform = 'translate(110%)'
        footer.style.marginTop = '0rem'
    }, 100)
})

settings.addEventListener('click', () => {
    manageSection.style.display = 'none'
    setupSection.style.display = 'none'
    settingSection.style.display = 'block'
    infoSection.style.display = 'none'
    setTimeout(() => {
        setup.style.opacity = '0.6'
        info.style.opacity = '0.6'
        settings.style.opacity = '1'
        manage.style.opacity = '0.6'
        line.style.transform = 'translate(7.3rem)'
        line.style.width = '4.2rem'
        settingSection.style.transform = 'translate(0%)'
        setupSection.style.transform = 'translate(-110%)'
        infoSection.style.transform = 'translate(-110%)'
        manageSection.style.transform = 'translate(110%)'
        footer.style.marginTop = '55rem'
    }, 100)
})

manage.addEventListener('click', () => {
    manageSection.style.display = 'block'
    setupSection.style.display = 'none'
    settingSection.style.display = 'none'
    infoSection.style.display = 'none'
    setTimeout(() => {
        setup.style.opacity = '0.6'
        info.style.opacity = '0.6'
        settings.style.opacity = '0.6'
        manage.style.opacity = '1'
        line.style.transform = 'translate(12.6rem)'
        line.style.width = '4rem'
        manageSection.style.transform = 'translate(0%)'
        settingSection.style.transform = 'translate(-110%)'
        setupSection.style.transform = 'translate(-110%)'
        infoSection.style.transform = 'translate(-110%)'
        footer.style.marginTop = '35rem'
    }, 100)
})

nextBtn.addEventListener('click', () => {
    manageSection.style.display = 'none'
    setupSection.style.display = 'none'
    settingSection.style.display = 'none'
    infoSection.style.display = 'block'
    setTimeout(() => {
        setup.style.opacity = '0.6'
        info.style.opacity = '1'
        settings.style.opacity = '0.6'
        manage.style.opacity = '0.6'
        line.style.transform = 'translate(4rem)'
        line.style.width = '2.2rem'
        infoSection.style.transform = 'translate(0%)'
        setupSection.style.transform = 'translate(-110%)'
        settingSection.style.transform = 'translate(110%)'
        manageSection.style.transform = 'translate(110%)'
        footer.style.marginTop = '95rem'
    }, 100)
})

nextBtn2.addEventListener('click', () => {
    manageSection.style.display = 'none'
    setupSection.style.display = 'none'
    settingSection.style.display = 'block'
    infoSection.style.display = 'none'
    setTimeout(() => {
        setup.style.opacity = '0.6'
        info.style.opacity = '0.6'
        settings.style.opacity = '1'
        manage.style.opacity = '0.6'
        line.style.transform = 'translate(7.3rem)'
        line.style.width = '4.2rem'
        settingSection.style.transform = 'translate(0%)'
        setupSection.style.transform = 'translate(-110%)'
        infoSection.style.transform = 'translate(-110%)'
        manageSection.style.transform = 'translate(110%)'
        footer.style.marginTop = '55rem'
    }, 100)
})

brackIcon.addEventListener('click', () => {
    brackInfo.style.display = 'block'
})

closeInfo.addEventListener('click', () => {
    brackInfo.style.display = 'none'
})

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.fa-camera').style.display = 'none'
            document.querySelector('.img-label').innerHTML = '<div id="img-preview"></div>'
            document.querySelector('#img-preview').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('#img-preview').style.width = '80%;'
            document.querySelector('#img-preview').style.height = '10rem'
            document.querySelector('#img-preview').style.backgroundSize = 'contain'
            document.querySelector('#img-preview').style.backgroundRepeat = 'no-repeat'
            document.querySelector('#img-preview').style.marginTop = '0rem'
            
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
        };

        reader.readAsDataURL(input.files[0]);
    }
}

var regPlayersInput = document.querySelector('.reg-players-input')
var noOfGroups = document.querySelector('.no-of-groups')
var roundWrapper = document.querySelector('.round-wrapper')
var roundDisplayContainer = document.querySelector('.rounds-display-container')
var noOfWinners = document.querySelectorAll('.no-of-winners-input')
var totalTeams = parseInt(regPlayersInput.value)
var groupsLeft = parseInt(totalTeams) / 20
var nextDiv = `<div class="round-number-head" style="position: relative;">
<div class="arrow-right" style="position: absolute;"></div>
Round <span class="round-number">1</span>
</div>
<div class="current-status-container">
<div class="current-status-groups">Note: This is round will have <span class="no-of-groups">5</span> groups with 20 participants each.</div>
<div class="no-of-winners-container">
    <div class="no-of-winners-head">Number of winners to qualify from each group</div>
    <input type="number" name='round1-winners-number' class="no-of-winners-input" placeholder="No. of winners from each group.">
</div>
</div>`

function getMaxRounds() {
    var max_rounds = Math.ceil(Math.log2(parseInt(regPlayersInput.value)/10))
    return max_rounds
}

regPlayersInput.oninput = () => {
    if (parseInt(regPlayersInput.value) % 20 !== 0) {
        document.querySelector('.total-groups-note').style.display = 'block'
        roundDisplayContainer.style.display = 'none'
        roundWrapper.style.display = 'none'
    }
    else {
        roundDisplayContainer.style.display = 'block'
        roundWrapper.style.display = 'block'
        noOfGroups.innerHTML = parseInt(regPlayersInput.value)/20
        groupsLeft = parseInt(noOfGroups.innerHTML)
        console.log(getMaxRounds())
        var roundWrappers = $('.round-wrapper')
        for(let i=1; i<roundWrappers.length; i++) {
            roundWrappers[i].remove()
        }
    }
}

noOfWinners[0].oninput = () => {
    console.log((noOfWinners[0].value*groupsLeft)) 
    if (parseInt(noOfWinners[0].value) <= parseInt(10) && (noOfWinners[0].value*groupsLeft) % 20 === 0) {
        nextDiv = `<div class='round-wrapper' style='display: block;'>
        <div class="round-number-head" style="position: relative;">
        <div class="arrow-right" style="position: absolute;"></div>
        Round <span class="round-number">${2}</span>
        </div>
        <div class="current-status-container">
        <div class="current-status-groups">Note: This round will have <span class="no-of-groups">${parseInt(noOfWinners[0].value*groupsLeft / 20)}</span> groups with 20 participants each.</div>
        <div class="no-of-winners-container">
            <div class="no-of-winners-head">Number of winners to qualify from each group</div>
            <input type="number" name='round1-winners-number' class="no-of-winners-input" placeholder="No. of winners from each group.">
        </div>
        </div></div>`
        $('.rounds-display-container').append(nextDiv)
    }

    else {
        $('.round-wrapper')[1].remove()
    }
}