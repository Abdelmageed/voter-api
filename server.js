import express from 'express';
import passport from './passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import poll from './routers/poll';
import index from './routers/index';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
                }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.options('*', cors())

app.use('/', index);
app.use('/poll', poll);

// serve client side code.
app.use('/',express.static('client'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

export default app;