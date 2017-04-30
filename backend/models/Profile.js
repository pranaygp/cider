let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProfileSchema = new Schema({
  name: String,
  classes: Array,

  // For use in a more advanced user auth system; not used for now!
  email: {
    type: String,
    required: false // Later set to "true"
  },
  friends: Array,
  facebookId: String,
  pictureURL: String,
  about: String,          // Facebook Profile About
  interestedIn: Array
});

module.exports = mongoose.model('Profile', ProfileSchema);