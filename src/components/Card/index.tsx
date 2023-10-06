import { delItems } from '../../redux/card/slice';
import { CardProps } from '../../redux/card/types';
import { useAppDispatch } from '../../redux/store';
import styles from './Card.module.scss';

const Card: React.FC<CardProps> = ({ image, timestamp }) => {
    const dispatch = useAppDispatch();

    const onClosedPic = (image: string) => {
        dispatch(delItems(image));
        let closed = localStorage.getItem('closedPics');
        if (closed) {
            closed = JSON.parse(closed);
            const tmp = new Set([closed, image]);
            localStorage.setItem('closedPics', JSON.stringify([tmp]))
        }
        localStorage.setItem('closedPics', JSON.stringify(new Set(image)))
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