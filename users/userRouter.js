const express = require("express");

const Users = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
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

router.get("/:id/posts", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
