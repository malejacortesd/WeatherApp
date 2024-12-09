import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";

export interface WeatherDetailProps {
    sea_level?: string; // Se permite que sea opcional si se le asigna un valor predeterminado
    humidity?: string;
    sunrise?: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
    const {
        sea_level = "1015",
        humidity = "61%", 
    } = props;

    return (
        <>
            <SingleWeatherDetail
                icon={<FaRegEye />}
                information="m.s.n.m"
                value={sea_level}
            />
            <SingleWeatherDetail
                icon={<WiHumidity />}
                information="Humedad"
                value={humidity}
            />
        </>
    );
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}
