import React, { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default function Question({ current, questions, setAnswer, setCurrent, timeStart }) {

    let getDiff = () => {
        let start = moment(timeStart)
        let end = moment(new Date())
        return end.subtract(start).format("mm:ss")
    }

    useEffect(() => {
        let setTime = () => {
            document.querySelector(".question__timer").innerHTML = getDiff()
        }

        let timerId = setInterval(setTime, 1000)
        return () => {
            clearInterval(timerId)
        }
    })

    let moveBack = (_) => {
        let currentPosition = questions.map(q => q.question).indexOf(current.question)
        if (currentPosition !== 0) {
            setCurrent(Object.assign({}, questions[currentPosition - 1]))
        }
    }

    let moveForward = (_) => {
        let currentPosition = questions.map(q => q.question).indexOf(current.question)
        if (currentPosition !== questions.length - 1) {
            setCurrent(Object.assign({}, questions[currentPosition + 1]))
        }
    }

    if (!current.options)
        return ""
    let options = current.options.map((option, i) => {
        let className = "bg-indigo-500 text-white font-semibold rounded-md"
        if (current.userAnswer !== "") {
            if (current.userAnswer !== current.answer) {
                if (option.text === current.answer) {
                    className = "bg-green-500 text-white font-semibold rounded-md"
                }
                if (option.text === current.userAnswer) {
                    className = "bg-red-500 text-white font-semibold rounded-md"
                }
            }
            if (current.userAnswer === current.answer) {
                if (option.text === current.userAnswer) {
                    className = "bg-green-500 text-white font-semibold rounded-md"
                }
            }
        }
        return <button
            disabled={current.userAnswer !== ""}
            className={className}
            key={"option-" + i}
            onClick={() => setAnswer(option.text)}
        >
            {/* {i + 1}. {option.text} */}
            {option.text}
        </button>
    })
    let currentPosition = questions.map(q => q.question).indexOf(current.question)
    let disabledBack = currentPosition === 0
    let disabledForward = currentPosition === questions.length - 1
    return (
        [
            <div key={"content"} className="question__content bg-indigo-900 rounded-md text-white">
                <h1 className="font-semibold">{current.theme}</h1>
                <h1 className="question__timer font-semibold">{getDiff()}</h1>
                <h1 className="font-semibold">{currentPosition + 1}. {current.question}</h1>
            </div>,
            <div key={"options"} className="question__options">
                {options}
            </div>,
            <div key={"controls"} className="question__controls">
                <button key="back" onClick={moveBack} disabled={disabledBack} className="bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-md">&#8592;</button>
                <Link to="/result" href="##" key="stop" className="bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md">Закончить</Link>
                <button key="forward" onClick={moveForward} disabled={disabledForward} className="bg-blue-700 hover:bg-blue-900 text-white font-bold rounded-md">&#8594;</button>
            </div>
        ]
    )
}
