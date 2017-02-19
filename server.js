import express from 'express';
import passport from './passport';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

app.post('/login', passport.authenticate('local', {session: false}), (req, res)=> {
  res.end(req.user);
//  res.end();
})

app.get('/', (req, res)=> {
  res.end('Hello');
})

//app.post('/login', (req, res)=> {
//  res.end('authenticated');
//})

export default app;