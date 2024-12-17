import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import style from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext.jsx";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your frist city by clicking on a cityon the map" />
    );
  return (
    <ul className={style.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
