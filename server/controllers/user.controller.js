/**
 * The user controller will be where all the user and admin based routes will be
 * pushed to. All of the business logic for those routes should be implimented
 * here.
 *
 * All examples can be found below. further work: create a function to pull through current user
 * id for further use in sql (ORM) functions.
 *
 * @author Jordan Short
 */

 const db = require('../schema')
 const { tokenIdCheck } = require('../functionality/')
 const User = db.user
 
 exports.allAccess = (req, res) => {
   res.status(200).send('Public Content.')
 }
 
 exports.userBoard = async (req, res) => {
   res.status(200).send("This is the user or 'student content'")
 }
 
 exports.adminBoard = (req, res) => {
   res.status(200).send('This is the admin Content.')
 }

 exports.tutorBoard = (req, res) => {
  res.status(200).send('This is the tutor Content.')
}
 
 exports.lessons = (req, res) => {
   const token = req.headers['x-access-token'].split('.')
   const encodedPayload = token[1]
   const rawPayload = Buffer.from(encodedPayload, 'base64')
   const user = JSON.parse(rawPayload)
   console.log(user.id)
   db.lessons.findAll({
     include: [{
       model: db.user,
       where: { id: user.id },
       required: true
     }]
   }).then(lessons => {
     res.status(200).json(lessons)
   })
 } 