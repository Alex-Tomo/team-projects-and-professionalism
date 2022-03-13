/**
 * The user controller will be where all the user and admin based routes will be
 * pushed to. All of the business logic for those routes should be implimented
 * here.
 *
 * All examples can be found below. further work: create a function to pull through current user
 * id for further use in sql (ORM) functions.
 *
 * @author Jordan Short, Alex Thompson, Graham Stoves 
 */

const db = require('../schema')
const { tokenIdCheck } = require('../functionality')
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

exports.mathsLesson = (req, res) => {
    db.math.findAll()
        .then(r => {
            res.send(r)
        }).catch(e => {
            console.log(e)
        })
}

exports.englishStory = (req, res) => {
    db.englishStory.findAll()
        .then(r => {
            res.send(r)
        }).catch(e => {
            console.log(e)
        })
}

exports.englishLesson = (req, res) => {
    db.english.findAll()
        .then(r => {
            res.send(r)
        }).catch(e => {
            console.log(e)
        })
}

exports.verbalLesson = (req, res) => {
    db.verbalReasoning.findAll()
        .then(r => {
            res.send(r)
        }).catch(e => {
            console.log(e)
        })
}

// exports.nonVerbalLesson = (req, res) => {
//     db.nonVerbalReasoning.findAll()
//         .then(r => {
//             res.send(r)
//         }).catch(e => {
//             console.log(e)
//         })
// }

// Get all the users for the admin section (Account management)
// TODO: modify so it checked for admin token or tutor token
exports.adminUsers = (req, res) => {
    db.user.findAll()
        .then(async r => {
            let result = []

            for (const element of r) {

                await db.role.findOne({
                    include: [{
                        model: db.user,
                        where: { id: element.id },
                        required: true
                    }]
                }).then(r => {
                    result.push({
                        id: element.id,
                        username: element.username,
                        email: element.email,
                        role: r.name,
                        dateAdded: element.createdAt
                    })
                }).catch(e => {
                    res.status(404).send("Error: " + e)
                })
            }
            res.status(200).send(result)
        })
        .catch(e => {
            res.status(404).send("Error: " + e)
        })
}

exports.adminAddUser = (req, res) => {
    res.status(200).send("New user added")
}

exports.adminEditUser = (req, res) => {
    res.status(200).send("User edited")
}

exports.adminRemoveUser = (req, res) => {
    let ids = req.body.id.split(',')
    ids.forEach(id => {
        db.user.destroy({
            where: {
                id: parseInt(id)
            }
        })
    })

    res.status(200).send('User deleted')
}
