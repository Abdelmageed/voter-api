import express from 'express';
import Poll from '../models/Poll';
import config from '../config';
const router = express.Router();

router.get('/', (req, res)=> {
    Poll.find({}, (err, polls)=> {
      if (err) throw err;
      res.send(polls);
      
    })
  })

router.put('/', (req, res)=> {
    Poll.findByIdAndUpdate(req.params.id, req.params.newPoll, (err, newPoll)=> {
      if (err) throw err;
      res.end();
    })
})

export default router;