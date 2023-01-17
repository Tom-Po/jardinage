import { RouteProps } from "react-router-dom";
import About from "../component/About";
import Calendar from "../component/Calendar";
import SeedAddForm from "../component/SeedAddForm";
import SeedList from "../component/SeedList";
import TodoList from "../component/TodoList";

export type NamedRoute = RouteProps & { path: string, name: string }

export const routes: NamedRoute[] = [
    {
        name: 'Calendar',
        path: '/',
        element: <Calendar />
    },
    {
        name: 'Créer un semi',
        path: '/seeds',
        element: <>
            <SeedList />
            <SeedAddForm onSubmit={() => { }} />,
        </>
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