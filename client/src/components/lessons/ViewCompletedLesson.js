import React from "react"
import Completed from "./Completed"
import { GetCompletedLessons } from './GetCompletedLessons'

/**
 * Returns the completed lesson with the parameters answers, lessonId, score and potential score
 *
 * @author Graham Stoves
 */

class ViewCompletedLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: "",
            flag: false
        }
    }

    getLessonDetails = async (lessonDetails) => {
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
                    getLessonDetails={(lessonDetails) => this.getLessonDetails(lessonDetails)}
                />
            </div>
        )
    }
}

export default ViewCompletedLesson

