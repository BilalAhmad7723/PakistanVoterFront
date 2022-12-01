import { createStore,combineReducers} from "redux";
import {SetUser,Subjects} from "../reducers/reducer.js";

const reducers = combineReducers({ SetUser,Subjects })

const store = createStore(reducers);
export default store;
