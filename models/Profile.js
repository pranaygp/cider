import mongoose from 'mongoose'

var profileSchema = mongoose.Schema({
  name: String,
  classes: Array
});

export default profileSchema