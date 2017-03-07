import passport from 'passport';
import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res)=> {
//  console.log(req.user.local.username);
  if(!req.user) {
    res.status(401);
    res.end();
  }
  let user = {
    id: req.user._id,
    username: req.user.local.username
  };
  res.json({user});
  res.end();
});

router.post('/signup', passport.authenticate('local-signup'), (req,res)=> {
  let user = {
    id: req.user._id,
    username: req.user.local.username
  };
  res.json({user});
  res.end();
});

router.get('/logout', (req, res)=> {
  req.logout();
  res.end();
});

router.post('/check_username/', (req, res)=> {
  User.findOne({'local.username': req.body.username}, (err, doc)=> {
    if (doc){
      console.log('invalid')
      res.send({valid: false});
    } else {
      console.log('valid');
      res.send({valid: true});
    }
    res.end();
  });
});

export default router;