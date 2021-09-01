
const express = require('express');
const {validateUserId, validateUser,validatePost} = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

//Gets an array of users
router.get('/', (req, res, next) => {
    Users.get()
        .then(users=>{ res.status(200).json(users); })
        .catch(next);
});

//Validate a user's id
router.get('/:id', validateUserId,( req, res) => {

});

router.post('/',validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  console.log("Req.user>>:", req.user, "Req.name", req.name)
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId,(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId,(req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId,(req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: "something tragic",
        err: err.message
    })
})

// do not forget to export the router
module.exports = router;