const e = require('express');
const express = require('express');
const Posts = require("./postDb");


const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({
      message: error.message
    })
  })
});

router.get('/:id', validatePostId, (req, res) => { // validatePostId
  // do your magic!
  res.status(200).json(req.post);

});

router.post('/', (req, res) => { // validatePost
  // do your magic!
});

router.delete('/:id', validatePostId, (req, res) => { //validatePostId
  // do your magic!
  Posts.remove(req.params.id)
  .then(count => {
    res.status(200).json({message: 'post has been deleted'})
  })
  .catch(error => {
    res.status(500).json({
      message: error.message
    })
  })
});

router.put('/:id', validatePostId, (req, res) => { // validatePostId
  // do your magic!

  Posts.update(req.params.id, req.body)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'The post cannot be found'})
    }
  })
  .catch(error => {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!

  const { id } = req.params

  Posts.getById(id)
  .then(data => {
    if (data) {
      req.post = data

      next()
    } else {
      res.status(400).json({message: 'there is no post with id ' + id})
    }
  })
  .catch(error => {
    console.log(error.message)
    // res.status(500).json({ message: 'something bad happened' })
    next({ code: 500, message: 'Something crashed and burned'})
  })
}

module.exports = router;
