import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  local: {
    username: String,
    password: String
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password')) return next();

  bcrypt.hash(user.local.password, null, null, function (err, hash) {
    if (err) return next(err);

    // override the cleartext password with the hashed one
    user.local.password = hash;
    next();
  });
});

UserSchema.methods.validatePassword = function (password) {
  return (bcrypt.compareSync(password, this.local.password)) ? {
    isMatch: true
  } : {
    error: 'wrong password'
  };
}

export default mongoose.model('User', UserSchema);
