import User from './models/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from './config';
const localStrategy = LocalStrategy.Strategy;

passport.use(new localStrategy((username, password, done)=> {
  User.findOne({'local.username': username}, (err, user)=> {
    if (err) return done(err);
    
    
    if(!user) {
      return done(null, false, {message: 'wrong username'});
    }
    
    if(user.validatePassword(password).error){
      return done(null, false, {message: 'wrong password'});
    }
    
    return done (null, user);
  });
}));

passport.use('local-signup', new LocalStrategy((username, password, done)=> {
    
    User.findOne({'local.username': username}, (err, user)=> {
      
      if (err) return done(err);
      
      if (user) return done(null, false, {message: 'username already in use'});
      
      let newUser = new User({
        local: {
          username,
          password
        }
      });
      
      newUser.save((err, newUser)=> {
        if (err) return done(err);
        return done(null, newUser);
      })
    })
  }))

//passport.serializeUser((user, done)=> {
//  done(null, user.id);
//});
//
//passport.deserializeUser((id, done)=> {
//  User.findById(id, function(err, user) {
//    done(err, user);
//  });
//});

export default passport;