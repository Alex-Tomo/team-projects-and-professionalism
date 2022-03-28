import React from "react"
import EnglishQuestions from "./EnglishQuestions"
import MathQuestions from "./MathQuestions"
import { GetQuestions } from "./GetQuestions"
import VerbalQuestions from "./VerbalQuestions"
import NonVerbalQuestions from "./NonVerbalQuestions"


// note for alex: => looked at


class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: "",
            flag: false
        }
    }

    getQuestionsAndType = async (questionDetails) => {
        let questions = ""
        switch (questionDetails.type) {
            case "math":
                questions = <MathQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} />
                break
            case "english":
                questions = <EnglishQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} />
                break
            case "verbal_reasoning":
                questions = <VerbalQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} />
                break
            case "non_verbal_reasoning":
                questions = <NonVerbalQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} />

                break
            default:
                await this.setState({
                    flag: false
                })
                return
        }

        await this.setState({
            questions: questions,
            flag: true
        })
    }

    render() {
        return (
            <div>
                {(this.state.questions === "") ? "Loading..." : this.state.questions}
                <GetQuestions
                    props={this.props}
                    flag={this.state.flag}
                    getQuestionsAndType={(questionDetails) => this.getQuestionsAndType(questionDetails)}
                />
            </div>
        )
    }
}

export default Questions

