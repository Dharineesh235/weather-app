import Image from "next/image"
import { WeatherData } from "./source/types";

const DayWeatherContent = ({ weatherData, degree }: { weatherData: WeatherData | null ; degree: string }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5" style={{ flex: "1 1 200px", minWidth: "150px", maxWidth: "350px", margin: "0 auto" }}>
            <div className="flex">
                <div className="text-20 text-5xl">{
                    degree === "C" ?
                        weatherData?.forecast?.forecastday[0]?.day?.avgtemp_c
                        :
                        weatherData?.forecast?.forecastday[0]?.day?.avgtemp_f
                }</div>
                <div className="text-3xl">{degree === "C" ? "°C" : "°F"}</div>
            </div>
            <div className="text-2xl text-center">
                {weatherData?.forecast?.forecastday[0]?.day?.condition?.text}
            </div>
            <div>
            {weatherData?.forecast?.forecastday[0]?.day?.condition?.icon && 
            <Image
                    src={`https:${weatherData?.forecast?.forecastday[0]?.day?.condition?.icon || ''}`}
                    alt="Weather Icon"
                    width={64}
                    height={64}
                />}
            </div>
        </div>
    )
}

export default DayWeatherContent
