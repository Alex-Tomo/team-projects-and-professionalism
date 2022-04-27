import React from "react"
import Completed from "./Completed"
import { GetCompletedLessons } from './GetCompletedLessons'

/**
 * Returns the completed lesson with the answer, lesson id, score and potential score passed 
 * through
 *
 * @author Graham Stoves
 */
class CompletedLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: "",
            flag: false
        }
    }

    //This gets the completed lesson and passes through a number of lesson details 
    getLessonIdAndAnswers = async (lessonDetails) => {
        let lessons = <Completed answer={lessonDetails.answers} lessonId={lessonDetails.lessonId} score={lessonDetails.score} potentialScore={lessonDetails.potentialScore} />

        await this.setState({
            lessons: lessons,
            flag: true
        })
        return
    }

    render() {
        return (
            <div>
                {(this.state.lessons === "") ? "Loading..." : this.state.lessons}
                <GetCompletedLessons
                    props={this.props}
                    flag={this.state.flag}
                    getLessonIdAndAnswers={(lessonDetails) => this.getLessonIdAndAnswers(lessonDetails)}
                />
            </div>
        )
    }
}

export default CompletedLesson