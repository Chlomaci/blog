import {FC} from "react";
import './style/allPostsList.scss'
import {useAppSelector} from "../hooks/redux";

const AllPostsList: FC = () => {

    const {limitedPosts} = useAppSelector(state => state.postReducer);

    return (
        <div className='all__posts__list'>

        </div>
    )
}

export default AllPostsList