'use client';

import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { format, parseISO } from "date-fns";

// Tipo para la respuesta de error
interface APIErrorResponse {
  message: string;
}

// Tipo para la respuesta de éxito
type WeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
};

type WeatherItem = {
  dt: number;
  main: MainInfo;
  weather: WeatherDetail[];
  clouds: CloudInfo;
  wind: WindInfo;
  visibility: number;
  pop: number;
  rain?: PrecipitationInfo;
  sys: SysInfo;
  dt_txt: string;
};

type MainInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type WeatherDetail = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CloudInfo = {
  all: number;
};

type WindInfo = {
  speed: number;
  deg: number;
  gust?: number;
};

type PrecipitationInfo = {
  "3h": number;
};

type SysInfo = {
  pod: string;
};

export default function Home() {
  console.log('API Key:', process.env.NEXT_PUBLIC_WEATHER_KEY); // Verifica la clave

  const { isLoading, error, data } = useQuery<WeatherResponse, AxiosError<APIErrorResponse>>(
    'repoData',
    async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: 'medellin',
            appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
          },
        }
      );
      return response.data;
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  if (error) {
    console.error('Error:', error.response?.data || error.message);
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-red-500">
          Error: {error.response?.data?.message || error.message}
        </p>
      </div>
    );
  }

  const firstData = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>
                {firstData
                  ? format(parseISO(firstData.dt_txt), "EEEE")
                  : "No data available"}
              </p>
            </h2>
          </div>
        </section>
      </main>
      <section></section>
    </div>
  );
}
