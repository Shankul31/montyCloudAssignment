import { ActionTypes } from "../constants/action-types"
export const setNewsFeeds = (results) => {
    return {
        type: ActionTypes.SET_NEWS_FEEDS,
        payload: results
    }

}