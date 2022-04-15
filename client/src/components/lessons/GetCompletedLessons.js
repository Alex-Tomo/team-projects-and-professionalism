import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Passes lesson id, answers, score and the potential score through the url to 
 * get the right completed lessons when the user clicks on view
 *
 * @author Graham Stoves
 */

const GetCompletedLessons = (props) => {
    let flag = props.flag
    const location = useLocation()
    const { lessonId, answers, score, potentialScore } = location.state

    useEffect(async () => {
        if ((!flag) && (lessonId !== undefined) && (answers !== undefined) && (score !== undefined) && (potentialScore !== undefined)) {
            await props.getLessonDetails({ lessonId, answers, score, potentialScore })
            flag = true
        }
    })
    return <></>
}

export { GetCompletedLessons } 
