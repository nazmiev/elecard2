import { delItems } from '../../redux/card/slice';
import { CardProps } from '../../redux/card/types';
import { useAppDispatch } from '../../redux/store';
import styles from './Card.module.scss';

export const loadClosed = () => {
    let closed = new Set<string>;
    try {
        let tmp = localStorage.getItem('closedPics');
        if (tmp) {
            closed = new Set(JSON.parse(tmp) as []);
        }
    } catch (e) { }
    return closed;
}

const Card: React.FC<CardProps> = ({ image, timestamp }) => {
    const dispatch = useAppDispatch();

    const onClosedPic = (image: string) => {
        const closed = loadClosed();
        closed.add(image);
        dispatch(delItems([...closed]));
        localStorage.setItem('closedPics', JSON.stringify([...closed]));
    }
    const date = new Date(timestamp).toDateString();
    return (
        <article key={image} className={styles.card}>
            <button type="button" onClick={() => onClosedPic(image)}>X</button>
            <img src={`http://contest.elecard.ru/frontend_data/${image}`} />
            <p>{date}</p>
        </article>
    );
}

export default Card;