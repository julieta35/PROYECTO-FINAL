import {
    SET_CURRENT_SERVICES, SET_CURRENT_MY_SERVICES,
} from "../actions/types";

const initialState = {
    services: [],
    myServices: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_SERVICES:
        return {
            ...state,
            services: action.payload
        };
        case SET_CURRENT_MY_SERVICES:
        return {
                ...state,
                myServices: action.payload
        };
        default:
        return state;
    }
}