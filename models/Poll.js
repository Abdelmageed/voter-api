import mongoose from 'mongoose';
import config from '../config';
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  name: String,
  votes: [String]
});

const PollSchema = new Schema({
  name: String,
  options: [OptionSchema],
  _author: { type: Schema.Types.ObjectId, ref: 'User' } 
});

export default mongoose.model('Poll', PollSchema);