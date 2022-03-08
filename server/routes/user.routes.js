/**
 * All user based routes, typically you will be difining new routes here as its is
 * not appropriate to touch the auth routes since they are only used to generate tokens and
 * users.
 *
 * In order to add a user (student) only route you must add [authJwt.verifyToken] as middleware,
 * examples can be seen below. To add an admin only route you must add [authJwt.verifyToken, authJwt.isAdmin],
 * again examples can be seen below.
 *
 * @author Jordan Short
 */

 const { authJwt } = require('../functionality')
 const controller = require('../controllers/user.controller')

 // Sets and allows headers instead of using cors to just allow all.
 module.exports = function (app) {
   app.use(function (req, res, next) {
     res.header(
       'Access-Control-Allow-Headers',
       'Authorization, Origin, Content-Type, Accept'
     )
     next()
   })

   //Everyone can see this route including non-signed in account
   app.get('/api/test/all', controller.allAccess)

   //Everyone logged in can see this route
   app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard)

   //Only admins can see this route
   app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)

   //Tutors and admins can see this route
   app.get('/api/test/tutor', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.tutorBoard)

   //Test route for lessons can be removed
   app.get('/api/test/lessons', [authJwt.verifyToken], controller.lessons)

   app.post('/api/admin/users', [authJwt.verifyToken, authJwt.isAdmin], controller.adminUsers)

   app.post('/api/admin/adduser', [authJwt.verifyToken, authJwt.isAdmin], controller.adminAddUser)

   app.post('/api/admin/edituser', [authJwt.verifyToken, authJwt.isAdmin], controller.adminEditUser)

   app.post('/api/admin/removeuser', [authJwt.verifyToken, authJwt.isAdmin], controller.adminRemoveUser)
 }
