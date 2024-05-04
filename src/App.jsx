import React, { useState } from 'react'
import './App.css'

function App() {

  const [location, setLocation] = useState();
  const [temp, setTemp] = useState('--');
  const [city, setCity] = useState("--");
  const [sky, setSky] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [wind, setWind] = useState('--');
  const [img, setImg] = useState('02d');
  const [sunrise, setSunrie] = useState('--/--/--');
  const [sunset, setSunset] = useState('--/--/--');

  function checkWeather(e) {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=e17f41608443891b960c35777b109735`)
      .then(response => response.json())
      .then(data => {

        const sunUp = new Date(data.sys.sunrise * 1000);
        const sunDown = new Date(data.sys.sunset * 1000);

        setCity(data.name);
        setTemp(`${Math.round(data.main.temp)}\u00B0C`);
        setSky(data.weather[0].main);
        setHumidity(data.main.humidity + "%");
        setWind(data.wind.speed + "m/s");
        setImg(data.weather[0].icon);


        const formatTime = (time) => {
          return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
        }

        setSunrie(formatTime(sunUp));
        setSunset(formatTime(sunDown));


      })
  }

  return (
    <>
      <div className="bg-white h-screen w-screen flex justify-center items-center">
        <div className='h-screen bg-gray-300 w-6/12 flex items-center flex-col gap-6 px-20'>

          <form action="" className='w-full flex items-center justify-center gap-3 mt-5'>
            <input type="search" className='px-4 py-3 w-full rounded-xl outline-2 outline' onChange={(e) => setLocation(e.target.value)} />
            <button onClick={checkWeather} type="submit" className='border-2 border-pink-950 rounded-2xl'>
              <i className="fa-solid fa-magnifying-glass h-full py-4 px-5 text-pink-950 rounded-xl"></i>
            </button>
          </form>
          <div className="result w-full flex items-center justify-center flex-col">
            <img src={`https://openweathermap.org/img/wn/${img}@4x.png`} alt="weather image" className='h-40 w-40' />
            <h2 className='text-3xl font-bold'>{temp}</h2>
            <p className='font-semibold'>{city}</p>
            <p>{sky}</p>

            <div className=' flex w-full items-center justify-around mt-6'>
              <div>
                <p>{humidity}</p>
                <p className='status'>Humidity</p>
              </div>
              <div>
                <p className='text-right'>{wind}</p>
                <p className='status'>Wind speed</p>
              </div>
            </div>

            <div className='mt-10 bg-pink-950 text-gray-300 pl-4 w-full h-20 flex items-start justify-center flex-col rounded-xl gap-3'>
              <div className='flex gap-3'>
                <p>Sunrise: </p>
                <p>{sunrise}</p>
              </div>
              <div className='flex gap-3'>
                <p>Sun set: </p>
                <p>{sunset}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
