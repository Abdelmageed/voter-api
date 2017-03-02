import passport from 'passport';
import express from 'express';
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
  res.end('your account has been created');
});

router.get('/logout', (req, res)=> {
  req.logout();
  res.end();
});


export default router;