import {FC} from "react";
import {useAppSelector} from "../hooks/redux";
import PostItem from "./PostItem";
import './style/recentPostsList.scss'

const RecentPostsList: FC = () => {

    const {newPosts} = useAppSelector(state => state.postReducer);

    return (
        <div className='recent__posts'>
            {newPosts.map((post, i) => {
                return <PostItem post={post} id={`post${i+1}`} key={i}></PostItem>
            })}
        </div>
    )
}

export default RecentPostsList;