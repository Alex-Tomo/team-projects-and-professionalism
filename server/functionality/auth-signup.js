/**
 * Basic validation in order to check for duplicate, usernames, email and
 * ensures that the role selected exists. Ran into a lot of problems if incorrect role
 * selected so created this validation. Should not be changed.
 *
 * @author Jordan Short
 */

 const db = require('../schema')
 const ROLES = db.ROLES
 const User = db.user
 
 checkDuplicateUsernameOrEmail = (req, res, next) => {
   User.findOne({
     where: {
       username: req.body.username
     }
   }).then(user => {
     if (user) {
       res.status(400).send({
         message: 'Username is already in use!'
       })
       return
     }
 
     User.findOne({
       where: {
         email: req.body.email
       }
     }).then(user => {
       if (user) {
         res.status(400).send({
           message: 'Email is already in use!'
         })
         return
       }
 
       next()
     })
   })
 }
 
 checkRolesExisted = (req, res, next) => {
   if (req.body.roles) {
     for (let i = 0; i < req.body.roles.length; i++) {
       if (!ROLES.includes(req.body.roles[i])) {
         res.status(400).send({
           message: 'Invalid selection = ' + req.body.roles[i]
         })
         return
       }
     }
   }
 
   next()
 }
 
 const verifySignUp = {
   checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
   checkRolesExisted: checkRolesExisted
 }
 
 module.exports = verifySignUp 