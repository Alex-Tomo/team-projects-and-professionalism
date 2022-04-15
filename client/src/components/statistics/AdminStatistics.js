import React from "react"
import axios from "axios"
import authHeader from "../../services/auth-header"
import UserService from "../../services/user.service"
import 'chart.js/auto'
import TestsTakenChart from "./charts/TestsTakenChart"
import AnswersChart from "./charts/answersChart"
import MyStudentsChart from "./charts/MyStudentsChart"

/**
 * The Statistics Page - shows statistics for all users
 *
 * @author Alex Thompson, W19007452
 */

class AdminStatistics extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
            testsTaken: {
                total: 0,
                math: 0,
                english: 0,
                verbal: 0,
                nonVerbal: 0
            },
            answers: {
                totalAnswers: 0,
                totalCorrectAnswers: 0,
                mathCorrectAnswers: 0,
                mathAnswers: 0,
                englishCorrectAnswers: 0,
                englishAnswers: 0,
                verbalCorrectAnswers: 0,
                verbalAnswers: 0,
                nonVerbalCorrectAnswers: 0,
                nonVerbalAnswers: 0
            },
            myStudents: [],
            studentIndex: 0
        }
    }

    componentDidMount() {
        UserService.getAdminBoard()
            .then((response) => {
                this.setState({
                    content: response.data,
                    loggedIn: true
                })
            },
                (error) => {
                    this.setState({
                        content:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    })
                }
            ).then(() => {
                axios.post('https://kip-learning.herokuapp.com/api/statistics/adminstatistics', {
                    id: null
                },
                    {
                        headers: authHeader()
                    }).then(results => {

                        let total = 0, math = 0, english = 0, verbal = 0, nonVerbal = 0
                        for (let i = 0; i < results.data.completedLessons[0].length; i++) {
                            total += results.data.completedLessons[0][i].completed
                            switch (results.data.completedLessons[0][i].lesson_type) {
                                case "math": math += results.data.completedLessons[0][i].completed; break;
                                case "english": english += results.data.completedLessons[0][i].completed; break;
                                case "verbal_reasoning": verbal += results.data.completedLessons[0][i].completed; break;
                                case "non_verbal_reasoning": nonVerbal += results.data.completedLessons[0][i].completed; break;
                                default: break;
                            }
                        }

                        let
                            totalAnswers = 0,
                            totalCorrectAnswers = 0,
                            mathAnswers = 0,
                            mathCorrectAnswers = 0,
                            englishAnswers = 0,
                            englishCorrectAnswers = 0,
                            verbalAnswers = 0,
                            verbalCorrectAnswers = 0,
                            nonVerbalAnswers = 0,
                            nonVerbalCorrectAnswers = 0

                        for (let i = 0; i < results.data.answers[0].length; i++) {

                            totalAnswers += parseInt(results.data.answers[0][i].possible_score)
                            totalCorrectAnswers += parseInt(results.data.answers[0][i].user_score)

                            switch (results.data.answers[0][i].lesson_type) {
                                case "math":
                                    mathCorrectAnswers += parseInt(results.data.answers[0][i].user_score)
                                    mathAnswers += parseInt(results.data.answers[0][i].possible_score)
                                    break
                                case "english":
                                    englishCorrectAnswers += parseInt(results.data.answers[0][i].user_score)
                                    englishAnswers += parseInt(results.data.answers[0][i].possible_score)
                                    break
                                case "verbal_reasoning":
                                    verbalCorrectAnswers += parseInt(results.data.answers[0][i].user_score)
                                    verbalAnswers += parseInt(results.data.answers[0][i].possible_score)
                                    break
                                case "non_verbal_reasoning":
                                    nonVerbalCorrectAnswers += parseInt(results.data.answers[0][i].user_score)
                                    nonVerbalAnswers += parseInt(results.data.answers[0][i].possible_score)
                                    break
                                default: break
                            }
                        }

                        this.setState({
                            testsTaken: {
                                total: total,
                                math: math,
                                english: english,
                                verbal: verbal,
                                nonVerbal: nonVerbal
                            },
                            answers: {
                                totalAnswers: totalAnswers,
                                totalCorrectAnswers: totalCorrectAnswers,
                                mathCorrectAnswers: mathCorrectAnswers,
                                mathAnswers: mathAnswers,
                                englishCorrectAnswers: englishCorrectAnswers,
                                englishAnswers: englishAnswers,
                                verbalCorrectAnswers: verbalCorrectAnswers,
                                verbalAnswers: verbalAnswers,
                                nonVerbalCorrectAnswers: nonVerbalCorrectAnswers,
                                nonVerbalAnswers: nonVerbalAnswers
                            },
                            myStudents: results.data.students
                        })
                    }).catch((e) => {
                        console.log(e)
                    })
            })
    }

    render() {
        // If the user is not logged in or not a valid user,
        // display this before redirection
        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>You must be logged in to view this page</h1>
                </div>
            )
        }

        let username = ""
        if (this.state.myStudents.length > 0) {
            username = this.state.myStudents[this.state.studentIndex].username
        }
        return (
            <div className="statistics-container" style={{ marginBottom: "20px" }}>
                <h1 className="statistics-title title">Overall Statistics</h1>
                <div className="statistics-title-line" />
                <div className="statistics-grid-container">

                    <div className="statistic-one" style={{ minWidth: "30%", maxWidth: "100%", padding: "10px" }}>
                        <h1 className="statistics-title title">{this.state.testsTaken.total} Tests Taken</h1>
                        <hr />
                        <TestsTakenChart testsTaken={this.state.testsTaken} />
                    </div>

                    <div className="statistic-two" style={{ minWidth: "30%", maxWidth: "100%", padding: "10px" }}>
                        <h1 className="statistics-title title">
                            {this.state.answers.totalCorrectAnswers} Out Of {this.state.answers.totalAnswers} Answered Correctly
                        </h1>
                        <hr />
                        <AnswersChart answers={this.state.answers} />
                    </div>

                    <div className="statistic-three" style={{ minWidth: "30%", maxWidth: "100%", padding: "10px" }}>
                        <h1 className="statistics-title title">My Students - {username}</h1>
                        <hr />
                        {
                            (this.state.myStudents.length > 0) ?
                                <MyStudentsChart myStudents={this.state.myStudents[this.state.studentIndex]} /> :
                                null
                        }

                        <button
                            onClick={() => { this.setState({ studentIndex: this.state.studentIndex - 1 }) }}
                            disabled={this.state.studentIndex <= 0}
                        >Back</button>
                        <button
                            onClick={() => { this.setState({ studentIndex: this.state.studentIndex + 1 }) }}
                            disabled={this.state.studentIndex >= this.state.myStudents.length - 1}
                        >Next</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default AdminStatistics