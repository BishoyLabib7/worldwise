import style from './Map.module.css'
import {useNavigate} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import Button from "./Button.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import {useURLPosition} from "../hooks/useURLPosition.js";

function Map() {

    const {cities} = useCities();
    const [mapPosition, setmapPosition] = useState([40, 0])
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation()
    const [mapLat, mapLng] = useURLPosition()

    useEffect(function () {
        if (mapLat && mapLng) setmapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geolocationPosition) setmapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition]);

    return <div className={style.mapContainer}>
        {!geolocationPosition && <Button type="position" onClick={getPosition}>
            {isLoadingPosition ? "Loading..." : "Use your location"}
        </Button>}
        <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={style.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                    <span>{city.emoji}</span> {city.cityName}
                </Popup>
            </Marker>)}
            < ChangePosition position={mapPosition}/>
            <DetectClick/>
        </MapContainer>
    </div>;
}

function ChangePosition({position}) {
    const map = useMap()
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map;