import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

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
