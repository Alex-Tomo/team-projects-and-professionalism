import React from "react"
import { GetQuestions } from "./GetQuestions"
import EnglishQuestions from "./EnglishQuestions"
import MathQuestions from "./MathQuestions"
import VerbalQuestions from "./VerbalQuestions"
import NonVerbalQuestions from "./NonVerbalQuestions"

/**
 * Returns the questions depending on what the lesson type is when user clicks on start
 *
 * @author Graham Stoves
 */

class Questions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: "",
            flag: false
        }
    }

    //This function gets the right questions depending on the lesson type. The question id list, lesson id and lesson name are all passed through using the getQuestions function
    getQuestionDetails = async (questionDetails) => {
        let questions = ""
        switch (questionDetails.type) {
            case "math":
                questions = <MathQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} lessonName={questionDetails.lessonName} />
                break
            case "english":
                questions = <EnglishQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} lessonName={questionDetails.lessonName} />
                break
            case "verbal_reasoning":
                questions = <VerbalQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} lessonName={questionDetails.lessonName} />
                break
            case "non_verbal_reasoning":
                questions = <NonVerbalQuestions question={questionDetails.questionArray} lessonId={questionDetails.lessonId} lessonName={questionDetails.lessonName} />
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
                    getQuestionDetails={(questionDetails) => this.getQuestionDetails(questionDetails)}
                />
            </div>
        )
    }
}

export default Questions