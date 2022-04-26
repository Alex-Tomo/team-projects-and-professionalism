import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Passes question list, lesson type, lesson id and the lesson name through the url to get the 
 * right lesson.
 * Uselocation is used to obtain information about the current URL and allows certain values to 
 * be passed through.
 *
 * @author Graham Stoves
 */

const GetQuestions = (props) => {
    let flag = props.flag
    const location = useLocation()
    const { questionArray, type, lessonId, lessonName } = location.state

    useEffect(async () => {
        if ((!flag) && (type !== undefined) && (questionArray !== undefined) && (lessonId !== undefined) && (lessonName !== undefined)) {
            await props.getQuestionDetails({ questionArray, type, lessonId, lessonName })
            flag = true
        }
    })
    return <></>
}

export { GetQuestions } 
