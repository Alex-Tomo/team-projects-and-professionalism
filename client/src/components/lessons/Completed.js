import React from "react"
import axios from "axios"
import UserService from "../../services/user.service"
import authHeader from "../../services/auth-header"

class Completed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answers: JSON.parse(this.props.answer),
            lessons: [],
            questionList: [],
            lessonType: "",
            questionValue: [],
            currentIndex: 0
        }
    }

    componentDidMount() {
        UserService.getUserBoard()
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
                this.getLesson()
            })
    }

    getLesson = async () => {
        await axios.get('http://localhost:8080/api/lessons', {
            headers: authHeader(),
            params: {
                lesson_id: this.props.lessonId
            }
        }).then(res => {
            this.setState({
                lessons: res.data
            })
        }).catch(e => {
            console.log("error: " + e)
        })

        this.state.lessons.map((result, i) => {
            <div key={i}></div>
            this.setState({
                questionValue: result.question_list,
                lessonType: result.lesson_type
            })
            return <></>
        })
        this.getQuestions().then(() => {
            this.setState({ currentIndex: 0 })
        })
    }

    getQuestions = async () => {
        if (this.state.questionValue.length > 0) {
            let questionArray = []
            let url = ""

            questionArray = this.state.questionValue.split(',').map(function (item) {
                return parseInt(item)
            })

            switch (this.state.lessonType) {
                case "math":
                    url = "http://localhost:8080/api/mathslesson"
                    break
                case "english":
                    url = "http://localhost:8080/api/englishlesson"
                    break
                case "verbal_reasoning":
                    url = "http://localhost:8080/api/verballesson"
                    break
                case "non_verbal_reasoning":
                    url = "http://localhost:8080/api/nonverballesson"
                    break
                default:
                    break
            }

            await axios.get(url, {
                headers: authHeader(),
                params: { questionList: questionArray }
            })
                .then(res => {
                    let array = []
                    for (let i = 0; i < questionArray.length; i++) {
                        for (let j = 0; j < questionArray.length; j++) {
                            if (res.data[j].question_id === questionArray[i]) {
                                array.push(res.data[j])
                            }
                        }
                    }
                    this.setState({
                        questionList: array,
                    })
                }).catch(e => {
                    console.log("error: " + e)
                })
        }
    }

    render() {
        const reactStringReplace = require('react-string-replace')
        let lesson = ""

        if (this.state.questionList.length > 0 && this.state.lessons.length > 0) {
            lesson = this.state.lessons.map((res, i) => {
                return (
                    <div>
                        <div key={i} className="box is-shadowless mb-4" style={{ border: "2px solid #F2F2F2", borderRadius: "8px" }}>
                            <div className="columns">
                                <div className="column is-pulled-left" style={{ margin: "auto", width: "50%", padding: "10px" }}>
                                    <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Lesson Name: {res.lesson_name}</h4>
                                </div>
                                <div className="column is-1 is-pulled-right hide-mobile" style={{ margin: "auto", width: "10%", padding: "10px" }}>
                                </div>
                            </div>
                            <div>
                                <h4 className="subtitle is-5 mb-0 has-text-weight-bold">Your Score: {this.props.score} out of {this.props.potentialScore}</h4>
                            </div><br />
                            <div>{
                                this.state.questionList.map((result, i) => {
                                    let question = result.question
                                    if (result.question.includes("{?}")) {
                                        question = (
                                            <div className="pb-0">
                                                {reactStringReplace(result.question, '{?}', (match, i) => (
                                                    <input
                                                        style={{ width: "100px" }}
                                                        className="input is-info mb-3"
                                                        key={i}
                                                        type="number"
                                                        //id={Math.floor(i / 2)}
                                                        //placeholder="Answer"
                                                        value={result.answer}
                                                        onChange={this.handleChange}
                                                        disabled
                                                    />
                                                ))}
                                            </div>)
                                    }

                                    if (result.question_type === 5) {
                                        let questionString = result.question
                                        let array = questionString.split("\n")
                                        let subArray = []

                                        for (let i = 0; i < array.length; i++) {
                                            subArray.push(array[i].split(" "))
                                        }

                                        question = (
                                            subArray.map((arr, i) => <div key={i} style={{ display: "flex", marginBottom: "15px" }}>
                                                <p>{i + 1})</p>
                                                {
                                                    arr.map((word, j) =>
                                                        <button
                                                            style={{ marginRight: "15px" }}
                                                            key={j}
                                                            className="button"
                                                            id={`${i}.${j}`}
                                                            value={result.answer}
                                                            disabled
                                                        >{word}
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            )
                                        )
                                    }

                                    return (
                                        <pre
                                            id="question-container"
                                            className="is-pulled-left"
                                            style={{ letterSpacing: "3px", wordSpacing: "5px" }}
                                        >
                                            {result.statement}
                                            {question}
                                            <p className="mb-5">{this.state.answers.userAnswers[i]}</p>
                                            {/*{result.answer}*/}
                                        </pre>
                                    )
                                })}
                            </div>
                        </div>
                    </div >
                )
            })
        }

        return (
            <div>
                <div>{lesson}</div>
            </div >
        )

    }
}
export default Completed

//if (this.state.completed) {
//    axios.post('http://localhost:8080/api/userlessons', {
//        lessonId: this.props.lessonId,
//        userId: JSON.parse(localStorage.getItem('user')).id,
//        completed: this.state.completed,
//        userScore: this.state.score,
//        possibleScore: this.state.totalNumber
//    },
//        {
//            headers: authHeader()
//        }).then((result) => {
//            console.log(result)
//        }).catch(e => {
//            console.log(e)
//        })

//    return (
//        <div>
//            <p>Added</p>
//        </div>
//    )
//}
//    let percent = this.state.score / this.state.totalNumber * 100
//    let totalPercent = percent.toFixed(0)

//    return (
//        <div className="has-text-centered">
//            <div>
//                <h1 className="title">Your total is: {totalPercent}%</h1>
//                <br />
//                <h1 className="title">Your score is: {this.state.score} out of {this.state.totalNumber}. Good job!</h1>
//            </div>
//            <div>
//                <h2 className="subtitle is-4 mt-4 mb-1">Your answers:</h2>
//                {this.state.finalAnswer.map((ind) =>
//                    //this.state.questionList.map((index) =>
//                    <div>
//                        {/*<h3 className="subtitle is-5">{index.question}</h3>*/}
//                        <h3 className="subtitle is-5 mt-1" style={{}}>{ind}</h3>
//                    </div>
//                )}
//            </div>
//            <Link className="is-danger mt-5" to="/user">
//                <button className="button is-link">Back to Dashboard</button>
//            </Link>
//        </div>
//    )
//}