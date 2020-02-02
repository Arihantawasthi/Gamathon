const teamRegisterModal=document.querySelector('.bg-validate-modal-teamRegister')
const teamForm=document.querySelector('.form1')
const teams=document.querySelectorAll('.team-names')
var url=window.location.pathname;var tourid=url.substring(url.lastIndexOf('/')+1);var team_name=''
try{document.querySelector('.modal-heading-createTeam').addEventListener('click',()=>{document.querySelector('.bg-create-team-modal').style.display='block'
setTimeout(()=>{document.querySelector('.create-team-modal-content').style.transform='translate(0rem, 1rem)'},100)})}
catch(e){}
document.querySelector('.create-team-modal-close').addEventListener('click',()=>{setTimeout(()=>{document.querySelector('.bg-create-team-modal').style.display='none'},200)
document.querySelector('.create-team-modal-content').style.transform='translate(0rem, -3rem)'})
let route=document.querySelector('#sessionUser').innerHTML
$(document).on('submit','#create-team-form',function(e){e.preventDefault();var formData={'name':$('input[name=team-name]').val(),'password':$('input[name=join-code]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/profile/'+route,data:formData,}).done(function(response_data){document.querySelector('.bg-create-team-modal').style.display='none';document.querySelector('.notify-div').style.display='block'
setTimeout(function(){document.querySelector('.notify-heading-content').innerHTML=response_data.status
document.querySelector('.notify-message').innerHTML=response_data.message
document.querySelector('.notify-div').style.right='1rem'},200);})})
$(document).on('submit','#team-select',function(e){e.preventDefault();for(let i=0;i<teams.length;i++){if(teams[i].checked===true){team_name=teams[i].value}}
var formData={'team-name':team_name,'request-type':document.querySelector('input[name="request-type"]').value,'csrfmiddlewaretoken':document.querySelector('input[name="csrfmiddlewaretoken"]').value,}
$.ajax({type:'POST',url:'https://gamathon.gg/choose-team/registration/'+tourid,data:formData,}).done(function(response_data){document.querySelector('.form1').style.transform='translate(-110%)'
setTimeout(()=>{document.querySelector('.form1').style.display='none'},200)
document.querySelector('.form2').style.display='block'
setTimeout(()=>{document.querySelector('.form2').style.transform='translate(0%)'},200)
document.querySelector('.player-container-wrapper').innerHTML=response_data.message
document.querySelector('.back-btn').addEventListener('click',()=>{document.querySelector('.form2').style.transform='translate(110%)'
setTimeout(()=>{document.querySelector('.form2').style.display='none'
document.querySelector('.form1').style.display='block'},100)
setTimeout(()=>{document.querySelector('.form1').style.transform='translate(0%)'},200)})})})
$(document).on('submit',"#team-register",function(e){e.preventDefault();let players=document.querySelectorAll('.member-names')
var selectedPlayers=[]
for(let i=0;i<players.length;i++){if(players[i].checked===true){selectedPlayers.push(players[i].value)}}
if(selectedPlayers.length>=4&&selectedPlayers.length<=5){var formData={'request-type':'register','team-name':document.querySelector('.team-name-input').value,'selectedPlayers[]':selectedPlayers,'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
console.log(formData)
$.ajax({type:"POST",url:'https://gamathon.gg/choose-team/registration/'+tourid,data:formData,}).done(function(response_data){setTimeout(function(){window.location.replace('https://gamathon.gg/teamPaidRegistration/'+formData['team-name']+'/'+tourid)},100)})}
else{notifyDiv.style.display='block'
setTimeout(()=>{document.querySelector('.notify-heading-content').innerHTML='Failed'
document.querySelector('.notify-message').innerHTML='Team should have at least 4 members to play this tournament!'
document.querySelector('.notify-div').style.right='1rem'},200)
return false}})
$(document).on('submit','#player-select',function(e){e.preventDefault();const members=document.querySelectorAll('.member-names')
const team_name=document.querySelector('.team-name-input').value
var selectedMembers=[]
for(let i=0;i<members.length;i++){if(members[i].checked===true){selectedMembers.push(members[i].value)}}
if(selectedMembers.length>=4&&selectedMembers.length<=5){var formData={'team_name':team_name,'selected_members[]':selectedMembers,'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
console.log(formData)
$.ajax({type:'POST',url:'https://gamathon.gg/tournament/'+tourid,data:formData,}).done(function(response_data){setTimeout(function(){if(response_data['status']===1){window.location.replace('https://gamathon.gg/tournament/'+tourid)}
else{notifyDiv.style.display='block'
setTimeout(function(){document.querySelector('.notify-heading-content').innerHTML='Failed'
document.querySelector('.notify-message').innerHTML=response_data['message']
document.querySelector('.notify-div').style.right='1rem'},200);}},200);});}
else{notifyDiv.style.display='block'
setTimeout(()=>{document.querySelector('.notify-heading-content').innerHTML='Failed'
document.querySelector('.notify-message').innerHTML='Team should have at least 4 members to play this tournament!'
document.querySelector('.notify-div').style.right='1rem'},200)}});const sideBar=document.querySelector('.sideBar');const mobNav=document.querySelector('.mobNav');const container=document.querySelector('.container');const carousel=document.querySelector('.carousel');const body=document.getElementsByTagName('body');const lowerLogin=document.querySelector('.lower-sec-login');const lowerProfile=document.querySelector('.lower-sec-profile');const session=document.querySelector('#session');const sessionUser=document.querySelector('#sessionUser');const notifyDiv=document.querySelector('.notify-div');const notifyHead=document.querySelector('.notify-heading-content');const notifyMessage=document.querySelector('.notify-message')
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
document.querySelector('.search-result-team').innerHTML=response_data.team_term}
if(document.querySelector('.search-result-user').innerHTML===''){document.querySelector('.search-result-user').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Homie with that username exists in this hood.</li>'}
if(document.querySelector('.search-result-tourney').innerHTML===''){document.querySelector('.search-result-tourney').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Tournament with that name exists in this hood.</li>'}
if(document.querySelector('.search-result-game').innerHTML===''){document.querySelector('.search-result-game').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Game with that name exists in this hood.</li>'}
if(document.querySelector('.search-result-team').innerHTML===''){document.querySelector('.search-result-team').innerHTML='<li style="font-size: 14px; font-weight: normal;">No Team with that name exists in this hood.</li>'}
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