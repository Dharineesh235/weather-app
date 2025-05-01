"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { AstroidSpinner } from "./Loaders/AstroidSpinner";
import DayWeatherData from "./DayWeatherData";
import DayWeatherContent from "./DayWeatherContent";
import HourlyData from "./HourlyData";
import SearchHeader from "./SearchHeader";
import { fetchWeather } from "./source/fetchAPI";
import Alert from "./Alert";
import { useAlert } from "./customHooks/useAlert";
import { HourData, WeatherData } from "./source/types";

const Main = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [searchData, setSearchData] = useState({
        city: "Chennai",
        date: new Date()
    });
    const [degree, setDegree] = useState<string>("C");
    const [lang, setLang] = useState<string>("en");
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const { alert, message, showAlert } = useAlert();

    const handleSearch = () => {
        const cityName = inputRef.current?.value?.trim();
        const readDate = dateRef.current?.value;

        if (!cityName || !readDate) {
            console.warn("City or date input is missing!");
            showAlert("City or date input is missing!");
            return;
        }

        const parsedDate = new Date(readDate);

        if (isNaN(parsedDate.getTime())) {
            console.warn("Invalid date entered!");
            showAlert("Invalid date entered!");
            return;
        }
        const newSearchData = {
            city: cityName,
            date: parsedDate
        }
        setSearchData({ ...newSearchData });
    };

    const handleWeatherData = useCallback(() => {
        if (searchData.city && searchData.date) {
            setLoader(true)
            fetchWeather(searchData.city, searchData.date, lang ?? "en").then((data) => {
                setWeatherData(data);
                setLoader(false);
            }).catch(err => {
                console.warn(err);
                setLoader(false);
                showAlert("Error getting data for this date");
                if (dateRef?.current) {
                    const currentDate: Date = new Date();
                    dateRef.current.value = currentDate.toISOString().split("T")[0];
                }
            });
        }
    }, [searchData, lang]);

    useEffect(() => {
        handleWeatherData()
    }, [handleWeatherData]);


    return (
        <>
            <div
                className="bg-neutral-500 flex items-center justify-center p-4 sm:p-6 md:p-10"
                style={{
                    backgroundImage: `url("weather-app-background.jpeg")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    minWidth: "300px"
                }}
            >

                {loader && <div className="absolute" style={{ height: "100%", width: "100%", zIndex: "21", background: "rgba(13, 13, 13, 0.5)" }}>
                    <AstroidSpinner />
                </div>}
                <Alert className="border-solid border-2 border-red-900 rounded-sm text-red-900 bg-red-200" alert={alert}
                >
                    {message}
                </Alert>
                <div>

                </div>
                <div className="flex z-10 flex-col gap-15 items-center text-white p-6 sm:p-8 rounded-xl"
                    style={{ background: "rgba(13, 13, 13, 0.8)", maxWidth: "1000px", width: "100%" }}
                >
                    <div className=" relative flex gap-10 justify-center items-center w-full">
                        <div className="text-4xl md:text-6xl">Weather App</div>
                    </div>
                    {/* Search Inputs */}
                    <div>
                        <SearchHeader
                            inputRef={inputRef}
                            dateRef={dateRef}
                            city={searchData.city}
                            date={searchData.date}
                            degree={degree}
                            setDegree={setDegree}
                            lang={lang}
                            setLang={setLang}
                            handleSearch={handleSearch}
                        />
                    </div>

                    {/* Main Weather Display */}
                    <div className="w-full flex flex-wrap gap-5 justify-center">
                        <DayWeatherContent weatherData={weatherData} degree={degree} />
                        <DayWeatherData weatherData={weatherData} lang={lang} />
                    </div>

                    {/* Hourly Scrollable Data */}

                    <div className="w-full">
                        <HourlyData weatherData={weatherData?.forecast?.forecastday[0]?.hour as HourData[] ?? []} degree={degree} />
                    </div>

                </div>
            </div>



            {/* } */}
        </>
    )
}

export default Main
