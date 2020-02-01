const line = document.querySelector('.indicator-line')
const basicTab = document.querySelector('.basic')
const infoTab = document.querySelector('.info')
const form1 = document.querySelector('.form1')
const btn1 = document.querySelector('.next-btn')
const form2 = document.querySelector('.form2')
const footer = document.querySelector('.footer')

infoTab.addEventListener('click', () => {
    line.style.transform = 'translate(4.3rem)'
    line.style.width = '6.2rem'
    infoTab.style.opacity = '1'
    basicTab.style.opacity = '0.6'
    form1.style.transform = 'translate(-110%, 0)'
    form2.style.display = 'block'
    setTimeout(() => {
        form2.style.transform = 'translate(0, 0)'
    },200)
    footer.style.marginTop = '20rem'
})

basicTab.addEventListener('click', () => {
    line.style.transform = 'translate(0rem)'
    line.style.width = '2.7rem'
    infoTab.style.opacity = '0.6'
    basicTab.style.opacity = '1'
    form1.style.transform = 'translate(0, 0)'
    form2.style.transform = 'translate(110%, 0)'
    setTimeout(() => {
        form2.style.display = 'none'
    },200)
    footer.style.marginTop = '0rem'
})

btn1.addEventListener('click', () => {
    line.style.width = '6.2rem'
    line.style.transform = 'translate(4.3rem)'
    infoTab.style.opacity = '1'
    basicTab.style.opacity = '0.6'
    form1.style.transform = 'translate(-110%, 0)'
    form2.style.display = 'block'
    setTimeout(() => {
        form2.style.transform = 'translate(0, 0)'
    },200)
    footer.style.marginTop = '20rem'
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
            document.querySelector('#img-preview').style.marginTop = '-3.5rem'
            
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
        };

        reader.readAsDataURL(input.files[0]);
    }
}