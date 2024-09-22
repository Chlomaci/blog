import {createAsyncThunk} from "@reduxjs/toolkit";
import {collection, getDocs} from "firebase/firestore";
import { query, orderBy, limit, endAt, startAt, limitToLast } from "firebase/firestore";
import {limitedPostsQuery} from "../../types/types";

export const fetchNewPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async (firestore: any, thunkAPI) => {
        try {
            const response = await getDocs(query(collection(firestore, 'posts'), orderBy("date"), limitToLast(4)));
            return response
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue('Произошла ошибка загрузки постов')
        }
    }
)

export const fetchLimitedPosts = createAsyncThunk(
    'posts/fetchLimitedPosts',
    async (props: limitedPostsQuery, thunkAPI) => {
        const {firestore, start} = props;
        try {
            const response = await getDocs(query(collection(firestore, 'posts'), limit(6), startAt()));
            return response
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue('Произошла ошибка загрузки постов')
        }
    }
)