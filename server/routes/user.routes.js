/**
 * All user based routes, typically you will be difining new routes here as its is
 * not appropriate to touch the auth routes since they are only used to generate tokens and
 * users.
 *
 * In order to add a user (student) only route you must add [authJwt.verifyToken] as middleware,
 * examples can be seen below. To add an admin only route you must add [authJwt.verifyToken, authJwt.isAdmin],
 * again examples can be seen below.
 *
 * @author Jordan Short, Alex Thompson
 */

const { authJwt, verifySignUp } = require('../functionality')
const controller = require("../controllers/user.controller");

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

    app.get('/api/lessons', [authJwt.verifyToken], controller.lessons)

    app.get('/api/mathslesson', [authJwt.verifyToken], controller.mathsLesson)

    app.get('/api/englishstory', [authJwt.verifyToken], controller.englishStory)

    app.get('/api/englishlesson', [authJwt.verifyToken], controller.englishLesson)

    app.get('/api/verballesson', [authJwt.verifyToken], controller.verbalLesson)

    app.get('/api/nonverballesson', [authJwt.verifyToken], controller.nonVerbalLesson)

    app.get('/api/completedlessons', [authJwt.verifyToken], controller.completedLessons)

    app.post('/api/userlessons', [authJwt.verifyToken], controller.userLessons)

    // Admin related content
    app.post('/api/admin/users', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.adminUsers)

    app.post('/api/admin/adduser', [verifySignUp.checkRolesExisted, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.verifyToken, authJwt.isTutorAdmin], controller.adminAddUser)

    app.post('/api/admin/edituser', [verifySignUp.checkRolesExisted, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.verifyToken, authJwt.isTutorAdmin], controller.adminEditUser)

    app.post('/api/admin/removeuser', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.adminRemoveUser)

    app.post('/api/amin/changepassword', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.adminChangePassword)

    app.post('/api/statistics/adminstatistics', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.getAdminStatistics)

    app.post('/api/statistics/tutorstatistics', [authJwt.verifyToken, authJwt.isTutorAdmin], controller.getTutorStatistics)

    app.post('/api/statistics/userstatistics', [authJwt.verifyToken], controller.getStudentStatistics)
}
