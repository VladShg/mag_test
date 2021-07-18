import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TestPage from "./components/TestPage";
import WelcomePage from "./components/WelcomePage";
import TestStatsPage from "./components/TestStatsPage";
import { TestContext } from "./context/TestContext";

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/start" exact>
                <TestContext.Consumer>
                    {({ themes, setThemes, setQuestions, setTimeStart }) => {
                        return <WelcomePage
                            themes={themes}
                            setThemes={setThemes}
                            setQuestions={setQuestions}
                            setTimeStart={setTimeStart}
                        />
                    }}
                </TestContext.Consumer>
            </Route>
            <Route path="/test" exact>
                <TestContext.Consumer>
                    {({ themes, questions, setQuestions, current, setCurrent, timeStart }) => {
                        return <TestPage
                            themes={themes}
                            timeStart={timeStart}
                            questions={questions}
                            setQuestions={setQuestions}
                            current={current}
                            setCurrent={setCurrent}
                        />
                    }}
                </TestContext.Consumer>
            </Route>
            <Route path="/result" exact>
                <TestContext.Consumer>
                    {({ questions, timeStart }) => {
                        return <TestStatsPage
                            timeStart={timeStart}
                            questions={questions}
                        />
                    }}
                </TestContext.Consumer>
            </Route>
            <Redirect to="/start" />
        </Switch>
    );
};
