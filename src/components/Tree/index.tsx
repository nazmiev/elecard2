import styles from "./Tree.module.scss"
import { useSelector } from 'react-redux';
import { selectCardsData } from '../../redux/card/selectors';
import TreeItem from "../TreeItem";
import { useState } from "react";

export default function Tree() {
  const { items } = useSelector(selectCardsData);
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.tree}>
      <p><button onClick={() => setOpen(!open)}>+</button> Object</p>
      <div className={styles.items}>
        {open && (items.map((item, index) => (<TreeItem key={index} {...item} />)))}
      </div>
    </section >
  )
}
