import styles from './Card.module.scss';

type CardProps = {
    image: string;
    filesize: number;
    timestamp: number;
    category: string;
}

const Card: React.FC<CardProps> = ({ image }) => {

    function closedPicsAdd(image: string) {
        // const tmp = new Set([...closed, image]);
        // setClosed(tmp);
        // localStorage.setItem('closedPics', JSON.stringify([...tmp]))
    }

    return (
        <article key={image} className={styles.card}>
            {/* <button type="button" onClick={() => closedPicsAdd(image)}>X</button> */}
            <img src={`http://contest.elecard.ru/frontend_data/${image}`} />
        </article>
    );
}

export default Card;