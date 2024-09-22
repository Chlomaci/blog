import {FC} from "react";
import {tagInterface} from "../types/types";
import './style/tags.scss'

const Tags: FC<tagInterface> = ({tags}) => {

    enum TagVariations {
        NEW = 'Новое',
        OLD = 'Старое',
        MEANINGFUL = 'Осмысленное',
        MEANINGLESS = 'Бессмысленное'
    }

    return (
        <div className='tags'>
            {tags.map(tag => {
                return <div className='tag'
                            style={
                                tag === TagVariations.NEW ? {color: '#C11574', backgroundColor: 'rgba(253, 242, 250)'} :
                                tag === TagVariations.OLD ? {color: '#3538CD', backgroundColor: 'rgba(238, 244, 255)'} :
                                tag === TagVariations.MEANINGFUL ? {color: '#6941C6', backgroundColor: 'rgba(249, 245, 255)'} :
                                tag === TagVariations.MEANINGLESS ? {color: '#027A48', backgroundColor: 'rgba(236, 253, 243)'} : {}
                            }>{tag}</div>
            })}
        </div>
    )
}

export default Tags;