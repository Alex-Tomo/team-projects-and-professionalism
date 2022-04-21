import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Passes lesson_id through the url to get the right lesson for when user
 * wants to download a lesson to PDF
 *
 * @author Graham Stoves
 */

const GetFullLesson = (props) => {
    let flag = props.flag
    const location = useLocation()
    const { lessonId } = location.state

    useEffect(async () => {
        if ((!flag) && (lessonId !== undefined)) {
            await props.getLessonId({ lessonId })
            flag = true
        }
    })
    return <></>
}


export { GetFullLesson } 
