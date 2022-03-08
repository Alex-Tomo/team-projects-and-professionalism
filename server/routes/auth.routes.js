/**
 * Authentication only routes that include signup and signin.
 * validation middleware included and should not be touched unless the schema or
 * authentication method changes.
 *
 * @author Jordan Short
 */
 const { verifySignUp } = require('../functionality')
 const controller = require('../controllers/auth.controller')
 
 module.exports = function (app) {
   // Sets Headers
   app.use(function (req, res, next) {
     res.header(
       'Access-Control-Allow-Headers',
       'Authorization, Origin, Content-Type, Accept'
     )
     next()
   })
 
   // Signup
   app.post(
     '/api/auth/signup', [verifySignUp.checkRolesExisted, verifySignUp.checkDuplicateUsernameOrEmail],
     controller.signup
   )
 
   // Signin
   app.post('/api/auth/signin', controller.signin)
 }