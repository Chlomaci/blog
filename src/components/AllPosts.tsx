import {FC} from "react";
import './style/allPosts.scss'
import AllPostsList from "./AllPostsList";

const AllPosts: FC = () => {
    return (
        <div className='all__posts'>
            <h2 className='subtitle'>Последние посты</h2>
            <AllPostsList/>
        </div>
    )
}

export default AllPosts;