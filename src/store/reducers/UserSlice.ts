import {createSlice} from "@reduxjs/toolkit";
import {userState} from "../../types/types";

const initialState: userState = {
    login: 'Дарина',
    password: 'dawn1152',
    isLoading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {},
})

export default userSlice.reducer