import * as Types from "./types";

export const initialState = {
    magnet : "",
    updatedAt : new Date()
}

export const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case Types.UPDATE_MAGNET:
            state = {
                magnet: payload.trim(),
                updatedAt: new Date()
            }
            return state;
        default:
            return state;
    }
}