import mongoose from 'mongoose';
import config from '../config';
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  name: String,
  votes: Number
});

const PollSchema = new Schema({
  name: String,
  options: [OptionSchema],
  _author: { type: Schema.Types.ObjectId, ref: 'User' } 
});

PollSchema.methods.create = (newPoll, cb)=> {
    const model = new Poll(newPoll);
    model.save((err, poll)=> {
      return cb(err, poll);
    });
}

PollSchema.methods.update = (id, newPoll, cb)=> {
    Poll.findByIdAndUpdate(id, newPoll, cb);
}

export default mongoose.model('Poll', PollSchema);