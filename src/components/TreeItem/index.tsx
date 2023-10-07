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

    return (
        <article className={styles.treeitem}>
            Object {image} <span onClick={() => setOpen(!open)}>+</span>
            {open && (<section className={styles.childs}>
                {image}<br />
                {category}<br />
                {filesize}<br />
                {timestamp}<br />
            </section>)}
        </article>
    )
}
