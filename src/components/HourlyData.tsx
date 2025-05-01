import React from "react";
import { HourData } from "./source/types";
import Image from "next/image";

const HourlyData = ({ weatherData, degree }: { weatherData: HourData[]; degree: string }) => {
    return (
        <>
            <div className="text-center text-3xl">Hourly Data</div>
            <div className="flex gap-5 overflow-x-auto w-full p-5">
                {weatherData?.map((item, index) => (
                    <div
                        key={index}
                        className="p-2 rounded-xl flex-shrink-0"
                        style={{ width: "100px", background: "grey" }}
                    >
                        <div className="flex gap-2 justify-center items-center">
                            <div>{item.time.split(" ")[1]}</div>
                        </div>
                        <div className="text-xs text-center">
                            {item.condition.text.length > 20
                                ? item.condition.text.slice(0, 20) + "..."
                                : item.condition.text}
                        </div>

                        <div className="text-center">
                            {/* <img src={item.condition?.icon} /> */}
                            <Image
                                src={`https:${item.condition?.icon || ""}`}
                                alt="Weather condition"
                                width={64}
                                height={64}
                                unoptimized
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="text-20 text-xl">{
                                degree === "C" ?
                                    item.temp_c
                                    :
                                    item.temp_f
                            }</div>
                            <small>{degree === "C" ? "°C" : "°F"}</small>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};


export default HourlyData