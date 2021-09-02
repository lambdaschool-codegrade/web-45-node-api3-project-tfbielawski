//Define the hub middleware functions
const User = require("../users/users-model");

//Logger function definition, logs each req/res firing
const logger = (req,res,next) =>{
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl
  console.log("LOGGER FUNCTION:",`[${req.method}] $[${req.url}]`)
  console.log(`[${timeStamp}] $[${method}] $[${url}]`)
  next();
}

//Find id by req.params.id, 
const validateUserId = async ( req, res, next) => {
   try{
     const user = await User.getById(req.params.id);
     if(!user){ res.status(404).json ({message: "uo such user" }) }
     //Assign user object to req.user, call next
     else {
       req.user = user;
       next();
     }
   }
   catch(error) {
     res.status(500).json({message: "problem finding user"})
   }
}

//Check user payload
function validateUser(req, res, next) {
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field"})
  }
  else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({ message: "missing required text field"})
  }
  else {
    req.text = text.trim()
    next()
  }
}
// Export the middleware functions
module.exports = {logger, validateUserId, validateUser,validatePost};