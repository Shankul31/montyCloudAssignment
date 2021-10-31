import { ActionTypes } from "../constants/action-types";

export const initialState = {
    data: [],
    searchTerm: ''
};

export const newsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_NEWS_FEEDS:
            return { ...state, data: payload }
        case ActionTypes.SET_USER_INPUT:
            return { searchTerm: payload }
        default:
            return state;
    }
}

export default newsReducer;