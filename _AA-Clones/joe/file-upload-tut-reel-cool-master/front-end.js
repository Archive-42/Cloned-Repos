var theFileInput = document.getElementById('file-input');
var theImage = document.getElementById('the-image');

theFileInput.addEventListener('change', function (e) {

    var file = theFileInput.files[0];
    var reader = new FileReader();

    console.log(file);

    reader.readAsDataURL(file);

    reader.onloadend = function () {
        $.ajax({
            method: 'POST',
            url: '/upload-image',
            data: {
                name: file.name,
                data: reader.result
            }
        });
    };

});