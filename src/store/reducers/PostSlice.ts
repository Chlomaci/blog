import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {postInterface, postState} from "../../types/types";
import {fetchLimitedPosts, fetchNewPosts} from "./ActionCreators";
import {QuerySnapshot} from '@firebase/firestore-types';

const initialState: postState = {
    newPosts: [],
    limitedPosts: [],
    allPosts: [],
    isLoading: false,
    error: false,
    formActive: false,
}
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        formChangeActivity(state) {
            state.formActive = !state.formActive;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewPosts.fulfilled.type, (state, action: PayloadAction<QuerySnapshot<postInterface>>) => {
            let newPosts: postInterface[] = [];
            action.payload.forEach(post => {
                newPosts.unshift(post.data())
                state.newPosts = newPosts;
            })
            state.isLoading = false;
            state.error = false;
        })
        builder.addCase(fetchNewPosts.pending.type, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        builder.addCase(fetchNewPosts.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('ошибка это' + state.error)
        })
        builder.addCase(fetchLimitedPosts.fulfilled.type, (state, action: PayloadAction<QuerySnapshot<postInterface>>) => {
            let limitedPosts: postInterface[] = [];
            action.payload.forEach(post => {
                limitedPosts.unshift(post.data());
                state.limitedPosts = limitedPosts;
            })
            state.isLoading = false;
            state.error = false;
        })
        builder.addCase(fetchLimitedPosts.pending.type, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        builder.addCase(fetchLimitedPosts.rejected.type, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('ошибка это' + state.error)
        })
    },
})

export default postSlice.reducer
export const {formChangeActivity} = postSlice.actions