import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface postState {
    newPosts: postInterface[],
    limitedPosts: postInterface[],
    allPosts: postInterface[],
    isLoading: boolean,
    error: boolean | string,
    formActive: boolean,
}
export interface postInterface {
    content: string,
    coverImg: string,
    title: string,
    descr: string,
    date: Timestamp,
    tags: string[]
}
export interface userState {
    login: string;
    password: string;
    isLoading: boolean;
    error: boolean;
}

export interface postProps {
    post: postInterface,
    id: string,
}

export interface tagInterface {
    tags: string[]
}

export interface limitedPostsQuery {
    firestore: any,
    start: number,
}


