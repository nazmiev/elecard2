import { useEffect } from 'react';
import Footer from './components/Footer';
import Card from './components/Card';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { selectCardsData } from './redux/card/selectors';
import { fetchCards } from './redux/card/asyncActions';
import { useAppDispatch } from './redux/store';
import { selectFilter } from './redux/filter/selectors';
import Tree from './components/Tree';

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
      <section style={{ display: "flex", flexWrap: "wrap", marginTop: "160px", gap: "1vw", backgroundColor: "#eee" }}>
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
