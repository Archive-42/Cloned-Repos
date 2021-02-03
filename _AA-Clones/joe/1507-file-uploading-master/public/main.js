var inputDomElement = document.getElementById('file-input');
var imageDomElement = document.getElementById('the-image');

inputDomElement.addEventListener('change', function (e) {

    var file = inputDomElement.files[0];

    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
        imageDomElement.src = reader.result;
        $.ajax({
            method: 'POST',
            url: '/upload',
            data: {
                name: file.name,
                data: reader.result
            }
        });
    };

});