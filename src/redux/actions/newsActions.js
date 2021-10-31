import { ActionTypes } from "../constants/action-types"
export const setNewsFeeds = (results) => {
    return {
        type: ActionTypes.SET_NEWS_FEEDS,
        payload: results
    }
}
export const setUserInput = (searchTerm) => {
    return {
        type: ActionTypes.SET_USER_INPUT,
        payload: searchTerm
    }
}

