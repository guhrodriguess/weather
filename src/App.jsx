import { useState, useRef } from "react";

import Info from "./components/Info";
import Input from "./components/Input";

import { WeatherTypes } from "./modules/WeatherTypes";

const APIKey = import.meta.env.VITE_API_KEY;

export default function App() {
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const fetchWeather = async () => {
    setLoading(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${APIKey}&lang=pt_br`
    )
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);

        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Local não encontrado",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }

        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );

        setApiData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <main className="grid h-screen place-items-center">
      <section className="w-full max-w-sm p-4 rounded-2xl bg-input">
        <Input inputRef={inputRef} fetchWeather={fetchWeather} />
        <Info showWeather={showWeather} loading={loading} apiData={apiData} />
      </section>
    </main>
  );
}
