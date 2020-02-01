const line=document.querySelector('.line');const overview=document.querySelector('.overview');const teams=document.querySelector('.teams');const stats=document.querySelector('.stats');const games=document.querySelector('.games');const overviewSection=document.querySelector('.overview-section');const teamSection=document.querySelector('.teams-section');const statSection=document.querySelector('.stats-section');const gameSection=document.querySelector('.games-section');const friendBtn=document.querySelector('.friend-request-btn');const friend=document.querySelector('.friend');const modal=document.querySelector('.bg-create-team-modal');const createTeam=document.querySelector('.create-team-card');const modalClose=document.querySelector('.create-team-modal-close');const friendsCard=document.querySelectorAll('.friends-card')
teams.addEventListener('click',()=>{teams.style.opacity='1';overview.style.opacity='0.6';stats.style.opacity='0.6';games.style.opacity='0.6';line.style.transform="translate(6.1rem)";line.style.width="3.4rem";overviewSection.style.display='none';statSection.style.display='none';gameSection.style.display='none';teamSection.style.display='block';});overview.addEventListener('click',()=>{teams.style.opacity='0.6';overview.style.opacity='1';stats.style.opacity='0.6';games.style.opacity='0.6';line.style.transform="translate(0rem)";line.style.width="4.5rem";overviewSection.style.display='block';statSection.style.display='none';gameSection.style.display='none';teamSection.style.display='none';});stats.addEventListener('click',()=>{teams.style.opacity='0.6';overview.style.opacity='0.6';stats.style.opacity='1';games.style.opacity='0.6';line.style.transform="translate(10.8rem)";line.style.width="4.8rem";overviewSection.style.display='none';statSection.style.display='block';gameSection.style.display='none';teamSection.style.display='none';});games.addEventListener('click',()=>{teams.style.opacity='0.6';overview.style.opacity='0.6';stats.style.opacity='0.6';games.style.opacity='1';line.style.transform="translate(17.1rem)";line.style.width="3.5rem";overviewSection.style.display='none';statSection.style.display='none';gameSection.style.display='block';teamSection.style.display='none';});modalClose.addEventListener('click',()=>{modal.style.display='none';setTimeout(()=>{notifyDiv.style.display='none'},500)});if(document.querySelector('#sessionUser').innerHTML===document.querySelector('.profile-name').innerHTML){createTeam.addEventListener('click',()=>{modal.style.display='block';});}
var url=window.location.pathname;let followed=document.querySelector('.profile-name').innerHTML
$(document).on('submit','#follow-form',function(e){e.preventDefault();var formData={'followed':document.querySelector('.profile-name').innerHTML,'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/following/'+followed,data:formData,}).done(function(response_data){notifyDiv.style.display='block'
setTimeout(function(){notifyHead.innerHTML=response_data.status
notifyMessage.innerHTML=response_data.message
notifyDiv.style.right='1rem'
document.querySelector('.friend-request-btn').innerHTML='Following'
document.querySelector('.friend-request-btn').disabled=true
document.querySelector('.friend-request-btn').style.cursor='default'},200);})})
$(document).on('submit','#create-team-form',function(e){e.preventDefault();var formData={'team_name':$('input[name=team-name]').val(),'join_code':$('input[name=join-code]').val(),'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()}
$.ajax({type:'POST',url:'/profile/'+sessionUser.innerHTML,data:formData,}).done(function(response_data){notifyDiv.style.display='block'
setTimeout(function(){notifyHead.innerHTML=response_data.status
notifyMessage.innerHTML=response_data.message
notifyDiv.style.right='1rem'},200);})})
function readURL(input){if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=function(e){document.querySelector('.profile-back').style.backgroundImage=`url("${e.target.result}")`
document.querySelector('.profile-back-save-btn').style.display='block'
document.querySelector('#profile-pic-label').style.pointerEvents='none'};reader.readAsDataURL(input.files[0]);}}
function profileReadURL(input){if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=function(e){var data=reader.result;var node=$(".nodeCenter").css("background-image",'url('+data+')');var image=new Image();image.src=data;image.onload=function(){EXIF.getData(image,function(){var orientation=EXIF.getTag(this,"Orientation");switch(orientation){case 3:node.css('transform','rotate(180deg)');break;case 6:node.css('transform','rotate(90deg)');break;case 8:node.css('transform','rotate(-90deg)');break;}});};document.querySelector('.profile-img').style.backgroundImage=`url("${e.target.result}")`
document.querySelector('.profile-pic-save-btn').style.display='block'
document.querySelector('.img-label').style.pointerEvents='none'};reader.readAsDataURL(input.files[0]);}};const sideBar=document.querySelector('.sideBar');const mobNav=document.querySelector('.mobNav');const container=document.querySelector('.container');const carousel=document.querySelector('.carousel');const body=document.getElementsByTagName('body');const lowerLogin=document.querySelector('.lower-sec-login');const lowerProfile=document.querySelector('.lower-sec-profile');const session=document.querySelector('#session');const sessionUser=document.querySelector('#sessionUser');const notifyDiv=document.querySelector('.notify-div');const notifyHead=document.querySelector('.notify-heading-content');const notifyMessage=document.querySelector('.notify-message')
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