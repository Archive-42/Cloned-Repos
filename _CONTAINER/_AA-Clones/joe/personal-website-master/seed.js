var models = require('./models');
var Project = models.Project;

Project.create([
    {
        title: 'Personal Website',
        collaborators: ['Julie Opperman', 'Mark Waldron'],
        image: 'puppy.jpeg'
    },
    {
        title: 'Joe Alves',
        image: 'me.jpg',
        collaborators: ['Joana Gomez', 'Joseph Alves']
    }
]).then(function (projects) {
    console.log('Done!');
}, function (err) {
    console.error(err);
});