import { useEffect, useState } from 'react';
import './App.css';
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import SearchIcon from '@material-ui/icons/Search';

function App() {
  const [place,setPlace]= useState('pune');
  const [placeInfo,setPlaceInfo]=useState({});
  useEffect(() => {

  handleFetch();

  }, [])
  
  const handleFetch = () => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=928756a1610b40b1aa265503220403&q=${place}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setPlaceInfo({
          name: data.location.name,
          country: data.location.country,
          celcius: {
            current: data.current.temp_c
          },
          condition: data.current.condition.text
        })
      );
      
    };
    console.log(placeInfo);

  
  return (
    <div className="app"    style={
      placeInfo.condition?.toLowerCase() === "clear" || placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${Clear})` }
        : placeInfo.condition?.includes("cloudy")
        ? { backgroundImage: `url(${Cloudy})` }
        : placeInfo.condition?.toLowerCase().includes("rainy")
        ? { backgroundImage: `url(${Rainy})` }
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${Snow})` }
        : { backgroundImage: `url(${Overcast})` }
    }>
    <div className="search-input">
      <input type="text" value={place} onChange={(e)=> setPlace(e.target.value)} />
      <SearchIcon onClick={handleFetch}/>
    </div>
    <div className="weather-container">
      <div className="top">
        <h1>{placeInfo.celcius?.current}°C</h1>
        <div className="condition">
          <h1>{placeInfo.condition}</h1>
        </div>
      </div>
      <h2>{placeInfo.name},{placeInfo.country}</h2>
    </div>
    </div>
  );
}

export default App;
