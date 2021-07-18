import React from 'react'

export default function QuestionMap({ current, questions, setCurrent }) {
    let currentPosition = questions.map(q => q.question).indexOf(current.question)

    let grid = questions.map((question, i) => {
        let className = "font-bold hover:border-1 rounded-md bg-blue-200 hover:bg-blue-300"
        if (currentPosition === i)
            className = "font-bold border-2 ring-2 ring-opacity-75 ring-blue-700 rounded-md bg-blue-200"
        if (question.userAnswer && question.userAnswer === question.answer) {
            className = className.replace(/bg-\w*-\d{3}/, " bg-green-200")
        } else if (question.userAnswer && question.userAnswer !== question.answer) {
            className = className.replace(/bg-\w*-\d{3}/, " bg-red-200")
        }
        return (
            <button
                className={className}
                title={question.question}
                data-number={i}
                key={"button-map-" + i}
                onClick={(event) => {
                    let number = event.target.getAttribute("data-number")
                    _setCurrent(number)
                    event.preventDefault()
                }}
            >{i + 1}</button>
        )
    })

    let _setCurrent = (buttonNumber) => {
        setCurrent(questions[buttonNumber])
    }

    return (
        <div className="map">
            {grid}
        </div>
    )
}
