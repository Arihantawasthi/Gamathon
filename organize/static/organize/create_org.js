const line = document.querySelector('.indicator-line')
const basicTab = document.querySelector('.basic')
const infoTab = document.querySelector('.info')
const form1 = document.querySelector('.form1')
const btn1 = document.querySelector('.next-btn')
const form2 = document.querySelector('.form2')
const footer = document.querySelector('.footer')

infoTab.addEventListener('click', () => {
    if (document.querySelector('.name-input').value.length >= 5 && document.querySelector('.name-warning-unavailable').innerHTML.length === 0) {
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
    }
    else if (document.querySelector('.name-warning-unavailable').innerHTML.length !== 0) {
        btn1.disabled = true
        document.querySelector('.name-warning').innerHTML = 'Name should be at least 5 characters long'
    }
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
    if (document.querySelector('.name-input').value.length >= 5 && document.querySelector('.name-warning-unavailable').innerHTML.length === 0) {
        btn1.disable = false
        btn1.style.cursor = 'pointer'
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
    }
    else if(document.querySelector('.name-warning-unavailable').innerHTML.length !== 0) {
        btn1.disabled = true
        infoTab.style.cursor = 'not-allowed'
        btn1.style.pointerEvent = 'none'
        document.querySelector('.name-warning').innerHTML = 'Name should be at least 5 characters long'
    }
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

/* FORM TO CHECK WHETHER USERNAME IS AVAILABLE */
$('.name-input').keyup(function() {
    formData = {
        'query' : $('.name-input').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    }

    document.querySelector('.name-warning-unavailable').style.display = 'none'
    document.querySelector('.name-warning-available').style.display = 'none'
    btn1.disabled = true
    btn1.style.cursor = 'not-allowed'
    infoTab.style.cursor = 'not-allowed'
    infoTab.style.pointerEvent = 'none'

    if ($('.name-input').val().length >= 5) {
        $.ajax({
            type: "POST",
            url: "/name-check",
            data: formData,
        }).done(function(response_data) {
            if ($('.name-input').val().length <= 5) {
                document.querySelector('.name-warning-unavailable').style.display = 'none'
                document.querySelector('.name-warning-available').style.display = 'none'
                btn1.disabled = true
                btn1.style.cursor = 'not-allowed'
                infoTab.style.cursor = 'not-allowed'
                infoTab.style.pointerEvent = 'none'
            }
            if (response_data.status === 0) {
                document.querySelector('.name-warning-unavailable').style.display = 'block'
                document.querySelector('.name-warning-available').style.display = 'none'
                document.querySelector('.name-warning-available').innerHTML = ''
                document.querySelector('.name-warning-unavailable').innerHTML = '<i class="fa fa-times" style="margin-right: 0.2rem"></i>'+response_data.message
                document.querySelector('.name-warning-unavailable').style.color = 'red'
                btn1.disabled = true
                btn1.style.cursor = 'not-allowed'
                infoTab.style.cursor = 'not-allowed'
                infoTab.style.pointerEvent = 'none'
            }
            else if (response_data.status === 1) {
                document.querySelector('.name-warning-unavailable').style.display = 'none'
                document.querySelector('.name-warning-unavailable').innerHTML = ''
                document.querySelector('.name-warning-available').style.display = 'block'
                document.querySelector('.name-warning-available').innerHTML = '<i class="fa fa-check" style="margin-right: 0.2rem"></i>'+response_data.message
                btn1.style.cursor = 'pointer'
                infoTab.style.cursor = 'pointer'
                infoTab.style.pointerEvent = 'auto'
                document.querySelector('.name-warning-available').style.color = 'green'
            }
        })
    }
})