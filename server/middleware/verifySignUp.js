const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;


checkDuplicateUsernameOrEmail = async(req, res, next) => {
    
     try
     {
         const UserExists = await User.findOne({
             where: {
                 username: req.body.username
             }
         })

         const EmailExists = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(UserExists || EmailExists) 
            res.status(400).send({
                message: 'User exists...'
            })
     }
     catch(err)
     {
         console.log(err)
        
     }
     next();

}


checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;