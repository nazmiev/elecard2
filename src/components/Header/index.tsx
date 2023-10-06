import { setSort, setView } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";
import styles from "./Header.module.scss"
import { SortPropertyEnum } from '../../redux/filter/types';
import { sortItems } from "../../redux/card/slice";

type SortItem = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export const sortList: SortItem[] = [
    { name: "category", sortProperty: SortPropertyEnum.CATEGORY },
    { name: "date", sortProperty: SortPropertyEnum.DATE },
    { name: "name", sortProperty: SortPropertyEnum.NAME },
    { name: "size", sortProperty: SortPropertyEnum.SIZE },
];

export default function Header() {

    const dispatch = useAppDispatch();
    const onChangeView = (value: string) => {
        dispatch(setView(value))
    }

    const onChangeSort = (obj: SortItem) => {
        dispatch(setSort(obj));
        dispatch(sortItems(obj.sortProperty));
    };

    return (
        <section className={styles.header}>
            <fieldset>
                <legend>Вид отображения:</legend>
                <div>
                    <input onChange={(e) => onChangeView(e.target.value)}
                        type="radio" id="cards" name="display" value="cards" defaultChecked />
                    <label htmlFor="cards">Карточки</label>
                </div>
                <div>
                    <input onChange={(e) => onChangeView(e.target.value)}
                        type="radio" id="list" name="display" value="list" />
                    <label htmlFor="list">Список</label>
                </div>
            </fieldset>
            <button type="button" onClick={() => {
                localStorage.setItem('closedPics', '');
            }}>Опять показать все картинки</button>
            <fieldset>
                <legend>Сортировка:</legend>
                {sortList.map((obj, i) => (
                    <div key={i}>
                        <input onChange={() => onChangeSort(obj)}
                            type="radio" name="sort" id={obj.sortProperty} value={obj.sortProperty} />
                        <label htmlFor={obj.sortProperty}>{obj.name}</label>
                    </div>
                ))}
            </fieldset>
        </section>
    )
}
