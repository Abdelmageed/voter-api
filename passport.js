import User from './models/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import config from './config';
const localStrategy = LocalStrategy.Strategy;

passport.use(new localStrategy((username, password, done)=> {
//    return done (null, "nothing");
  mongoose.connect(config.DATA_URL, ()=> {
    console.log('connected to mongodb');
  });
  User.findOne({'local.username': username}, (err, user)=> {
    if (err) return done(err);
    
    
    if(!user) {
      console.log('user was not found');
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
      
      if (user) return done(null, false, 'username already in use');
      
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

passport.serializeUser((user, done)=> {
  done(null, user.id);
});

passport.deserializeUser((id, done)=> {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

export default passport;