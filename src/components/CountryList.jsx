import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import style from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";


function CountryList() {
    const {cities, isLoading} = useCities()
    if (isLoading) return <Spinner/>;
    if (!cities.length)
        return (
            <Message message="Add your frist city by clicking on a cityon the map"/>
        );

    const Countries = cities.reduce((arr, city) => {
        if (!arr.map(c => c.city).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}]
        else return arr

    }, [])


    return (
        <ul className={style.countryList}>
            {Countries.map((country) => (
                <CountryItem country={country} key={country.country}/>
            ))}
        </ul>
    );
}

export default CountryList;
