const validateModal=document.querySelector('.bg-validate-modal');const register=document.querySelector('.tourney-register')
const registered=document.querySelector('.tourney-registered');const validation=document.querySelector('.tourney-register-validate');const validateContent=document.querySelector('.validate-modal-content')
const validateClose=document.querySelector('.validate-modal-close');const shareBtn=document.querySelector('.copyLink');const overview=document.querySelector('.overview');const ladder=document.querySelector('.ladder');const rules=document.querySelector('.rules');const schedule=document.querySelector('.schedule');const prizes=document.querySelector('.prizes');const players=document.querySelector('.players');const sessionStatus=document.querySelector('#session');const ladderCont=document.querySelector('.ladder-content');const prizesCont=document.querySelector('.prizes-content');const playersCont=document.querySelector('.players-content');const scheduleContent=document.querySelector('.schedule-content');const rulesCont=document.querySelector('.rules-content');const overviewCont=document.querySelector('.overview-container');const tracker=document.querySelector('.line4');const login=document.querySelector('#tourney-login-modal');const tourneyLoginContent=document.querySelector('#tourney-login-modal-content')
const loginClose=document.querySelector('#tourney-login-modal-close');const userExists=document.querySelector('#user-exists')
const userJoined=document.querySelector('#user-joined')
const notify=document.querySelector('.notify-div')
const joinForm=document.querySelector('#tour-registration')
const teamRegister=document.querySelector('.tourney-register-team')
const loginWarning=document.querySelector('.loginWarning')
function myFunction(){var copyText=document.getElementById("shareLink");copyText.select();copyText.setSelectionRange(0,99999)
document.execCommand("copy");}
try{validation.addEventListener('click',()=>{validateModal.style.display='block';setTimeout(()=>{validateContent.style.transform='translate(0rem, 0rem)'},100)})}catch(e){}
if(sessionStatus.innerHTML==='True'){try{register.addEventListener('click',function(){try{validateModal.style.display='block';setTimeout(()=>{validateContent.style.transform='translate(0rem, 0rem)'},100)}catch(e){}});}catch(e){}}
else{try{register.addEventListener('click',function(){login.style.display='block';setTimeout(()=>{tourneyLoginContent.style.transform='translate(0rem, -2rem)'},100)});}catch(e){}}
loginClose.addEventListener('click',()=>{tourneyLoginContent.style.transform='translate(0rem, -5rem)'
setTimeout(()=>{login.style.display='none';},100)})
try{validateClose.addEventListener('click',function(){validateContent.style.transform='translate(0rem, -5rem)'
setTimeout(()=>{validateModal.style.display='none';},100)});}
catch(e){}
shareBtn.addEventListener('click',function(){myFunction();});ladder.addEventListener('click',function(){ladder.style.opacity='1';ladderCont.style.display='block';overview.style.opacity='0.6';overviewCont.style.display='none';rules.style.opacity='0.6';rulesCont.style.display='none';prizes.style.opacity='0.6'
prizesCont.style.display='none'
schedule.style.opacity='0.6'
scheduleContent.style.display='none'
players.style.opacity='0.6';playersCont.style.display='none';tracker.style.transform='translate(6rem)';tracker.style.width='4rem';});overview.addEventListener('click',function(){ladder.style.opacity='0.6';ladderCont.style.display='none';overview.style.opacity='1';overviewCont.style.display='block';rules.style.opacity='0.6';rulesCont.style.display='none';prizes.style.opacity='0.6'
prizesCont.style.display='none'
schedule.style.opacity='0.6'
scheduleContent.style.display='none'
players.style.opacity='0.6';playersCont.style.display='none';tracker.style.transform='translate(0)';tracker.style.width='4.8rem';});rules.addEventListener('click',function(){ladder.style.opacity='0.6';ladderCont.style.display='none';overview.style.opacity='0.6';overviewCont.style.display='none';rules.style.opacity='1';rulesCont.style.display='block';prizes.style.opacity='0.6'
prizesCont.style.display='none'
schedule.style.opacity='0.6'
scheduleContent.style.display='none'
players.style.opacity='0.6';playersCont.style.display='none';tracker.style.transform='translate(26.8rem)';tracker.style.width='3.2rem';});prizes.addEventListener('click',function(){ladder.style.opacity='0.6';ladderCont.style.display='none';overview.style.opacity='0.6';overviewCont.style.display='none';rules.style.opacity='0.6';rulesCont.style.display='none';prizes.style.opacity='1'
prizesCont.style.display='block'
schedule.style.opacity='0.6';scheduleContent.style.display='none';players.style.opacity='0.6';playersCont.style.display='none';tracker.style.transform='translate(16.1rem)';tracker.style.width='3.5rem';});schedule.addEventListener('click',function(){ladder.style.opacity='0.6';ladderCont.style.display='none';overview.style.opacity='0.6';overviewCont.style.display='none';rules.style.opacity='0.6';rulesCont.style.display='none';prizes.style.opacity='0.6';prizesCont.style.display='none'
schedule.style.opacity='1'
scheduleContent.style.display='block'
players.style.opacity='0.6';playersCont.style.display='none';tracker.style.transform='translate(20.7rem)';tracker.style.width='5rem';});players.addEventListener('click',function(){ladder.style.opacity='0.6';ladderCont.style.display='none';overview.style.opacity='0.6';overviewCont.style.display='none';rules.style.opacity='0.6';rulesCont.style.display='none';prizes.style.opacity='0.6'
prizesCont.style.display='none'
schedule.style.opacity='0.6'
scheduleContent.style.display='none'
players.style.opacity='1';playersCont.style.display='block';tracker.style.transform='translate(11.1rem)';tracker.style.width='4.2rem';});var url=window.location.pathname;var tourid=url.substring(url.lastIndexOf('/')+1);$(document).on('submit','#login-form-tourney',function(e){e.preventDefault();var formData={'username':$('input[name=loginUsernamet]').val(),'password':$('input[name=loginPasst]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/login',data:formData,}).done(function(response_data){if(response_data.status===0){loginWarning.style.display='block'
loginWarning.innerHTML=response_data.message}
else{login.style.display='none';notifyDiv.style.display='block'
setTimeout(function(){notifyHead.innerHTML=response_data.status
notifyMessage.innerHTML=response_data.message
if(response_data.sessionLogged_in===true){lowerLogin.style.display='none'
lowerProfile.style.display='block'
notifyHead.innerHTML=response_data['status']
notifyMessage.innerHTML=response_data['message']
notifyDiv.style.right='1rem'}
else{lowerLogin.style.display='block'
lowerProfile.style.display='none'}
notifyDiv.style.right='1rem'},200);}})})
let gamename=document.querySelector('#game')
$(document).on('submit','#account-validate-form',function(e){e.preventDefault();var formData={'gameid':$('input[name=game_id]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/game/'+gamename.innerHTML,data:formData,}).done(function(response_data){validateModal.style.display='none';notifyDiv.style.display='block'
setTimeout(function(){notifyHead.innerHTML=response_data['status']
notifyMessage.innerHTML=response_data['message']
notifyDiv.style.right='1rem'},200);})})
$(document).on('submit','#tour-registration-entry',function(e){e.preventDefault();var formData={'amount':$('input[name=entry-fee').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/tournament/'+tourid,data:formData,}).done(function(response_data){notifyDiv.style.display='block'
setTimeout(function(){if(response_data['status']===1){notifyHead.innerHTML='Success'
notifyMessage.innerHTML=response_data.message
notifyDiv.style.height='5.7rem'
notifyDiv.style.right='1rem'}
else{notifyHead.innerHTML='Failed'
notifyMessage.innerHTML='Something went wrong'
notifyDiv.style.right='1rem'}},200);})})
const searchFun=()=>{let filter=document.querySelector('#participants-search-bar').value.toUpperCase();let table=document.querySelector('.top-team-table')
let elements=table.querySelectorAll('.top-team-element')
for(let i=0;i<elements.length;i++){let name=elements[i].querySelector('.participant-name')
if(name){let textValue=name.innerText
if(textValue.toUpperCase().indexOf(filter)>-1){elements[i].style.display=""}else{elements[i].style.display='none';}}}}
const searchPlayersFun=()=>{let filter=document.querySelector('#players-search-bar').value.toUpperCase();let table=document.querySelector('.players-card-wrapper')
let elements=document.querySelectorAll('.players-card')
for(let i=0;i<elements.length;i++){let name=elements[i].querySelector('.player-name')
if(name){let textValue=name.innerText
if(textValue.toUpperCase().indexOf(filter)>-1){elements[i].style.display=""}else{elements[i].style.display='none';}}}};const sideBar=document.querySelector('.sideBar');const mobNav=document.querySelector('.mobNav');const container=document.querySelector('.container');const carousel=document.querySelector('.carousel');const body=document.getElementsByTagName('body');const lowerLogin=document.querySelector('.lower-sec-login');const lowerProfile=document.querySelector('.lower-sec-profile');const session=document.querySelector('#session');const sessionUser=document.querySelector('#sessionUser');const notifyDiv=document.querySelector('.notify-div');const notifyHead=document.querySelector('.notify-heading-content');const notifyMessage=document.querySelector('.notify-message')
const notifyClose=document.querySelector('.notify-close');const warning=document.querySelector('.warning')
const navClose=document.querySelector('.nav-close')
const notificationTrigger=document.querySelector('.notifications')
const notificationContainer=document.querySelector('.notification-box')
const mobileNotification=document.querySelector('.mobile-notification')
const notificationClose=document.querySelector('.notification-close')
const loginModal=document.querySelector('.bg-login-modal');const loginContent=document.querySelector('.login-modal-content')
const loginModalClose=document.querySelector('.modal-close');const registerModal=document.querySelector('.bg-register-modal');const registerContent=document.querySelector('.register-modal-content')
const regModalClose=document.querySelector('.reg-modal-close');const forgetPass=document.querySelector('.forget-pass-container')
const forgetPassModal=document.querySelector('.bg-recover-modal')
const forgetPassModalContent=document.querySelector('.recover-modal-content')
const loginInstead=document.querySelector('.login-instead-container')
const loginBtn=document.querySelector('.login-btn');const signUpBtn=document.querySelector('.signup-btn');const pass=document.querySelector('#pass');const confPass=document.querySelector('#conf-pass');const passWarn=document.querySelector('.pass-warning');loginInstead.addEventListener('click',()=>{loginModal.style.display='block'
forgetPassModal.style.display='none'
setTimeout(()=>{loginModal.style.display='translate(0, 0)'},100)})
forgetPass.addEventListener('click',()=>{loginModal.style.display='none'
setTimeout(()=>{forgetPassModal.style.display='block'},100)
setTimeout(()=>{forgetPassModalContent.style.transform='translate(0, -1.6rem)'},200)})
document.querySelector('.recover-modal-close').addEventListener('click',()=>{setTimeout(()=>{forgetPassModalContent.style.transform='translate(0, 0)'},100)
setTimeout(()=>{forgetPassModal.style.display='none'},200)})
if(session.innerHTML===""){document.querySelector('.notification-wrapper').style.display='none'}
mobileNotification.addEventListener('click',()=>{notificationContainer.style.transform='translate(0rem)'
notificationContainer.style.width='90%'
setTimeout(function(){notificationContainer.style.height='90%'},350)})
notificationTrigger.addEventListener('click',()=>{notificationContainer.style.transform='translate(15rem)'
notificationContainer.style.height='20rem'
notificationContainer.style.width='40rem'})
notificationClose.addEventListener('click',()=>{notificationContainer.style.transform='translate(-40rem)'
notificationContainer.style.height='0rem'
notificationContainer.style.width='0rem'})
container.addEventListener('click',()=>{notificationContainer.style.transform='translate(-40rem)'
notificationContainer.style.height='0rem'
notificationContainer.style.width='0rem'})
document.querySelector('.hamburger').addEventListener('click',function(){sideBar.style.display='block';setTimeout(()=>{sideBar.style.transform='translate(0%, 0%)'
setTimeout(()=>{navClose.style.transform='rotate(360deg)'},200)},100)
container.style.opacity='0.8';container.addEventListener('click',function(){navClose.style.transform='rotate(360deg)'
sideBar.style.transform='translate(-100%, 0%)'
setTimeout(()=>{sideBar.style.display='none';},300)
container.style.opacity='1';});navClose.addEventListener('click',function(){navClose.style.transform='rotate(-360deg)'
setTimeout(()=>{sideBar.style.transform='translate(-100%, 0%)'},400)
setTimeout(()=>{sideBar.style.display='none';},500)
container.style.opacity='1';});carousel.addEventListener('click',function(){sideBar.style.transform='translate(-100%, 0%)'
setTimeout(()=>{sideBar.style.display='none';},300)
container.style.opacity='1';});});loginBtn.addEventListener('click',function(){loginModal.style.display='block';setTimeout(()=>{loginContent.style.transform='translate(0rem, -2rem)'},100)})
loginModalClose.addEventListener('click',function(){loginContent.style.transform='translate(0rem, -5rem)'
setTimeout(()=>{loginModal.style.display='none';},200)});signUpBtn.addEventListener('click',function(){registerModal.style.display='block';setTimeout(()=>{registerContent.style.transform='translate(0rem, 0rem)'},100)})
regModalClose.addEventListener('click',function(){registerContent.style.transform='translate(0rem, -5rem)'
setTimeout(()=>{registerModal.style.display='none';},200)})
if(session.innerHTML==='True'){lowerLogin.style.display='none'
lowerProfile.style.display='block'
document.querySelector('.my-profile').href=`/profile/${sessionUser.innerHTML}`
document.querySelector('.acc-settings').href=`/profile-settings/${sessionUser.innerHTML}`
document.querySelector('.wallet').href=`/wallet/${sessionUser.innerHTML}`}
else{lowerLogin.style.display='block'
lowerProfile.style.display='none'
document.querySelector('.my-profile').href="#"
document.querySelector('.acc-settings').href="#"
document.querySelector('.wallet').href="#"}
notifyClose.addEventListener('click',()=>{notifyDiv.style.right='-100%';setTimeout(function(){notifyDiv.style.display='none'
window.location.reload()},500)})
$('#reg-username').keyup(function(){formData={'query':$('#reg-username').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
document.querySelector('.username-warning-unavailable').style.display='none'
document.querySelector('.username-warning-available').style.display='none'
if(formData.query.length>4){$.ajax({type:"POST",url:"/usernameCheck",data:formData,}).done(function(response_data){if($('#reg-username').val().length<5){document.querySelector('.username-warning-unavailable').style.display='none'
document.querySelector('.username-warning-available').style.display='none'}
if(response_data.status===0){document.querySelector('.username-warning-unavailable').style.display='block'
document.querySelector('.username-warning-available').style.display='none'
document.querySelector('.username-warning-unavailable').innerHTML='<i class="fa fa-times" style="margin-right: 0.2rem"></i>'+response_data.message
document.querySelector('.username-warning-unavailable').style.color='red'}
else if(response_data.status===1){document.querySelector('.username-warning-unavailable').style.display='none'
document.querySelector('.username-warning-available').style.display='block'
document.querySelector('.username-warning-available').innerHTML='<i class="fa fa-check" style="margin-right: 0.2rem"></i>'+response_data.message
document.querySelector('.username-warning-available').style.color='green'}})}})
$(document).on('submit','#reg-form',function(e){e.preventDefault();var formData={'name':$('input[name=name]').val(),'username':$('input[name=username]').val(),'password':$('input[name=pass]').val(),'email':$('input[name=emails]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/signup',data:formData,}).done(function(response_data){registerModal.style.display='none';notifyDiv.style.display='block'
setTimeout(()=>{sideBar.style.display='none';},300)
container.style.opacity='1';document.querySelector('body').style.overflowY='auto'
setTimeout(function(){notifyHead.innerHTML=response_data.status
notifyMessage.innerHTML=response_data.message
notifyDiv.style.right='1rem'},200);})})
$(document).on('submit','#login-form',function(e){e.preventDefault();var formData={'username':$('input[name=loginUsername]').val(),'password':$('input[name=loginPass]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/login',data:formData,}).done(function(response_data){if(response_data.status===0){warning.style.display='block'
warning.innerHTML=response_data.message}
else{loginModal.style.display='none';notifyDiv.style.display='block'
setTimeout(function(){notifyHead.innerHTML=response_data.status
notifyMessage.innerHTML=response_data.message
sessionUser.innerHTML=formData['username']
if(response_data.sessionLogged_in===true){lowerLogin.style.display='none'
lowerProfile.style.display='block'
document.querySelector('.my-profile').href=`/profile/${sessionUser.innerHTML}`
document.querySelector('.acc-settings').href=`/profile-settings/${sessionUser.innerHTML}`
document.querySelector('.wallet').href=`/wallet/${sessionUser.innerHTML}`
navClose.style.transform='rotate(720deg)'
container.style.opacity='1';}
else{lowerLogin.style.display='block'
lowerProfile.style.display='none'
document.querySelector('.my-profile').href="#"
document.querySelector('.acc-settings').href="#"
document.querySelector('.wallet').href="#"}
notifyDiv.style.right='1rem'},200);}})})
container.addEventListener('click',()=>{document.querySelector('#search-results').style.display='none'})
$('#search-input').keyup(function(){document.querySelector('#search-results').style.display='block'
formData={'query':$('#search-input').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:"POST",url:"/search_results",data:formData,}).done(function(response_data){if(response_data.user_term!==undefined&&formData.query!==''){$('#search-results').fadeIn()
document.querySelector('.search-result-user').innerHTML=response_data.user_term
document.querySelector('.search-result-tourney').innerHTML=response_data.tour_term
document.querySelector('.search-result-game').innerHTML=response_data.game_term
document.querySelector('.search-result-org').innerHTML=response_data.org_term}
if(document.querySelector('.search-result-user').innerHTML===''){document.querySelector('.search-result-user').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Homie with that username exists in this hood.</li>'}
if(document.querySelector('.search-result-tourney').innerHTML===''){document.querySelector('.search-result-tourney').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Tournament with that name exists in this hood.</li>'}
if(document.querySelector('.search-result-game').innerHTML===''){document.querySelector('.search-result-game').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Game with that name exists in this hood.</li>'}
if(document.querySelector('.search-result-org').innerHTML===''){document.querySelector('.search-result-org').innerHTML='<li style="font-size: 14px; font-weight: normal;">No organization with that name exists in this hood.</li>'}
if(formData.query===''){$('#search-results').fadeOut()}
container.addEventListener('click',()=>{document.querySelector('#search-results').style.display='none'})})})
$(document).on('submit','#invite-form',function(e){e.preventDefault();var formData={'status':$("input[id=status]").val(),'team_name':$("input[id=team-name]").val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/team/'+formData.team_name,data:formData,}).done(function(response_data){notificationContainer.style.transform='translate(-40rem)'
notificationContainer.style.height='0rem'
notificationContainer.style.width='0rem'
notifyDiv.style.display='block'
setTimeout(()=>{notifyHead.innerHTML='Success :)'
notifyMessage.innerHTML=response_data.message
notifyDiv.style.right='1rem'},200)})})
$(document).on('submit','#recover-form',function(e){e.preventDefault();var formData={'email':$('input[id=recover-email]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/forgot-password',data:formData,}).done(function(response_data){if(response_data.status===1){document.querySelector('.recover-pass-btn').disabled=true
document.querySelector('.recover-pass-btn').style.display='none'
document.querySelector('#recover-email').style.display='none'
document.querySelector('.recover-desc').innerHTML=response_data.message
document.querySelector('.recover-desc').style.marginBottom='1rem'
document.querySelector('.recover-modal-content').style.paddingBottom='1rem'
document.querySelector('.warning-icon').style.display='none'
document.querySelector('.recover-warning').style.display='none'
document.querySelector('.fa-envelope').style.display='none'}
else if(response_data.status===0){document.querySelector('.recover-warning').style.display='block'
document.querySelector('.recover-warning').innerHTML=response_data.message}})})
document.onreadystatechange=function(){var state=document.readyState
document.getElementById('loading-hud').style.display="block"
document.querySelector('.loading-wrapper').style.display='block'
if(state=='complete'){setTimeout(function(){document.getElementById('interactive');$('#loading-hud').fadeOut()
$('.loading-wrapper').fadeOut()},0);}};$('#pass, #conf-pass').on('keyup',function(){if($('#pass').val()==$('#conf-pass').val()){$('.pass-warning').html('Matching').css('color','green');}else
$('.pass-warning').html("Passwords doesn't match!").css('color','red');});;