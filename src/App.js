import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TestContext } from "./context/TestContext";
import { useRoutes } from "./routes";

function App() {
    let routes = useRoutes()
    const [themes, setThemes] = useState([])
    const [timeEnd, setTimeEnd] = useState(null)
    const [timeStart, setTimeStart] = useState(null)
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState({})

    const context = {
        themes: themes,
        current: current,
        timeEnd: timeEnd,
        timeStart: timeStart,
        questions: questions,
        setThemes: setThemes,
        setCurrent: setCurrent,
        setTimeEnd: setTimeEnd,
        setTimeStart: setTimeStart,
        setQuestions: setQuestions
    }

    return (
        <TestContext.Provider value={context}>
            <Router>{routes}</Router>
        </TestContext.Provider>
    );
}

export default App;
