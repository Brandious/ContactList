const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token)
      return res.status(403).send({message: 'No token provided'});

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) return res.status(401).send({
            message: 'Unauthorized!'
        })

        req.userId = decoded.id;
        next();
    })
}

isAdmin = async(req, res, next) => {

    try
    {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        roles.map(role => role.dataValues.name === 'Admin' && next());

        res.status(403).send({message: 'Not Admin...'});
    }
    catch(err)
    {
        console.log(err);
        res.send({message: err});
    }

   

}

isModerator = async(req, res, next) => {

    try
    {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
     
        roles.map(role => role.dataValues.name === 'Moderator' && next());

        return res.status(403).send({message: 'Not moderator...'});
    }
    catch(err)
    {
        console.log(err);
        res.send({message: err});
    
    }



}


isModeratorOrAdmin = async(req, res, next) => {

    try
    {

        //TODO: CHECK IF IT WORKS!
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();
        
        roles.map(role => role.dataValues.name === 'Moderator' || role.dataValues.name === 'Admin' ? next(): res.status(403).send({message: 'Not moderator or not Admin...'}));
    }
    catch(err)
    {
        console.log(err);
        res.send({message: err});
    
    }

  

}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
  };
  
  module.exports = authJwt;