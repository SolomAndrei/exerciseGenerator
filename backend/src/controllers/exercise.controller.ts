import { Request, Response, NextFunction } from 'express';
import {
    generateExercises,
    Difficulty,
    LEVELS,
    generateSingleQuestion,
} from '../services/exercise.service';
import { HttpError } from '../errors/HttpError';

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleGenerateExercises(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { topic, subtopic } = req.body;
        const exercises = await generateExercises(topic, subtopic);
        res.json({ exercises });
        // await delay(1000);
        // res.json(mockArray);
    } catch (error) {
        next(error);
    }
}

export async function regenerateExercise(
    req: Request<{ level: string }>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { topic, subtopic } = req.body;
        const levelParam = req.params.level;
        const level = LEVELS.find((lvl) => lvl.toLowerCase() === levelParam.toLowerCase()) as
            | Difficulty
            | undefined;
        if (!level) {
            throw new HttpError(
                400,
                `Invalid level parameter: ${levelParam}. Expected one of: ${LEVELS.join(', ')}`
            );
        }
        const question = await generateSingleQuestion(topic, subtopic, level);
        res.json({ question });
        // await delay(1000);
        // res.json(mockOneItem);
    } catch (error) {
        next(error);
    }
}
const mockArray = {
    exercises: {
        id: '162ae486-1edc-4da2-be90-229dfe24380f',
        topic: 'javascript',
        subtopic: 'react',
        createdAt: 1753190276518,
        levels: {
            beginner: [
                {
                    question: 'What is React?',
                    choices: [
                        'A JavaScript library for building user interfaces',
                        'A programming language',
                        'A database management system',
                        'A web browser',
                    ],
                    correctAnswer: 0,
                    explanation: 'React is a JavaScript library for building user interfaces.',
                    id: '954b1a5a-6927-4363-920f-0027c0fea8d1',
                },
                {
                    question:
                        'Which concept in React allows you to reuse code and build complex UIs from small, self-contained pieces?',
                    choices: ['Components', 'Variables', 'Functions', 'Loops'],
                    correctAnswer: 0,
                    explanation:
                        'Components in React allow you to reuse code and build complex UIs from small, self-contained pieces.',
                    id: '33fd23e9-a997-4386-a6e3-3fa9892c264f',
                },
                {
                    question: 'What is JSX in React?',
                    choices: [
                        'A syntax extension for JavaScript',
                        'A new programming language',
                        'A CSS preprocessor',
                        'A database query language',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'JSX is a syntax extension for JavaScript used in React to describe what the UI should look like.',
                    id: 'bb451b33-21bf-47a9-a5c3-a19617f594d3',
                },
                {
                    question: 'Which method is used to change the state of a React component?',
                    choices: ['setState()', 'changeState()', 'updateState()', 'modifyState()'],
                    correctAnswer: 0,
                    explanation:
                        'The setState() method is used to change the state of a React component.',
                    id: '5d7c52a6-8d96-435c-8c4f-9823a8622af1',
                },
                {
                    question: 'What is the virtual DOM in React?',
                    choices: [
                        'A lightweight copy of the actual DOM',
                        'A separate browser window',
                        'A server-side rendering technique',
                        'A database management tool',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The virtual DOM in React is a lightweight copy of the actual DOM that helps improve performance.',
                    id: '0c3bd728-0220-41e4-8fd3-1ec21f5c3dc5',
                },
                {
                    question:
                        'Which tool can be used to create a new React project with a single command?',
                    choices: ['Create React App', 'React Starter', 'Reactify', 'Build React'],
                    correctAnswer: 0,
                    explanation:
                        'Create React App is a tool that can be used to create a new React project with a single command.',
                    id: '630ad634-91d6-41ed-9d9b-f472a306ce22',
                },
                {
                    question: 'In React, what is the purpose of props?',
                    choices: [
                        'To pass data from parent to child components',
                        'To style the components',
                        'To handle user input',
                        'To manage state',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'Props in React are used to pass data from parent to child components.',
                    id: 'c1f4323e-1a02-4c0b-96d8-e9cfbe7a1a33',
                },
                {
                    question:
                        'Which lifecycle method is called after a component is rendered for the first time?',
                    choices: [
                        'componentDidMount()',
                        'componentWillUnmount()',
                        'componentWillUpdate()',
                        'componentDidUpdate()',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'componentDidMount() is called after a component is rendered for the first time in React.',
                    id: 'd2a20c3d-63b5-4142-97f1-3e5a9b93f100',
                },
                {
                    question: 'What is the purpose of the render() method in a React component?',
                    choices: [
                        "To return the JSX that represents the component's UI",
                        "To update the component's state",
                        'To handle user events',
                        'To define component styles',
                    ],
                    correctAnswer: 0,
                    explanation:
                        "The render() method in a React component is used to return the JSX that represents the component's UI.",
                    id: 'ff74ec5d-707c-4270-914c-27996701ac47',
                },
                {
                    question: 'Which of the following is NOT a core concept of React?',
                    choices: ['Two-way data binding', 'Components', 'Virtual DOM', 'JSX'],
                    correctAnswer: 0,
                    explanation: 'Two-way data binding is NOT a core concept of React.',
                    id: '10695c9d-9745-44fe-a837-8cde42eb2280',
                },
            ],
            intermediate: [
                {
                    question: 'What is JSX in React?',
                    choices: [
                        'JavaScript XML',
                        'JavaScript Extension',
                        'JavaScript Syntax',
                        'JavaScript Execute',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'JSX stands for JavaScript XML, which allows you to write HTML elements in JavaScript and is used by React to describe what the UI should look like.',
                    id: '2de0cc20-57f0-452d-aaf2-5b52627bd797',
                },
                {
                    question: 'In React, what is the purpose of state?',
                    choices: [
                        'To store data that may change over time',
                        'To store only static data',
                        'To handle routing in the application',
                        'To define the structure of components',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'State in React is used to store data that may change over time and can be updated using the setState method.',
                    id: '4177d529-baeb-4daf-8c06-88d5dcd9d89c',
                },
                {
                    question: 'What is a functional component in React?',
                    choices: [
                        'A component defined as a JavaScript function',
                        'A component that uses classes for definition',
                        'A component that only handles styling',
                        'A component that is not used in React',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'A functional component in React is defined as a JavaScript function that returns JSX to describe the UI.',
                    id: '5b2d5286-4885-4ca3-ba18-704b03083d56',
                },
                {
                    question: 'What is a prop in React?',
                    choices: [
                        'An input to a component',
                        'A local variable in a component',
                        'A CSS property',
                        'A built-in React method',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'A prop in React is an input to a component that allows the component to receive data from its parent component.',
                    id: '7289bde8-4f48-4227-8fd8-0dfe00c9a1c0',
                },
                {
                    question: 'What is the purpose of the useEffect hook in React?',
                    choices: [
                        'To perform side effects in function components',
                        "To define the component's initial state",
                        'To handle form submissions',
                        'To render JSX elements',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The useEffect hook in React is used to perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.',
                    id: '04a8946d-2151-4777-bd7f-315a3a49195e',
                },
                {
                    question: 'What is the virtual DOM in React?',
                    choices: [
                        'A lightweight copy of the actual DOM',
                        'A separate DOM for testing purposes',
                        'A DOM element with virtual reality features',
                        'A DOM element with enhanced styling capabilities',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The virtual DOM in React is a lightweight copy of the actual DOM that React uses to improve performance by minimizing direct manipulation of the real DOM.',
                    id: '7f0f64e1-4a5b-4d1b-8544-3cda96e423ae',
                },
                {
                    question: 'What is the purpose of keys in React lists?',
                    choices: [
                        'To uniquely identify list items and improve performance',
                        'To style list items',
                        'To hide list items from view',
                        'To reorder list items randomly',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'Keys in React lists are used to uniquely identify list items and help React identify which items have changed, are added, or are removed. This improves performance when updating lists.',
                    id: '920f7a40-b048-41b4-b5d2-7465a9a575c0',
                },
                {
                    question: 'What is the role of props drilling in React?',
                    choices: [
                        'Passing props through multiple levels of nested components',
                        'Styling components using props',
                        'Creating new props dynamically',
                        'Removing props from components',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'Props drilling in React refers to the process of passing props from a parent component through multiple levels of nested components to reach a deeply nested child component.',
                    id: '726b1668-60e3-4179-8974-b467e813216a',
                },
                {
                    question: 'What is the purpose of the useContext hook in React?',
                    choices: [
                        'To access context in functional components',
                        'To define context in class components',
                        'To handle user authentication',
                        'To create custom hooks',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The useContext hook in React is used to access context in functional components without explicitly passing props through every level of the component tree.',
                    id: '7432300f-0976-4ba0-97db-0496d423315a',
                },
                {
                    question: 'What is the role of the useMemo hook in React?',
                    choices: [
                        'To memoize expensive calculations in functional components',
                        "To update the component's state",
                        'To render JSX elements',
                        'To handle form submissions',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The useMemo hook in React is used to memoize expensive calculations in functional components, optimizing performance by caching the result of the computation.',
                    id: '421f5d86-a16e-4c4f-ae7e-e1bf95919ba4',
                },
            ],
            expert: [
                {
                    question: 'What is JSX in React?',
                    choices: [
                        'JavaScript XML',
                        'JavaScript Extension',
                        'JavaScript Syntax',
                        'JavaScript Framework',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'JSX stands for JavaScript XML and is a syntax extension for JavaScript used with React to describe what the UI should look like.',
                    id: '3fe03c61-b443-438d-a690-3f73d80c4310',
                },
                {
                    question: 'In React, what is the purpose of state?',
                    choices: [
                        'To store and manage data within a component',
                        'To define the structure of a component',
                        'To handle routing in the application',
                        'To manage global application state',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The state in React is used to store and manage data within a component, allowing the component to keep track of changing data and re-render when necessary.',
                    id: '98ff79e0-8f7c-4500-ab4f-19a1f325756c',
                },
                {
                    question: 'What is a functional component in React?',
                    choices: [
                        'A component defined as a JavaScript function',
                        'A component with complex logic and state management',
                        'A component that uses class syntax',
                        'A component that only handles styling',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'A functional component in React is defined as a JavaScript function that takes props as an argument and returns React elements to render.',
                    id: '171d7b91-f3a0-4bf3-be12-03f578e94c6f',
                },
                {
                    question: 'What is a prop drilling in React?',
                    choices: [
                        'Passing props through multiple levels of components',
                        'Injecting props directly into child components',
                        'Using props for styling purposes',
                        'Accessing props from a parent component',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'Prop drilling in React refers to the process of passing props from a parent component through multiple levels of child components, even if some intermediary components do not need the props.',
                    id: '25378d11-b0bb-4a53-b755-ad7a16487085',
                },
                {
                    question: 'What is the purpose of keys in React lists?',
                    choices: [
                        'To uniquely identify list items and improve performance',
                        'To style list items with unique identifiers',
                        'To filter and sort list items efficiently',
                        'To define the order of list items',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'Keys in React lists are used to uniquely identify list items, helping React identify which items have changed, are added, or are removed. This improves performance when rendering lists.',
                    id: '85c4a830-33f5-4eb0-9cc1-21310f91f718',
                },
                {
                    question: 'What is the virtual DOM in React?',
                    choices: [
                        'A lightweight copy of the actual DOM for performance optimization',
                        'A separate DOM for testing purposes',
                        'A DOM element with virtual styling',
                        'A DOM element with virtual events',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The virtual DOM in React is a lightweight copy of the actual DOM that React keeps in memory. It is used for performance optimization by allowing React to update only the necessary parts of the actual DOM.',
                    id: '735b5a97-74de-45d7-b5f3-2e8285e2e2fd',
                },
                {
                    question: 'What is the purpose of the useEffect hook in React?',
                    choices: [
                        'To perform side effects in function components',
                        'To define the initial state of a component',
                        'To handle user input events',
                        'To manage global application state',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The useEffect hook in React is used to perform side effects in function components. It allows you to execute additional logic after rendering, such as data fetching, subscriptions, or manually changing the DOM.',
                    id: '251ce146-d282-4bcd-92ce-05c637fe68e6',
                },
                {
                    question: 'What is the role of the render method in a React component?',
                    choices: [
                        "To return the JSX that represents the component's UI",
                        'To handle component state changes',
                        "To define the component's structure",
                        'To manage component lifecycle events',
                    ],
                    correctAnswer: 0,
                    explanation:
                        "The render method in a React component is responsible for returning the JSX that represents the component's UI. It is called whenever the component needs to be re-rendered due to changes in state or props.",
                    id: 'a389fdcc-553f-49bd-8c53-7fec460dacaf',
                },
                {
                    question: 'What is the purpose of the useContext hook in React?',
                    choices: [
                        'To access shared data without prop drilling',
                        'To handle component side effects',
                        'To define component-specific context',
                        'To manage component state',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The useContext hook in React is used to access shared data (such as global state or theme) without prop drilling. It allows components to subscribe to a context and re-render when the context value changes.',
                    id: '2304312e-03af-448f-ade6-c4e471426595',
                },
                {
                    question: 'What is the significance of the key prop in React components?',
                    choices: [
                        'To help React identify which items have changed, are added, or are removed in a list',
                        'To style components with unique identifiers',
                        'To define the order of components in a list',
                        'To manage component state changes',
                    ],
                    correctAnswer: 0,
                    explanation:
                        'The key prop in React components is used to help React identify which items have changed, are added, or are removed in a list. It is crucial for efficient list rendering and updating.',
                    id: '95e7f279-90e9-4594-9b1d-09a6d189e25c',
                },
            ],
        },
    },
};

const mockOneItem = {
    question: {
        question: 'Mock question about JSX',
        userAnswer: null,
        choices: [
            'JavaScript XML',
            'JavaScript Extension',
            'JavaScript Syntax',
            'JavaScript Execute',
        ],
        correctAnswer: 0,
        explanation:
            'JSX stands for JavaScript XML, which allows you to write HTML elements and JavaScript code together in React.',
        id: 'b735f691-c97d-4e93-9ea3-6aaab04c3641',
    },
};
