import { useState } from "react";
import styles from "./TreeItem.module.scss"

type TreeItemProps = {
    image: string,
    category: string,
    filesize: number,
    timestamp: number
}

export default function TreeItem({ image, category, filesize, timestamp }: TreeItemProps) {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const clickOnImage = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <article className={styles.treeitem}>
            <button onClick={() => setOpen(!open)}>
                +
            </button> Object <b>{image.slice(15)} </b>
            
            {open && 
            (<section className={styles.childs}>
                {category}<br />
                {filesize}<br />
                {timestamp}<br />
                <img onClick={() => clickOnImage()} src={`http://contest.elecard.ru/frontend_data/${image}`} /><br />
            </section>)}
            
            {modalOpen && 
            (<section className={styles.imgContainer}>
                <img onClick={() => clickOnImage()} src={`http://contest.elecard.ru/frontend_data/${image}`} /><br />
                <button onClick={() => clickOnImage()}>x</button>
            </section>)}
        </article>
    )
}
