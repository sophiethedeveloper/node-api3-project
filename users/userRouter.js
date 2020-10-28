const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => { // create a new user
  // do your magic!

  //validateUser
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving users",
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  Users.getUserPosts(id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message, stack: error.stack
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(count => {
    res.status(200).json({message: 'The user has been deleted'})
  })
  .catch(error => {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  })
});

router.put("/:id", (req, res) => {
  // do your magic!

  const { id } = req.params
  const changes = req.body
  
  Users.update(id, changes)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'The user cannot be found'})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  Users.getById(id)
    .then((data) => {
      if (data) {
        req.user = data;
        next();
      } else {
        res.status(400).json({ message: "Invalid user id" });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(404).json({ message: "Id not found!" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  // const { name } = req.body
  // if
}

function validatePost(req, res, next) {
  // do your magic!

  const { text } = req.body
  if(!text){
    res.status(400).json({message: 'text is required'})
  } else {
    res.status
  }
}

module.exports = router;
