import { FC, PropsWithChildren, useEffect } from "react";
import { getSeeds } from "../queries/Seeds";
import { initSeeds } from "../redux/seeds";
import { useAppDispatch, useAppSelector } from "../redux/store"
import Loader from "./Loader"

type IInitializer = {
    children: any
}

const Initializer: FC<IInitializer> = ({ children }) => {
    const seeds = useAppSelector(state => state.seeds);
    // const todos = useAppSelector(state => state.seeds);

    const dispatch = useAppDispatch()

    const appInitSeeds = async () => {
        const data = await getSeeds();
        dispatch(initSeeds(data))
    }
    useEffect(() => {
        appInitSeeds()
    }, [])

    if (!seeds.seeds) {
        return <Loader />
    }

    return children
}

export default Initializer