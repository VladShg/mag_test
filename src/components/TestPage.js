import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Question from "./Question"
import QuestionMap from './QuestionMap'

export default function TestPage({ current, themes, questions, timeStart, setQuestions, setCurrent }) {
    useEffect(() => {
        setCurrent(questions[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!themes || themes.length === 0 || !questions || questions.length === 0) {
        return <Redirect to="/start" />
    }

    let setAnswer = (answer) => {
        let currentPosition = questions.map(q => q.question).indexOf(current.question)
        let newQuestions = Array.from(questions)
        let question = newQuestions[currentPosition]
        question.userAnswer = answer
        setQuestions(newQuestions)
    }

    return (
        <div className="question container">
            {current ? <Question setAnswer={setAnswer} timeStart={timeStart} current={current} questions={questions} setCurrent={setCurrent} /> : ""}
            {current ? <QuestionMap current={current} setCurrent={setCurrent} questions={questions} /> : ""}
        </div>
    )
}
