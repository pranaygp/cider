let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProfileSchema = new Schema({
  name: String,
  classes: Array,

  // For use in a more advanced user auth system; not used for now!
  email: {
    type: String,
    unique: true,
    required: false // Later set to "true"
  },
  
  hash: String,
  salt: String
});

module.exports = mongoose.model('Profile', ProfileSchema);