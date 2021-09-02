
const express = require('express');
const {validateUserId, validateUser,validatePost} = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

//Gets an array of users
router.get('/', (req, res, next) => {
    Users.get()
        .then(users=>{ res.json(users); })
        .catch(next);
});

//Validate a user's id
router.get('/:id', validateUserId,( req, res) => {
    res.json(req.user);
});

//Create a new user
router.post('/',validateUser, (req, res, next) => {
    Users.insert({name: req.name})
        .then(newUser => {res.status(201).json(newUser);})
        .catch(next)
});

router.put('/:id', validateUser, validateUserId,  (req, res, next) => {
    //Update users, pass in params.id and name object to record changes
    Users.update(req.params.id, {name: req.name})
        .then(updatedUser => { res.status(200).json(updatedUser)})
        //.then(users =>{res.json})
        .catch(next)
});

//Delete posts
router.delete('/:id', validateUserId, async (req, res, next) => {
    try{
        await Users.remove(req.params.id)
        res.json(req.user)
    }
    catch(error){next(error)}
});

//Get the posts
router.get('/:id/posts', validateUserId, async (req, res, next) => {
    try{
        const result = await Users.getUserPosts(req.params.id)
        res.json(result)
    }
    catch(error){next(error)}
});

router.post('/:id/posts',validateUserId,validatePost,async(req, res, next) => {
    try{
        const result = await Posts.insert({
            user_id: req.params.id,
            text: req.text
        })
        res.status(201).json(result)
    }
    catch(error){next(error)}
});

router.use((err, req, res) => {
    res.status(err.status || 500).json({
        customMessage: "something tragic",
        err: err.message
    })
})


module.exports = router;