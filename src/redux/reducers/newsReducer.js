import { ActionTypes } from "../constants/action-types";

export const initialState = {
    results: []
};

export const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_NEWS_FEEDS:
            return { ...state, results: payload }
        default:
            return state;
    }
}

export default newsReducer;