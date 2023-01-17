import { RouteProps } from "react-router-dom";
import About from "../component/About";
import Calendar from "../component/Calendar";
import SeedAddForm from "../component/SeedAddForm";
import SeedList from "../component/SeedList";
import TodoList from "../component/TodoList";
import SeedScreen from "../screens/SeedScreen";

export type NamedRoute = RouteProps & { path: string, name: string, subRoutes: NamedRoute[] }

export const routes: NamedRoute[] = [
    {
        name: 'Calendrier',
        path: '/',
        element: <Calendar />,
        subRoutes: []
    },
    {
        name: 'Semis',
        path: 'seeds',
        element: <SeedScreen />,
        subRoutes: [{
            name: 'Semis',
            path: '/seeds',
            element: <SeedList />,
            subRoutes: []
        },
        {
            name: 'Créer un semis',
            path: '/seeds/create',
            element: <SeedAddForm onSubmit={() => { }} />,
            subRoutes: []
        }]
    },
    {
        name: 'A faire',
        path: 'todos',
        element: <TodoList />,
        subRoutes: []
    },
    {
        name: 'Notes',
        path: 'about',
        element: <About />,
        subRoutes: []
    }
]