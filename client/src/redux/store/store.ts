import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducer/reducer";
import ThunkMiddleware from "redux-thunk";

export type Reducer = ReturnType<typeof reducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//esta linea nos permite conectarnos con la extension del navegador => REDUX DEVTOOLS
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //para conectarnos con la extension del nav.

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ThunkMiddleware)) //esta linea es para poder hacer peticiones a un server
);

export default store;
