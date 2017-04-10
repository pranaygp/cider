let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: String,
    code: String
});

module.exports = mongoose.model('Course', CourseSchema);