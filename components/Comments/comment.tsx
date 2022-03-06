/* eslint-disable @next/next/no-img-element */
import {MdOutlineAlternateEmail} from 'react-icons/md'
import { addZeroDate } from '../../utils/date'
import styles from './styles.module.css'


interface CommentProps {
    name: string
    message: string
    date: Date
}

export default function CommentInput({name, message, date}: CommentProps) {
    const data = new Date(date)
    const dateFormated = (addZeroDate(data.getDate()) + "/" + addZeroDate(data.getMonth()) + "/" + data.getFullYear() + " " + addZeroDate(data.getHours()) + ":" + addZeroDate(data.getMinutes()))
    
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentName}>
                <MdOutlineAlternateEmail />
                <span>{name}</span>
            </div>
            <div className={styles.commentMessage}>
                {message}
            </div>
            <span className={styles.commentDate}>
                {dateFormated}
            </span>
        </div>
    )
}
