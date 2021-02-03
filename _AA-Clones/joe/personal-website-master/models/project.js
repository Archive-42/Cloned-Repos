var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    collaborators: {
        type: [String]
    },
    githubLink: {
        type: String
    }
});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project;