import { BsCloudSnowFill } from "react-icons/bs"
import { FaCloudRain, FaCloudSunRain, FaDroplet, FaRegSnowflake, FaWind } from "react-icons/fa6"
import { languages } from "./source/languages";
import { WeatherData } from "./source/types";
import { JSX } from "react";

const DayWeatherData = ({ weatherData, lang }: { weatherData: WeatherData | null; lang: string }) => {
    const day = weatherData?.forecast?.forecastday[0]?.day;

    const data: {
        name: string;
        icon: JSX.Element;
        value: string | unknown;
        unit: string;
    }[] = [
            {
                name: languages[lang]["texts"]["humidity"],
                icon: <FaDroplet className="text-sky-200" />,
                value: day?.avghumidity,
                unit: "%"
            },
            {
                name: languages[lang]["texts"]["wind"],
                icon: <FaWind className="text-sky-200" />,
                value: day?.maxwind_kph,
                unit: "km/h"
            },
            {
                name: languages[lang]["texts"]["chanceOfRain"],
                icon: <FaCloudSunRain className="text-sky-200" />,
                value: day?.daily_chance_of_rain,
                unit: "%"
            },
            {
                name: languages[lang]["texts"]["precipitation"],
                icon: <FaCloudRain className="text-sky-200" />,
                value: day?.totalprecip_in,
                unit: "in"
            },
            {
                name: languages[lang]["texts"]["snow"],
                icon: <FaRegSnowflake className="text-sky-200" />,
                value: day?.totalsnow_cm,
                unit: "cm"
            },
            {
                name: languages[lang]["texts"]["chanceOfSnow"],
                icon: <BsCloudSnowFill className="text-sky-200" />,
                value: day?.daily_chance_of_snow,
                unit: "%"
            },
        ];
    const months: Record<string, string> = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };

    const rawDate = weatherData?.forecast?.forecastday[0]?.date;
    let formattedDate = "";

    if (rawDate) {
        const parts: string[] = rawDate.split("-"); // ["2025", "04", "29"]
        formattedDate = `${parts[2]} ${months[parts[1]]}, ${parts[0]}`; // "29 Apr 2025"
    }
    return (
        <div className="flex flex-col p-5 flex-1 rounded-[10px] gap-3" style={{ background: "rgba(139, 139, 139, 0.5)", minWidth: "50%" }}>
            <div className="flex items-end gap-2">
                <div className="text-3xl">{weatherData?.location?.name},</div>
                <div>{formattedDate ?? ""}</div>
            </div>
            <div className="flex justify-start flex-wrap gap-5">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-neutral-700"
                        style={{ borderRadius: "10px", padding: "10px", minWidth: "150px", flex: "1", overflow: "hidden" }}
                    >
                        <div className="flex items-center justify-center gap-1">
                            <div>{item.icon}</div>
                            <div className="text-xl">{item.name}</div>
                        </div>
                        <div>
                            {typeof item.value === "string" || typeof item.value === "number"
                            ? `${item.value}${item.unit}`
                            : item.unit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayWeatherData;
