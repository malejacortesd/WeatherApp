import React from "react";
import Image from "next/image";
import { wp } from "@/utils/wp";

type WeatherIconProps = React.HTMLProps<HTMLDivElement> & { iconName: string };

export default function WeatherIcon({ iconName, className, ...rest }: WeatherIconProps) {
    return (
        <div {...rest} className={wp("relative h-20 w-20", className)}>
            <Image
                width={100}
                height={100}
                alt="weather-icon"
                className="absolute h-full w-full"
                src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
            />
        </div>
    );
}
