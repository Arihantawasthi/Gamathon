const continueBtn = document.querySelector('.continue-btn');
const modal = document.querySelector('.bg-wallet-modal');
const modalContent = document.querySelector('.wallet-modal-content')
const modalClose = document.querySelector('.wallet-modal-close');
const lolo = document.querySelector('.notify-div')

continueBtn.addEventListener('click', ()=> {
    modal.style.display = 'block';
    setTimeout(() => {
        modalContent.style.transform = 'translate(0rem, 0rem)'
    }, 100)
});

modalClose.addEventListener('click', ()=> {
    modalContent.style.transform = 'translate(0rem, -5rem)'
    setTimeout(() => {
        modal.style.display = 'none';
    }, 100)
});