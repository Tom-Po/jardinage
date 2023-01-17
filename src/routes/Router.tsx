import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export function AppRouter() {
    return (
        <Routes>
            {/* {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))} */}
            {routes.map(({ path, element, subRoutes }) => {
                if (subRoutes.length) {
                    return (
                        <Route key={path} path={path} element={element}>
                            {subRoutes.map(({ path, element: subElement }) => (
                                <Route key={path} path={path} element={subElement} />
                            ))}
                        </Route>
                    )
                } else {
                    return <Route key={path} path={path} element={element} />
                }
            })}
        </Routes>
    )
}