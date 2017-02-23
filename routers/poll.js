import express from 'express';
import Poll from '../models/Poll';
import config from '../config';
const router = express.Router();

router.get('/', (req, res)=> {
    Poll.find({}, (err, polls)=> {
      if (err) throw err;
      res.send(polls);
      
    })
  });

router.get('/:id', (req, res)=> {
  Poll.find({_id: req.params.id}, (err, poll)=> {
    if (err) throw err;
    res.send(poll);
    res.end();
  })
});

router.put('/', (req, res)=> {
    Poll.findByIdAndUpdate(req.params.id, req.params.newPoll, (err, newPoll)=> {
      if (err) throw err;
      res.end();
    })
});

router.delete('/:id', (req, res)=> {
  Poll.remove({_id: req.params.id}, (err)=> {
    if (err) throw err;
    res.end();
  })
});

router.post('/', (req, res)=> {
  Poll.create(req.body.poll, (err, savedPoll)=> {
    if (err) throw err;
    res.send(savedPoll);
    res.end();
  });
});

export default router;