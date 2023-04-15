// React
import { useRef, useState } from "react";

// Phosphor Icons
import {
  MagnifyingGlass,
  CircleNotch,
  ThermometerSimple,
} from "phosphor-react";

// Weather Types
import { WeatherTypes } from "./modules/WeatherTypes";

// API Key
const APIKey = import.meta.env.VITE_API_KEY;

export default function App() {
  // useRef is used to get the value of the input
  const inputRef = useRef(null);

  // States
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the weather data
  const fetchWeather = async () => {
    // API URL
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${APIKey}&lang=pt_br`;

    // Set loading to true
    setLoading(true);

    // Fetch the data
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        // Reset the state
        setApiData(null);
        console.log(data);

        // Error image
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Local não encontrado",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }

        // Filter the weather type from the WeatherTypes array
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        // Set the data to the state
        setApiData(data);

        // Set loading to false
        setLoading(false);
      })
      .catch((err) => {
        // Log the error
        console.log(err);

        // Set loading to false
        setLoading(false);
      });
  };

  // Handle the key press event
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchWeather();
    }
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="p-4 rounded-lg bg-bgPrimary w-96">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            onKeyDown={handleKeyPress}
            placeholder="Insira o nome do lugar"
            className="p-1 text-xl font-semibold border-textSecondary text-textSecondary bg-bgPrimary placeholder:text-textSecondary focus:outline-none"
          />
          <button onClick={fetchWeather}>
            <MagnifyingGlass
              className="text-textSecondary"
              weight="bold"
              size={30}
            />
          </button>
        </div>
        <div
          className={`${
            showWeather ? "h-full" : "h-0"
          } duration-300 delay-75 overflow-hidden`}
        >
          {loading ? (
            <div className="grid h-full place-items-center">
              <CircleNotch
                weight="bold"
                size={32}
                className="mx-auto animate-spin text-textPrimary"
              />
            </div>
          ) : (
            showWeather && (
              <div className="flex flex-col justify-center gap-6 my-10 text-center">
                {apiData && (
                  <p className="text-xl text-textPrimary">
                    {apiData?.name + ", " + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="Weather image"
                  className="mx-auto w-52"
                />
                <h3 className="text-2xl capitalize text-textPrimary">
                  {apiData !== null ? (
                    apiData?.weather[0]?.description
                  ) : (
                    <span>Local não encontrado</span>
                  )}
                </h3>
                {apiData && (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <ThermometerSimple
                        size={32}
                        weight="bold"
                        className="text-textPrimary"
                      />
                      <h2 className="text-4xl text-textSecondary">
                        {Math.floor(apiData?.main?.temp)}ºC
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
