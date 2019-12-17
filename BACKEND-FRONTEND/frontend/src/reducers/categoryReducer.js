import {
    SET_CURRENT_CATEGORIES,
} from "../actions/types";

const initialState = {
    categories: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_CATEGORIES:
        return {
            ...state,
            categories: action.payload
        };
        default:
        return state;
    }
}