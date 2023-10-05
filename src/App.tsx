import React from 'react';
import axios from "axios";

export default function App() {
  const [data, setData] = React.useState<{
    category: string,
    filesize: Number,
    image: string,
    timestamp: number
  }[]>();
  const [closed, setClosed] = React.useState<Set<string>>(new Set<string>());
  const [refresh, setRefresh] = React.useState(false);

  console.log('closed: ', closed);

  function closedPicsAdd(image: string) {
    const tmp = new Set([...closed, image]);
    setClosed(tmp);
    localStorage.setItem('closedPics', JSON.stringify([...tmp]))
  }

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
  }, [refresh])

  if (!data) {
    return (<h1 style={{ textAlign: "center" }}>'Загрузка...'</h1>)
  }

  return (
    <>
      <section style={{ height: "100px", backgroundColor: "#ccc", display: "flex", gap: "5vw", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0", right: "0", zIndex: 1 }}>
        <fieldset>
          <legend>Вид отображения:</legend>

          <div>
            <input type="radio" id="huey" name="drone" value="huey" defaultChecked />
            <label htmlFor="huey">Карточки</label>
          </div>

          <div>
            <input type="radio" id="louie" name="drone" value="louie" />
            <label htmlFor="louie">Список</label>
          </div>
        </fieldset>
        <button type="button" onClick={() => {localStorage.setItem('closedPics', ''); setRefresh(!refresh) }}>Опять показать все картинки</button>

      </section>
      <section style={{ display: "flex", flexWrap: "wrap", marginTop: "110px", gap: "1vw" }}>
        {data.map(item => (
          !closed.has(item.image) &&
          (<article key={item.image} style={{ position: "relative" }}>
            <button style={{ position: "absolute", right: "0px", top: "0px",  }} type="button" onClick={() => closedPicsAdd(item.image)}>X</button>
            <img src={`http://contest.elecard.ru/frontend_data/${item.image}`} style={{ maxWidth: "300px" }} />
          </article>)
        
        ))}
      </section>
      <section style={{ height: "100px", backgroundColor: "#ccc", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", bottom: "0", left: "0", right: "0" }}>
        Footer
      </section>
    </>
  )
}


// Возможность закрывать крестиком карточки. 
// После закрытия браузера информация о закрытых этим пользователем карточек должна сохраняться. 
// Поместить где-нибудь на странице кнопку для сброса и возврата к полному набору карточек. 
// Опционально, закрытие сделать с анимацией.