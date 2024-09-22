import './App.scss';
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import React, {ReactEventHandler, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {CircularProgress} from "@mui/material";
import {fetchNewPosts, fetchLimitedPosts} from "./store/reducers/ActionCreators";
import PostForm from "./components/PostForm";
import {formChangeActivity} from "./store/reducers/PostSlice";

function App() {
    const {error} = useAppSelector(state => state.postReducer);
    const {isLoading} = useAppSelector(state => state.postReducer);
    const {firestore} = useAppSelector(state => state.firebaseReducer);
    const {newPosts, limitedPosts} = useAppSelector(state => state.postReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchNewPosts(firestore));
        dispatch(fetchLimitedPosts({firestore, start: -4}));
        console.log(limitedPosts)
    }, [])

    const onModal = () => {
        dispatch(formChangeActivity())
    }

  return (
      <div className="App">
          <PostForm onModal={onModal}/>
          <Header onModal={onModal}/>
          {isLoading ? <CircularProgress /> : <MainPage/>}
          {error ? error : ''}
      </div>
  );
}

export default App;
