const TOGLE_PRELOADER = 'TOGLE_PRELOADER';

let initialState = {
    isPreloading : false
}

const contentReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGLE_PRELOADER: 
            return {...state, isPreloading: !state.isPreloading}


        default: return state;
    }
}

export const togglePreloader = () =>({ type: TOGLE_PRELOADER})

export default contentReducer;