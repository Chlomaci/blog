import {createSlice} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyDi7fVZIm0oPP9HlQlCSy_gLuaJuKs7yDQ",
    authDomain: "darina-s-blog.firebaseapp.com",
    projectId: "darina-s-blog",
    //storageBucket: "darina-s-blog.appspot.com/download",
    storageBucket: "gs://darina-s-blog.appspot.com",
    messagingSenderId: "433460331865",
    appId: "1:433460331865:web:a35c094c8b4f5f2b163848",
    measurementId: "G-ZG12VKCT1D",
});

const firestore = getFirestore(app);
const storage = getStorage();

const initialState = {
    app,
    firestore,
    storage
}

export const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {},
})

export default firebaseSlice.reducer