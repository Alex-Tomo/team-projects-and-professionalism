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
const { sequelize, Op, fn, col } = require("sequelize");
const asyncQueue = require("sequelize/lib/dialects/mssql/async-queue");
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
    if (req.query.type != null && req.query.lesson_id != null && req.query.lesson_name != null) {
        db.lessons.findAll({
            where: {
                lesson_type: req.query.type,
                lesson_id: req.query.lesson_id,
                lesson_name: req.query.lesson_name
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    } else if (req.query.lesson_id != null) {
        db.lessons.findAll({
            where: {
                lesson_id: req.query.lesson_id,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    } else if (req.query.lesson_name != null) {
        db.lessons.findAll({
            where: {
                lesson_name: req.query.lesson_name,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    } else if (req.query.type != null) {
        db.lessons.findAll({
            where: {
                lesson_type: req.query.type
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    }
}
exports.getAllLessons = (req, res) => {
    db.lessons.findAll()
        .then(r => {
            res.send(r)
        }).catch(e => {
            res.send(e)
        })
  }
  
  
  exports.addLesson= (req, res) => {
    db.lessons.create({
      lesson_id: parseInt(req.query.lesson_id),
      lesson_name: req.query.lesson_name,
      question_list: req.query.question_list,
      lesson_type: req.query.lesson_type,
    })
    .then(r => {
        res.send(r)
    }).catch(e => {
        res.send(e)
    })
  
    console.log(req.query)
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
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    }
}

exports.englishStory = (req, res) => {
    db.englishStory.findAll()
        .then(r => {
            res.status(200).send(r)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
}

exports.englishLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.english.findAll({
            include: [{
                model: db.englishStory,
                required: true,
            }],
            where: {
                question_id: req.query.questionList
            }
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    }
}

exports.verbalLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.verbalReasoning.findAll({
            where: {
                question_id: req.query.questionList
            }
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
            })
    }
}

exports.nonVerbalLesson = (req, res) => {
    if (req.query.questionList !== undefined) {
        db.nonVerbalReasoning.findAll({
            where: {
                question_id: req.query.questionList
            }
        })
            .then(r => {
                res.status(200).send(r)
            }).catch(error => {
                res.status(500).send("Error: " + error)
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
            res.status(200).send(r)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
}

exports.completedLessons = (req, res) => {
    db.user_lessons.findAll({
        include: [{
            model: db.lessons,
            required: true
        }],
        where: {
            user_id: req.query.userId
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(r => {
            res.status(200).send(r)
            //console.log(r);
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
}

exports.addEnglish= async (req, res) => {

    let max = await db.questions.max('question_id')
       max = max + 1
      
       await db.questions.create({
           question_id: max,
           question_type: "english"
           
       }).then(() => 
       {db.english.create({
        question_id: max,
        question: req.query.question,
        answer: req.query.answer,
        incorrect_answer_one: req.query.incorrect_answer_one,
        incorrect_answer_two: req.query.incorrect_answer_two,
        incorrect_answer_three: req.query.incorrect_answer_three,
        incorrect_answer_four: req.query.incorrect_answer_four,
        story_id: req.query.story_id
      })
      .then(r => {
          res.send(r)
      }).catch(e => {
          res.send(e)
      })})
    
      console.log(req.query)
  }
  
  exports.addStory= (req, res) => {
    db.englishStory.create({
      title: req.query.title,
      story: req.query.story,
    })
    .then(r => {
        res.send(r)
    }).catch(e => {
        res.send(e)
    })
  
    console.log(req.query)
  }
  
  exports.addMaths= async (req, res) => {
  
    let max = await db.questions.max('question_id')
       max = max + 1
      
       await db.questions.create({
           question_id: max,
           question_type: "math"
           
       }).then(() => 
       {db.math.create({
        question_id: max,
        statement: req.query.statement,
        question: req.query.question,
        answer: req.query.answer,
        question_type: req.query.question_type,
      })
      .then(r => {
          res.send(r)
      }).catch(e => {
          res.send(e)
      })})
    
      console.log(req.query)
  }
  
  exports.addNonVerbal= async (req, res) => { 
    let max = await db.questions.max('question_id')
       max = max + 1
      
       await db.questions.create({
           question_id: max,
           question_type: "none_verbal_reasoning"
           
       }).then(() => 
       {db.nonVerbalReasoning.create({
        question_id: max,
        filename: req.query.filename,
        answer: req.query.answer,
      })
      .then(r => {
          res.send(r)
      }).catch(e => {
          res.send(e)
      })})
    
      console.log(req.query)
  }
  
  
  exports.addVerbal= async (req, res) => { 
    let max = await db.questions.max('question_id')
       max = max + 1
      
       await db.questions.create({
           question_id: max,
           question_type: "verbal_reasoning"
           
       }).then(() => 
       {db.verbalReasoning.create({
        question_id: max,
        question: req.query.question,
        example: req.query.example,
        answer: req.query.answer,
        type: req.query.type
      })
      .then(r => {
          res.send(r)
      }).catch(e => {
          res.send(e)
      })})
    
      console.log(req.query)
  }

  exports.addNonVerbal= async (req, res) => { 
    let max = await db.questions.max('question_id')
       max = max + 1
      
       await db.questions.create({
           question_id: max,
           question_type: "none_verbal_reasoning"
           
       }).then(() => 
       {db.nonVerbalReasoning.create({
        question_id: max,
        filename: req.query.filename,
        answer: req.query.answer,
      })
      .then(r => {
          res.send(r)
      }).catch(e => {
          res.send(e)
      })})
    
      console.log(req.query)
  }

  exports.editLesson= (req, res) => {
    db.lessons.update({
 
    
      lesson_name: req.query.lesson_name,
      question_list: req.query.question_list,
    },
        {
            where: {
                lesson_id: req.query.lesson_id
            }
    })
    .then(r => {
        res.send(r)
    }).catch(e => {
        res.send(e)
    })
  
    console.log(req.query)
  }
  
  
  
  exports.getAllQuestions = (req, res) => {
    db.questions.findAll({
      include: [{
        model: db.math,
        required: false,
      },
      {
        model: db.english,
        required: false,
      },
      {
        model: db.verbalReasoning,
        required: false,
      },
      {
        model: db.nonVerbalReasoning,
        required: false,
      }]
    })
      .then(r => {
        res.send(r)
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  exports.questionsRemove = (req, res) => {
    db.questions.update({
        question_type: (req.query.question_type)
    },
        {
            where: {
                question_id: req.query.question_id
            }
        }).then(r => {
            res.send(r)
        }).catch(e => {
            res.send(e)
        })
      
        console.log(req.query)
}

exports.storyRemove = (req, res) => {
    db.englishStory.update({
        title: (req.query.title)
    },
        {
            where: {
                story_id: req.query.story_id
            }
        }).then(r => {
            res.send(r)
        }).catch(e => {
            res.send(e)
        })
      
        console.log(req.query)
}

exports.lessonsRemove = (req, res) => {
    db.lessons.update({
        lesson_type: (req.query.lesson_type)
    },
        {
            where: {
                lesson_id: req.query.lesson_id
            }
        }).then(r => {
            res.send(r)
        }).catch(e => {
            res.send(e)
        })
      
        console.log(req.query)
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
        }).then(() => {
            db.user.destroy({
                where: {
                    id: parseInt(id)
                }
            })
        })
        res.status(200).send(true)
    })
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

exports.getAdminStatistics = async (req, res) => {
    let sql1 = `
      SELECT 
         COUNT(QqF6fFPRSl.user_lessons.completed) AS completed, 
         QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql2 = `
      SELECT 
         SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score, 
         SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score, 
         QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons 
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql3 = `
      SELECT
      SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score,
      SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score,
      QqF6fFPRSl.lessons.lesson_type,
      QqF6fFPRSl.users.username,
      QqF6fFPRSl.users.id
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      GROUP BY QqF6fFPRSl.lessons.lesson_type, QqF6fFPRSl.users.username, QqF6fFPRSl.users.id`

    await getStats(req, res, sql1, sql2, sql3)
}


exports.getTutorStatistics = async (req, res) => {
    let sql1 = `
      SELECT 
        COUNT(QqF6fFPRSl.user_lessons.completed) AS completed, 
        QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      JOIN QqF6fFPRSl.user_added_bies ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_added_bies.added_user
      WHERE QqF6fFPRSl.user_added_bies.added_by = ${req.body.id}
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql2 = `
      SELECT 
         SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score, 
         SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score, 
         QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      JOIN QqF6fFPRSl.user_added_bies ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_added_bies.added_user
      WHERE QqF6fFPRSl.user_added_bies.added_by = ${req.body.id}
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql3 = `
      SELECT
        SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score,
        SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score,
        QqF6fFPRSl.lessons.lesson_type,
        QqF6fFPRSl.users.username,
        QqF6fFPRSl.users.id
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      JOIN QqF6fFPRSl.user_added_bies ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_added_bies.added_user 
      WHERE QqF6fFPRSl.user_added_bies.added_by = ${req.body.id} 
      GROUP BY QqF6fFPRSl.lessons.lesson_type, QqF6fFPRSl.users.username, QqF6fFPRSl.users.id`

    await getStats(req, res, sql1, sql2, sql3)
}


exports.getStudentStatistics = async (req, res) => {
    let sql1 = `
      SELECT 
        COUNT(QqF6fFPRSl.user_lessons.completed) AS completed, 
        QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      WHERE QqF6fFPRSl.users.id = ${req.body.id}
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql2 = `
      SELECT 
         SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score, 
         SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score, 
         QqF6fFPRSl.lessons.lesson_type
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      WHERE QqF6fFPRSl.users.id = ${req.body.id}
      GROUP BY QqF6fFPRSl.lessons.lesson_type`

    let sql3 = `
      SELECT
        SUM(QqF6fFPRSl.user_lessons.user_score) AS user_score,
        SUM(QqF6fFPRSl.user_lessons.possible_score) AS possible_score,
        QqF6fFPRSl.lessons.lesson_type,
        QqF6fFPRSl.users.username,
        QqF6fFPRSl.users.id
      FROM QqF6fFPRSl.user_lessons
      JOIN QqF6fFPRSl.lessons ON QqF6fFPRSl.user_lessons.lesson_id = QqF6fFPRSl.lessons.lesson_id
      JOIN QqF6fFPRSl.users ON QqF6fFPRSl.users.id = QqF6fFPRSl.user_lessons.user_id
      WHERE QqF6fFPRSl.users.id = ${req.body.id}
      GROUP BY QqF6fFPRSl.lessons.lesson_type, QqF6fFPRSl.users.username, QqF6fFPRSl.users.id`

    await getStats(req, res, sql1, sql2, sql3)
}

const getStats = async (req, res, testsSql, answersSql, studentsSql) => {
    let obj = {}

    await db.sequelize.query(testsSql)
        .then((result) => {
            obj.completedLessons = result
        }).catch((error) => {
            console.log(error)
        })

    await db.sequelize.query(answersSql)
        .then((result) => {
            obj.answers = result
        }).catch((error) => {
            console.log(error)
        })

    await db.sequelize.query(studentsSql)
        .then((result) => {
            let temp = {
                username: "",
                id: 0,
                lessons: [
                    {
                        lesson_type: "math",
                        user_score: 0,
                        potention_score: 0
                    }
                ]
            }

            let tempObj = []
            for (let i = 0; i < result[0].length; i++) {
                if ((tempObj.length === 0)) {
                    tempObj.push({
                        username: result[0][i].username,
                        id: result[0][i].id,
                        lessons: []
                    })
                }

                let flag = false

                for (let j = 0; j < tempObj.length; j++) {
                    if (tempObj[j].username === result[0][i].username) {
                        flag = true
                    }
                }

                if (!flag) {
                    tempObj.push({
                        username: result[0][i].username,
                        id: result[0][i].id,
                        lessons: []
                    })
                }

                switch (result[0][i].lesson_type) {
                    case "math":
                        for (let k = 0; k < tempObj.length; k++) {
                            if (tempObj[k].username === result[0][i].username) {
                                tempObj[k].lessons.push({
                                    type: "math",
                                    actual_score: result[0][i].user_score,
                                    possible_score: result[0][i].possible_score,
                                })
                            }
                        }
                        break;
                    case "english":
                        for (let k = 0; k < tempObj.length; k++) {
                            if (tempObj[k].username === result[0][i].username) {
                                tempObj[k].lessons.push({
                                    type: "english",
                                    actual_score: result[0][i].user_score,
                                    possible_score: result[0][i].possible_score,
                                })
                            }
                        }
                        break;
                    case "verbal_reasoning":
                        for (let k = 0; k < tempObj.length; k++) {
                            if (tempObj[k].username === result[0][i].username) {
                                tempObj[k].lessons.push({
                                    type: "verbal_reasoning",
                                    actual_score: result[0][i].user_score,
                                    possible_score: result[0][i].possible_score,
                                })
                            }
                        }
                        break;
                    case "non_verbal_reasoning":
                        for (let k = 0; k < tempObj.length; k++) {
                            if (tempObj[k].username === result[0][i].username) {
                                tempObj[k].lessons.push({
                                    type: "non_verbal_reasoning",
                                    actual_score: result[0][i].user_score,
                                    possible_score: result[0][i].possible_score,
                                })
                            }
                        }
                        break;
                }
            }

            for (let i = 0; i < tempObj.length; i++) {
                let math = false
                let english = false
                let verbal = false
                let nonVerbal = false

                for (let j = 0; j < tempObj[i].lessons.length; j++) {
                    if (tempObj[i].lessons[j].type === "math") {
                        math = true
                    } else if (tempObj[i].lessons[j].type === "english") {
                        english = true
                    } else if (tempObj[i].lessons[j].type === "verbal_reasoning") {
                        verbal = true
                    } else if (tempObj[i].lessons[j].type === "non_verbal_reasoning") {
                        nonVerbal = true
                    }
                }
                if (!math) {
                    tempObj[i].lessons.push({
                        type: "math",
                        actual_score: 0,
                        possible_score: 0,
                    })
                }
                if (!english) {
                    tempObj[i].lessons.push({
                        type: "english",
                        actual_score: 0,
                        possible_score: 0,
                    })
                }
                if (!verbal) {
                    tempObj[i].lessons.push({
                        type: "verbal_reasoning",
                        actual_score: 0,
                        possible_score: 0,
                    })
                }
                if (!nonVerbal) {
                    tempObj[i].lessons.push({
                        type: "non_verbal_reasoning",
                        actual_score: 0,
                        possible_score: 0,
                    })
                }
            }

            obj.students = tempObj
        }).catch((error) => {
            console.log(error)
        })


    res.status(200).send(obj)
}
