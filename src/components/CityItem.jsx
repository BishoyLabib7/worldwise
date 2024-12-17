import style from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { formatDate } from "./City.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, _id: id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${style.cityItem} ${
          currentCity.id === id ? style["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={style.emoji}>{emoji}</span>
        <h3 className={style.name}>{cityName}</h3>
        <time className={style.date}>({formatDate(date)})</time>
        <button className={style.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
