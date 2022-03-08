/**
 * Token verification, also verifies different roles such as admin and user.
 * Token is takedn from the x-access-token header, may change this to a "bearer"
 * implimentation as it is a little bit more secure but doesn't feel required for the
 * moment.
 *
 * Can impliment more roles if needed, for example moderator, students etc.
 *
 * @author Jordan
 */
 const jwt = require('jsonwebtoken')
 const config = require('../config/auth-key.config.js')
 const db = require('../schema')
 const User = db.user
 
 // Token verification
 verifyToken = (req, res, next) => {
   let token = req.headers['authorization']
   console.log(token)

  if(token.includes("Bearer")){
    token = token.substring(7, token.length)
  }

   if (!token) {
     return res.status(404).send({
       message: '404 Page Not Found'
     })
   }
 
   jwt.verify(token, config.secret, (err, decoded) => {
     if (err) {
       return res.status(401).send({
         message: 'Token Expired'
       })
     }
     req.userId = decoded.id
     next()
   })
 }
 
 // Check if role === admin
 isAdmin = (req, res, next) => {
   User.findByPk(req.userId).then(user => {
     user.getRoles().then(roles => {
       for (let i = 0; i < roles.length; i++) {
         if (roles[i].name === 'admin') {
           next()
           return
         }
       }
 
       res.status(403).send({
         message: 'Require Admin Role'
       })
     })
   })
 }

 isTutor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'tutor') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Require tutor Role!'
      })
    })
  })
}

isTutorAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "tutor") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Only tutors/admins can access this content"
      });
    });
  });
};
 
 const authJwt = {
   verifyToken: verifyToken,
   isAdmin: isAdmin,
   isTutor: isTutor,
   isTutorAdmin: isTutorAdmin
 }
 module.exports = authJwt 
