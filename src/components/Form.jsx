// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const Basic_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?"

function Form() {
    const [lat, lng] = useURLPosition();
    const {createCity, loading} = useCities()

    const [isLoadinglocation, setisLoadinglocation] = useState(false)
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setemoji] = useState("")
    const [geolocationError, setgeolocationError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (!(lat && lng)) return

        async function fetchCityData() {
            try {
                setisLoadinglocation(true);
                setgeolocationError("");
                const res = await fetch(`${Basic_URL}latitude=${lat}&longitude=${lng}`)
                const data = await res.json();
                if (!(data.countryCode)) throw new Error("That doesn't seem to be a city. Click somewhere else 😉");

                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setemoji(convertToEmoji(data.countryCode))
            } catch (e) {
                setgeolocationError(e.message)
            } finally {
                setisLoadinglocation(false);
            }
        }

        fetchCityData()
    }, [lat, lng]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName, country, emoji, date, notes, position: {lat, lng},
        }

        await createCity(newCity);
        navigate("/app/cities");
    }

    if (geolocationError !== "") return <Message message={geolocationError}/>
    if (!(lat && lng)) return <Message message="Start by Clicking sowewhere on the map"/>
    if (isLoadinglocation) return <Spinner/>

    return (
        <form className={`${styles.form} ${loading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>

                <DatePicker id="date" selected={date} onChange={date => setDate(date)} dateFormat="dd/MM/yyyy"/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={"primary"}>Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
