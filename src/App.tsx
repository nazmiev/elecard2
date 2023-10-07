import Footer from './components/Footer';
import Card from './components/Card';
import Header from './components/Header';
import Tree from './components/Tree';
import styles from "./components/Header/Header.module.scss"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCards } from './redux/card/asyncActions';
import { useAppDispatch } from './redux/store';
import { selectCardsData } from './redux/card/selectors';
import { selectFilter } from './redux/filter/selectors';

export default function App() {
  const { items } = useSelector(selectCardsData);
  const { view } = useSelector(selectFilter);
  const dispatch = useAppDispatch();

  const getCards = async () => {
    dispatch(
      fetchCards()
    )
  }

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    let closed = localStorage.getItem('closedPics');
    if (closed) {
      try {
        ///
      } catch (error) {
        console.warn(error);
      }
    }
  }, [])

  return (
    <>
      <Header />
      <section className={styles.content} >
        {view == 'list' 
        ? <Tree/>
        : (items.length ? 
          items.map(item => <Card key={item.image} {...item}/>) : 
          (<h1>'Загрузка...'</h1>))
        }
      </section>
      <Footer />
    </>
  )
}
