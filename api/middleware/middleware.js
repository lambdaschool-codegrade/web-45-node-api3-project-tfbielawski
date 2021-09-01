//Define the hub middleware functions
//Import findByID, yup
//const {findById} = require("../users/users-model");
const yup = require("yup");
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
  console.log("validateUserId function", req.params.id);
   try{
     const user = await User.getById(req.params.id);
     if(!user){
       res.status(404).json({
         status: 404,
         message: "user not found"
       })
     }
     //Assign user object to req.user, call next
     else { req.user = user; next(); }
   }
   catch(error) {
     res.status(500).json({message: "user not found"})
   }
}

//Check user payload
const validateUser = (req, res, next) => {
  console.log("validateUser", req.body);
  const {name} =  req.name;
  //If name is empty
  if (!name || !name.trim()){
      //Alert the user
    res.status(400).json({message: "missing required name field" })
  }
  //Assign name to req.name object
  else {req.name = name.trim();next()}
}

//Validate Post Schema
 const userSchema = yup.object({
   name: yup.string().trim().min(3).required(),
   text: yup.string().trim().min(3).required(),
 })

const validatePost = (req, res, next) =>{
  console.log("validatePost function", req.body);
  const {text} =  req.name;
  //If text is empty
    if (!text || !text.trim()){
       //Alert the user
       res.status(400).json({message: "missing required name field" })
    }
    //Assign text to req.text object
    else {req.text = text.trim();next()}
}
// Export the middleware functions
module.exports = {logger, validateUserId, validateUser,validatePost};