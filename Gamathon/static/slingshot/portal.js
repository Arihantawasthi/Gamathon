document.onreadystatechange = function () {
    var state = document.readyState
    document.getElementById('loading-hud').style.display="block"
    document.querySelector('.loading-wrapper').style.display = 'block'
    if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('interactive');
            $('#loading-hud').fadeOut()
            $('.loading-wrapper').fadeOut()
        },500);
    }
}

const options = {
    treshold: 0,
    rootMargin: "0px 0px 0px 0px"
}

const objects = document.querySelectorAll('.anim')

observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `anim1 1s ${entry.target.dataset.delay} forwards ease-out`
        }
        else {
            entry.target.style.animation = 'none'
        }
    })
}, options)

objects.forEach(object => {
    observer.observe(object)
})

document.querySelector('.april-fool').addEventListener('click', () => {
    document.querySelector('audio').play()
})