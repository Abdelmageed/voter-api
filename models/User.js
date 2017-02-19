import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   username: { 
     type: String,
     required: true,
     index: { unique: true }
   },
    password: { 
      type: String,
      required: true
    }
});

UserSchema.pre('save', function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    user.password = hash;
    next();
  });
});

UserSchema.methods.validatePassword = function(password) {
  return (bcrypt.compareSync(password, this.password))?
    {isMatch: true} : {error: 'wrong password'};
}

export default mongoose.model('User', UserSchema);