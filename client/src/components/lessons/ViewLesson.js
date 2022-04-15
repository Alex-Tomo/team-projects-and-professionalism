import React from "react"
import SaveLessonToPdf from "./SaveLessonToPdf"
import { GetFullLesson } from './GetFullLesson'

/**
 * Returns the lessons with the parameters lessonId
 *
 * @author Graham Stoves
 */

class ViewLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lessons: "",
            flag: false
        }
    }

    getLessonId = async (lessonDetails) => {
        let lessons = <SaveLessonToPdf lessonId={lessonDetails.lessonId} />

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
                <GetFullLesson
                    props={this.props}
                    flag={this.state.flag}
                    getLessonId={(lessonDetails) => this.getLessonId(lessonDetails)}
                />
            </div>
        )
    }
}

export default ViewLesson

