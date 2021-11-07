import { showHideLargeImg } from './reducers/LargeImg';
import { createStore,combineReducers, compose } from "redux";
import {main} from './reducers/Main'

const root=combineReducers({
        main,
        showHideLargeImg
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store=createStore(root,composeEnhancers())

export type actionsType=ReturnType <typeof root>

