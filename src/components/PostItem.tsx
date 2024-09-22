import {postProps} from "../types/types";
import React, {FC} from "react";
import './style/postItem.scss'
import Tags from "./Tags";

const PostItem: FC<postProps> = ({post, id}) => {
    const {date, title, descr, tags, coverImg} = post;
    const actualDate = new Date (date as any * 1000).toLocaleString("ru-RU", {
        month: "long",
        day: "numeric",
        hour: 'numeric',
        minute: 'numeric'
    });

    const shortText = descr.slice(0, 200) + '...';
    const mediumText = descr.slice(0, 250) + '...';
    const longText = descr.slice(0, 650) + '...';

    return (
        <div className='post__item' id={id}>
            <div className="post__img" style={{backgroundImage: `url(${coverImg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className="post__data">
                <div className="post__date">{actualDate}</div>
                <div className="post__title"> {title}</div>
                <div className="post__descr">{id === 'post4' ? longText
                                            : id === 'post2' || id === 'post3' ? shortText
                                            : mediumText}</div>
                <Tags tags={tags}/>
            </div>
        </div>
    )
}

export default PostItem;