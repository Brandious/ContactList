const db = require('../models');
const Contact = db.contact;

exports.createContact = async (req, res) => {

    try
    {
         const {userId, name, email, number} = req.body;
    
         const contacts = await Contact.create({
             name:name,
             email: email,
             phoneNumber: number,
             userId: userId
         });

         res.status(200).send(contacts);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }

   
}

exports.getContacts = async (req, res) => {

    try
    {     
       
         const {userId } = req || req.body;

         const contacts = await Contact.findAll({where: {userId: userId}})

         res.status(200).send(contacts);
    }
    catch(err)
    {
        console.log(err);
        res.status(403).send(err);
    }

   
}

exports.deleteContact = async (req, res) => {

    try
    {
         console.log(req.body);
         const { contactId } =  req.body;
         console.log(req.body);
         const contacts = await Contact.destroy({where: {id: contactId}})

         return res.status(200).send(contacts);
    }
    catch(err)
    {
        console.log(err);
        return res.status(403).send(err);
    }

   
}

exports.updateContact = async (req, res) => {

    try
    {
         const { contactId, name, email, phoneNumber } =  req.body;
    
         const contacts = await Contact.update({name, email, phoneNumber},{where: {id: contactId}})
         return res.status(200).send(contacts);
    }
    catch(err)
    {
        console.log(err);
        return res.status(403).send(err);
    }

   
}