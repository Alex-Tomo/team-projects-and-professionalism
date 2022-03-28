import React from "react"
import Completed from "./Completed"
import { GetCompletedLessons } from './GetCompletedLessons'

class CompletedLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: "",
            flag: false
        }
    }

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

