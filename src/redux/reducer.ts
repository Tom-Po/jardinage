import { combineReducers } from "redux";
import seedReducer from './seeds';
import { seedsApi } from "./seedsApi";

const reducer = combineReducers({
    seeds: seedReducer,
    [seedsApi.reducerPath]: seedsApi.reducer
})
export default reducer
export type RootState = ReturnType<typeof reducer>
