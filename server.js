import express from 'express';
import passport from './passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import poll from './routers/poll';
import index from './routers/index';

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


app.use('/', index);
app.use('/poll', poll);

export default app;