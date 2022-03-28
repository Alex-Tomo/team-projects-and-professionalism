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
const bcrypt = require("bcryptjs");
const { sequelize, Op } = require("sequelize");
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
    if (req.query.type != null && req.query.lesson_id != null) {
        db.lessons.findAll({
            where: {
                lesson_type: req.query.type,
                lesson_id: req.query.lesson_id
            }
        })
            .then(r => {
                res.send(r)
            }).catch(e => {
                res.send(e)
            })
    } else if (req.query.lesson_id != null) {
        db.lessons.findAll({
            where: {
                lesson_id: req.query.lesson_id
            }
        })
            .then(r => {
                res.send(r)
            }).catch(e => {
                res.send(e)
            })
    } else if (req.query.type != null) {
        db.lessons.findAll({
            where: {
                lesson_type: req.query.type
            }
        })
            .then(r => {
                res.send(r)
            }).catch(e => {
                res.send(e)
            })
    }
}

//Gets the maths questions
exports.mathsLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.math.findAll({
            where: {
                question_id: req.query.questionList
            }
        })
            .then(r => {
                res.send(r)
            }).catch(e => {
                console.log(e)
            })
    }
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
    if (req.query.questionList !== undefined) {
        db.english.findAll({
            include: [{
                model: db.englishStory,
                required: true,
            }]
        })
            .then(r => {
                res.send(r)
            }).catch(e => {
                console.log(e)
            })
    }
}

exports.verbalLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.verbalReasoning.findAll()
            .then(r => {
                res.send(r)
            }).catch(e => {
                console.log(e)
            })
    }
}

exports.nonVerbalLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.nonVerbalReasoning.findAll()
            .then(r => {
                res.send(r)
            }).catch(e => {
                console.log(e)
            })
    }
}

exports.userLessons = (req, res) => {
    db.user_lessons.create({
        lesson_id: req.body.lessonId,
        user_id: req.body.userId,
        completed: req.body.completed,
        user_score: req.body.userScore,
        possible_score: req.body.possibleScore,
        answers: req.body.userAnswers
    })
        .then(r => {
            res.send(r)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
}

exports.completedLessons = (req, res) => {
    db.user_lessons.findAll({
        include: [{
            model: db.lessons,
            required: true
        }]
    })
        .then(r => {
            res.send(r)
        }).catch(e => {
            console.log(e)
        })
}

// Get all the users for the admin section (Account management)
exports.adminUsers = (req, res) => {
    db.user.findAll({
        attributes: ['id', 'username', 'email', 'createdAt'],
        include: [{
            model: db.role,
            required: true,
        },
        {
            model: db.user_added_by,
            required: true,
            where: (req.body.id !== null) ? { added_by: req.body.id } : {}
        }],
        order: ['createdAt']
    })
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.status(500).send("Error: " + error)
        })
}

exports.adminAddUser = (req, res) => {
    db.user.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.role) {
                db.role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).catch(() => {
                        res.status(500).send({ registered: false })
                    })
                })
            } else {
                // Sets a user role automatically to 1 if no value passed.
                user.setRoles([1]).catch(() => {
                    res.status(500).send({ registered: false })
                })
            }
            return user.dataValues
        }).then((user) => {
            db.user_added_by.create({
                added_user: user.id,
                added_by: req.body.addedById,
                added_by_name: req.body.addedByUsername
            }).then(() => {
                res.status(200).send({ id: user.id })
            })
        })
        .catch((error) => {
            res.status(500).send({ registered: false })
        })
}

exports.adminEditUser = (req, res) => {
    if ((req.body.username !== null) && (req.body.email !== null)) {
        db.user.update({
            username: req.body.username,
            email: req.body.email,
        },
            {
                where: {
                    id: req.body.id
                }
            }).catch(error => {
                res.status(500).send({ updated: false })
            })
    } else if (req.body.username !== null) {
        db.user.update({
            username: req.body.username
        },
            {
                where: {
                    id: req.body.id
                }
            }).catch(error => {
                res.status(500).send({ updated: false })
            })
    } else if (req.body.email !== null) {
        db.user.update({
            email: req.body.email
        },
            {
                where: {
                    id: req.body.id
                }
            }).catch(error => {
                res.status(500).send({ updated: false })
            })
    }
    if (req.body.role !== null) {
        db.user.findOne({
            where: {
                id: req.body.id
            }
        }).then(user => {
            if (req.body.roles) {
                db.role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles)
                }).catch(error => {
                    res.status(500).send({ updated: false })
                })
            }
        }).catch(error => {
            res.status(500).send({ updated: false })
        })
    }

    res.status(200).send({ updated: true })
}

exports.adminRemoveUser = (req, res) => {
    let ids = req.body.id.split(',')

    ids.forEach(id => {
        db.user_added_by.destroy({
            where: {
                added_user: parseInt(id)
            }
        })
        db.user.destroy({
            where: {
                id: parseInt(id)
            }
        })
    })

    res.status(200).send(true)
}

exports.adminChangePassword = (req, res) => {
    db.user.update({
        password: bcrypt.hashSync(req.body.password, 8)
    },
        {
            where: {
                id: req.body.id
            }
        }).then(() => {
            res.status(200).send({ updated: true })
        }).catch(() => {
            res.status(500).send({ updated: false })
        })
}

