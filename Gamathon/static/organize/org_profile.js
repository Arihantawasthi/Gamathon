function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.querySelector('.background').style.backgroundImage = `url("${e.target.result}")`
            document.querySelector('.profile-back-save-btn').style.display = 'block'
            
           /*  $('#img-preview')
                .attr('src', e.target.result)
                .width(500)
                .height(200); */
        };

        reader.readAsDataURL(input.files[0]);
    }
}
