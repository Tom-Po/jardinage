import { combineReducers } from "redux";
import seedReducer from './seeds';

const reducer = combineReducers({
    seeds: seedReducer
})
export default reducer
export type RootState = ReturnType<typeof reducer>
