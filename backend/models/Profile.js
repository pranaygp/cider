import mongoose from 'mongoose'

export default mongoose.Schema({
  name: String,
  classes: Array
});