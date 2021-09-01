//Define the hub middleware functions
//Import findByID, yup
const {findById} = require("../users/users-model");
const yup = require("yup");

//Logger function definition, logs each req/res firing
const logger = (req,res,next) =>{
  //Req and res objects
  console.log("LOGGER FUNCTION:")
  console.log(`[${req.method}] $[${req.url}]`)
  next();
}

//Find id by req.params.id, 
const validateUserId = (req, res, next) => {
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
const validateUser = (req, res, next) => {
  console.log("validateUser", req.body);
  if (req.body.name && req.body.name.trim()){
    //assign the trimmed value to req.body.name, call next
    req.body.name = req.body.name.trim();
    next();
  }
  else {
      next({
        status: 422,
        message: `hub requires a valid name`
      })
  }

}
 const userSchema = yup.object({
   name: yup.string().trim().min(3).required(),
   text: yup.string().trim().min(3).required(),
 })

const validatePost = (req, res, next) =>{
  console.log("validatePost function", req.body);
  //Attempt validation
  try{
    //Assign validated req to validatedPost, then assign to req.body
   const validatedPost = userSchema.validate(req.body);
   req.body = validatedPost;
   next();
  }
  //Catch, calls next with error ob
  catch(error){next(error)}
}
// Export the middleware functions
module.exports = {logger, validateUserId, validateUser,validatePost};