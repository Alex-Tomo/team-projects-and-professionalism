import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"


// note for alex: => looked at

const GetQuestions = (props) => {
    let flag = props.flag
    const location = useLocation()
    const { questionArray, type, lessonId } = location.state

    useEffect(async () => {
        if ((!flag) && (type !== undefined) && (questionArray !== undefined) && (lessonId !== undefined)) {
            await props.getQuestionsAndType({ questionArray, type, lessonId })
            flag = true
        }
    })

    return <></>
}


export { GetQuestions } 
