const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async(req, res) => {
   try{

    const user = await User.create({username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
    });

    if(req.body.roles){
        const role = await Role.findAll({where: {name:{[Op.or]: req.body.roles}}});

        await user.setRoles(role);
        
    }
    else
    {
        await user.setRoles([1])
      
    }
        return res.send({message: 'User is registered...'})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send({ message: err.message });
    }
}

exports.signin = async (req, res) => {
    try
    {   
       
        const user = await User.findOne({where: {username: req.body.username}});
        
        if(!user)
            return res.status(404).send({message: 'User not found...'});

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid)
            return res.status(401).send({accessToken: null, 
            message: "Invalid Password!"})

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        });

        const authorities = [];

        const roles = await user.getRoles();

        

        for(let i = 0; i < roles.length; i++){
             
             authorities.push('ROLE_'+ roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
}
