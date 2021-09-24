import { createStore } from 'redux';
import { initialState, Reducer } from './reducer';
import * as Types from "./types";

export const store = createStore(Reducer, initialState);

// store.subscribe(()=>{
//     console.log("Store now is -",store.getState());
// })

// store.dispatch({
//     type: Types.UPDATE_MAGNET,
//     payload: "idk"
// })

// store.dispatch({
//     type: Types.UPDATE_MAGNET,
//     payload: "asdfasd"
// })

export const updateMagnet = (newMagnet) => {
    store.dispatch({
        type: Types.UPDATE_MAGNET,
        payload: newMagnet
    })
}

export const getMagnet = () => {
    return store.getState().magnet;
}