import express from 'express';
import Poll from '../models/Poll';
const router = express.Router();

router.get('/', (req, res)=> {
    Poll.find({})
        .populate('_author', 'local.username')
        .exec((err, polls)=> {
      if (err) throw err;
      res.json({polls});      
    });
  });

router.get('/:id', (req, res)=> {
  Poll.findOne({_id: req.params.id})
    .populate('_author', 'local.username')
    .exec((err, poll)=> {
    if (err) throw err;
    res.json({poll});
    res.end();
  });
});

router.put('/', (req, res)=> {
    Poll.findByIdAndUpdate(req.body.id, req.body.newPoll, {new: true}, (err)=> {
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
  console.log(req.body);
  Poll.create(req.body, (err, savedPoll)=> {
    if (err) throw err;
    Poll.populate(savedPoll, {path: '_author', select: '_id local.username'}, (err, populatedPoll) => {
      res.send(populatedPoll);
      res.end();
    });
  });
});

export default router;