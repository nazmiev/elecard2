import React from 'react';
// import axios from "axios";
import Footer from './components/Footer';
import Card from './components/Card';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { selectFilter } from './redux/filter/selectors';
import { selectCardsData } from './redux/card/selectors';
import { fetchCards } from './redux/card/asyncActions';
import { useAppDispatch } from './redux/store';

export default function App() {
  // const [data, setData] = React.useState<{
  //   category: string,
  //   filesize: number,
  //   image: string,
  //   timestamp: number
  // }[]>();

  const { view, sort } = useSelector(selectFilter);
  const { items } = useSelector(selectCardsData);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json');
  //       setData(data);
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   })();
  //   let closed = localStorage.getItem('closedPics');
  //   if (closed) {
  //     try {
  //       // setClosed(new Set(JSON.parse(closed)));
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }
  // }, [])

  const dispatch = useAppDispatch();

  const getCards = async () => {
    dispatch(
      fetchCards()
    )
  }

  React.useEffect(() => {
    getCards();
  }, []);

  if (!items) {
    return (<h1 style={{ textAlign: "center" }}>'Загрузка...'</h1>)
  }

  return (
    <>
      <Header />
      <section style={{ display: "flex", flexWrap: "wrap", marginTop: "160px", gap: "1vw" }}>
        <h1>{view}</h1>
        <h1>{sort.name}</h1>
        {/* {data.sort((a, b) => a.filesize - b.filesize).map(item => (
          !closed.has(item.image) && <Card key={item.image} {...item}/>
        ))} */}
        {items.map(item => <Card key={item.image} {...item}/>)}
      </section>
      <Footer />
    </>
  )
}
