import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heart from "../media/hardcore.png";
import themeAPZ from "./../questions/apz.json";
import themeAPZ2 from "./../questions/apz2.json";
import Theme from "./Theme";
import shuffleArray from "../utils/randomize";

export default function WelcomePage({ themes, setThemes, setQuestions, setTimeStart }) {
    let toggleTheme = (theme) => {
        let _themes = Array.from(themes);
        if (_themes.indexOf(theme.name) === -1) _themes.push(theme.name);
        else _themes = _themes.filter((t) => t !== theme.name);
        setThemes(_themes);
    };
    let themesObj = [themeAPZ, themeAPZ2];

    useEffect(() => {
        let preSelected = [themeAPZ, themeAPZ2].filter((t) => t.selected);
        setThemes(preSelected.map(t => t.name))
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let themesElements = Array.from(themesObj);
    themesElements = themesElements.map((t, i) => {
        return <Theme
            key={"theme-" + i}
            theme={Object.assign({}, t, { id: i })}
            toggleTheme={toggleTheme}
            selected={themes.indexOf(t.name) !== -1}
        />
    });

    let startTest = (_) => {
        let _themes = themesObj.filter(obj => themes.indexOf(obj.name) !== -1)
        let questions = []
        for (let theme of _themes) {
            let theme_questions = []
            for (let question of theme.questions) {
                let options = question.options.map((option) => {
                    return {
                        text: option[0],
                        isAnswer: option[1]
                    }
                })
                shuffleArray(options)
                theme_questions.push({
                    theme: theme.name,
                    question: question.question,
                    userAnswer: "",
                    answer: question.options.filter(option => option[1] === 1)[0][0], // option = [текст, isAnswer]
                    options: options
                })
            }
            shuffleArray(theme_questions)
            questions = questions.concat(theme_questions)
        }
        setQuestions(questions)
        setTimeStart(new Date())
    }

    let startDisabled = themes.length === 0;
    return (
        <div className="welcome container">
            <h1 className="text-3xl font-bold text-black welcome__header self-center">
                Вопросы на магистратуру 2020
            </h1>
            <h1 className="text-2xl font-bold text-black welcome__header">
                Выбор тем
            </h1>
            <div className="welcome__themes">{themesElements}</div>
            <div className="welcome__start">
                <Link
                    className="welcome__start shadow-md rounded-md font-bold bg-indigo-500 hover:bg-indigo-700 text-white text-center"
                    to="/test"
                    onClick={startTest}
                    disabled={startDisabled}
                >
                    Начать
                </Link>
                {/* <div className="start__mode select-container rounded-md bg-red-700 hover:bg-red-800 text-white text-center font-bold">
                    <label htmlFor="hardmode">
                        <input
                            id="hardmode"
                            type="checkbox"
                            className="checked:bg-red-300 checked:border-transparent"
                        />
                        <span className="cursor-pointer">Хардмод</span>
                        <img
                            src={heart}
                            className="animate-pulse cursor-pointer"
                            alt=""
                        />
                    </label>
                </div> */}
            </div>
        </div>
    );
}
