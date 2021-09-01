//Define the hub middleware functions
//Import findByID, yup
//const {findById} = require("../users/users-model");
// const yup = require("yup");

//Logger function definition, logs each req/res firing
function logger (req,res,next){
  //Req and res objects
  console.log("LOGGER FUNCTION:")
  console.log(`[${req.method}] $[${req.url}]`)
  next();
}

//Find id by req.params.id, 
function validateUserId(req, res, next) {
  console.log("validateUserId function", req.params.id);
  findById(req.params.id)
  .then(user => {
    if(user){
      req.user = user;
      next();
    }
    else {
      next({
        status: 404,
        message: `message: "user not found"`
      })
    }
  })
  
}

//Check user payload
function validateUser(req, res, next) {
  console.log("validateUser", req.body);

}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// Export the middleware functions
module.exports = {logger, validateUserId, validateUser,validatePost};