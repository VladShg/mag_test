import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function TestStatsPage({ questions }) {
    if (!questions) {
        return <Redirect to="/start" />
    }
    let groups = []
    let questionsGroup = []
    for (let g of questions.filter(q => q.theme)) {
        if (groups.indexOf(g.theme) === -1) {
            groups.push(g.theme)
            questionsGroup.push([])
        } else {
            questionsGroup[groups.indexOf(g.theme)].push(g)
        }
    }
    let grouped = groups.map((g, i) => {
        return {
            theme: g,
            questions: Array.from(questionsGroup[i])
        }
    })
    grouped = grouped.map(group => {
        let correct = group.questions.filter(q => q.answer === q.userAnswer)
        return (
            <div className="result__theme rounded-lg bg-indigo-500">
                <h1 className="theme__header text-lg text-white font-semibold font-xl">{group.theme}</h1>
                <h1 className="theme__count text-lg text-white font-semibold font-xl">Правильных ответов: {correct.length} из {group.questions.length}</h1>
            </div>
        )
    })

    return (
        <div className="container result">
            <div className="result__header rounded-lg bg-indigo-900">
                <h1 className="text-white text-lg font-semibold">Результаты</h1>
            </div>
            <div className="result__body">
                {grouped}
            </div>
            <div className="result__controls">
                <Link to="/start" className="result__restart rounded-lg bg-green-500 text-white text-lg font-semibold text-lg">Начать заново</Link>
            </div>
        </div>
    )
}
