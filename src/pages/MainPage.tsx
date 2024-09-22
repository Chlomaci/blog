import React, {FC} from "react";
import Title from "../components/Title";
import RecentPosts from "../components/RecentPosts";
import AllPosts from "../components/AllPosts";

const MainPage: FC = () => {

 return (
     <div>
         <Title/>
         <RecentPosts/>
         <AllPosts/>
     </div>
 )
}

export default MainPage