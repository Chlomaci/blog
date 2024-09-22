import {FC} from "react";
import RecentPostsList from "./RecentPostsList";
import './style/recentPosts.scss'

const RecentPosts: FC = () => {
    return (
        <div className='recent'>
            <h2 className='subtitle'>Последние посты</h2>
            <RecentPostsList/>
        </div>
    )
}

export default RecentPosts;