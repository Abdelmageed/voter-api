import User from './models/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';
const localStrategy = LocalStrategy.Strategy;

passport.use(new localStrategy((username, password, done)=> {
  User.findOne({username}, (err, user)=> {
    if (err) return done(err);
    
    if(!user) {
      return done(null, false, 'wrong username');
    }
    
    if(user.validatePassword(password).error){
      return done(null, false, 'wrong password');
    }
    
    return done (null, user);
  });
}));

export default passport;