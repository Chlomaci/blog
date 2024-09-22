import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import firebaseReducer from './reducers/FirebaseSlice'
import postReducer from './reducers/PostSlice'

const rootReducer = combineReducers({
    userReducer,
    firebaseReducer,
    postReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
