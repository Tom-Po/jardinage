import { RouteProps } from "react-router-dom";
import About from "../component/About";
import SeedList from "../component/SeedList";
import TodoList from "../component/TodoList";

export type NamedRoute = RouteProps & { path: string, name: string }

export const routes: NamedRoute[] = [
    {
        name: 'Semis',
        path: '/',
        element: <SeedList />,
    },
    {
        name: 'A faire',
        path: '/todos',
        element: <TodoList />
    },
    {
        name: 'Notes',
        path: '/about',
        element: <About />
    }
]