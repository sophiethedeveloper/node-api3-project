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

router.delete('/:id', (req, res) => { //validatePostId
  // do your magic!
});

router.put('/:id', (req, res) => { // validatePostId
  // do your magic!
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
