import React from 'react';
import axios from "axios";
import Footer from './components/Footer';
import Card from './components/Card';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { selectFilter } from './redux/filter/selectors';

export default function App() {
  const [data, setData] = React.useState<{
    category: string,
    filesize: number,
    image: string,
    timestamp: number
  }[]>();
  const [closed, setClosed] = React.useState<Set<string>>(new Set<string>());

  function closedPicsAdd(image: string) {
    const tmp = new Set([...closed, image]);
    setClosed(tmp);
    localStorage.setItem('closedPics', JSON.stringify([...tmp]))
  }

  const { view, sort } = useSelector(selectFilter);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://contest.elecard.ru/frontend_data/catalog.json');
        setData(data);
      } catch (error) {
        console.warn(error);
      }
    })();
    let closed = localStorage.getItem('closedPics');
    if (closed) {
      try {
        setClosed(new Set(JSON.parse(closed)));
      } catch (error) {
        console.warn(error);
      }
    }
  }, [])

  if (!data) {
    return (<h1 style={{ textAlign: "center" }}>'Загрузка...'</h1>)
  }

  return (
    <>
      <Header />
      <section style={{ display: "flex", flexWrap: "wrap", marginTop: "160px", gap: "1vw" }}>
        <h1>{view}</h1>
        <h1>{sort.name}</h1>
        {/* {data.sort((a, b) => a.filesize - b.filesize).map(item => (
          !closed.has(item.image) && <Card key={item.image}/>
        ))} */}
      </section>
      <Footer />
    </>
  )
}
