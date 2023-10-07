import styles from "./Tree.module.scss"
import { useSelector } from 'react-redux';
import { selectCardsData } from '../../redux/card/selectors';
import TreeItem from "../TreeItem";

export default function Tree() {
  const { items } = useSelector(selectCardsData);

  return (
      <section className={styles.tree}>
        {items.map((item) => (<TreeItem key={item.image} {...item}/>))}
      </section>
  )
}
