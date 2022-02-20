/**
 * The authentication controller handles all the business logic for the
 * authentication based routes. There is no reason to amend this class unless
 * our authentication method changed.
 *
 * Token refresh is every 24 hours.
 *
 * @author Jordan Short
 */
 const db = require('../schema')
 const config = require('../config/auth-key.config')
 const User = db.user
 const Role = db.role
 
 const Op = db.Sequelize.Op
 
 const jwt = require('jsonwebtoken')
 const bcrypt = require('bcryptjs')
 
 // Signup
 exports.signup = (req, res) => {
   // Creates user and adds to database
   console.log(req.body)

   User.create({
     username: req.body.username,
     email: req.body.email,
     password: bcrypt.hashSync(req.body.password, 8)
   })
     .then(user => {
       if (req.body.roles) {
         Role.findAll({
           where: {
             name: {
               [Op.or]: req.body.roles
             }
           }
         }).then(roles => {
           user.setRoles(roles).then(() => {
             res.send({ message: 'User was registered successfully!' })
           })
         })
       } else {
         // Sets a user role automatically to 1 if no value passed.
         user.setRoles([1]).then(() => {
           res.send({ message: 'User was registered successfully!' })
         })
       }
     })
     .catch(err => {
       res.status(500).send({ message: err.message })
     })
 }
 
 // Signin
 exports.signin = (req, res) => {
   User.findOne({
     where: {
       username: req.body.username
     }
   })
     .then(user => {
       if (!user) {
         return res.status(404).send({ message: 'User Not found.' })
       }
 
       const passwordIsValid = bcrypt.compareSync(
         req.body.password,
         user.password
       )
 
       if (!passwordIsValid) {
         return res.status(401).send({
           accessToken: null,
           message: 'Invalid Password!'
         })
       }
 
       const token = jwt.sign({ id: user.id }, config.secret, {
         // Expiration of token.
         expiresIn: 86400
       })
 
       const authorities = []
       user.getRoles().then(roles => {
         for (let i = 0; i < roles.length; i++) {
           authorities.push('ROLE_' + roles[i].name.toUpperCase())
         }
         res.status(200).send({
           id: user.id,
           username: user.username,
           email: user.email,
           roles: authorities,
           accessToken: token
         })
       })
     })
     .catch(err => {
       res.status(500).send({ message: err.message })
     })
 } 