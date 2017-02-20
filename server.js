import express from 'express';
import passport from './passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
                }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res)=> {
  res.end('logged in successfuly');
});

app.post('/signup', passport.authenticate('local-signup'), (req,res)=> {
  res.end('your account has been created');
});

export default app;