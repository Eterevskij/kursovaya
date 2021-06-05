import thunkMiddleware from "redux-thunk";
import  {applyMiddleware, combineReducers, createStore} from "redux";

import tablesReducer from "./tables-reducer";
import contentReducer from "./content-reducer";


let reducers = combineReducers({
    tables: tablesReducer,
    content: contentReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

store.subscribe(()=>{console.log("Хрнанилище обновлено!", store.getState());})

window.store = store;

export default store;