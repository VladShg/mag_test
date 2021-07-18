import { createContext } from "react";

export const TestContext = createContext({
    themes: [],
    timeEnd: [],
    progress: [],
    timeStart: [],
    questions: [],
    setThemes: () => {},
    setTimeEnd: () => {},
    setProgress: () => {},
    setTimeStart: () => {},
    setQuestions: () => {},
});
