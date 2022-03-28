import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

const GetCompletedLessons = (props) => {
    let flag = props.flag
    const location = useLocation()
    const { lessonId, answers, score, potentialScore } = location.state

    useEffect(async () => {
        if ((!flag) && (lessonId !== undefined) && (answers !== undefined) && (score !== undefined) && (potentialScore !== undefined)) {
            await props.getLessonIdAndAnswers({ lessonId, answers, score, potentialScore })
            flag = true
        }
    })

    return <></>
}


export { GetCompletedLessons } 
