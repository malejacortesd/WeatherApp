'use client';

import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/KelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayAndNightIcon } from "@/utils/getDayAndNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { placeAtom } from "./atom";
import { useAtom } from "jotai";

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

// Función para obtener datos del clima
async function fetchWeatherData(place: string): Promise<WeatherResponse> {
  if (!place) throw new Error("Debes seleccionar un lugar");
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
    params: {
      q: place,
      appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
      units: "metric", // Temperatura en Celsius
      lang: "es", // Descripciones en español
    },
  });
  return response.data;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom); // Lugar seleccionado
  console.log('API Key:', process.env.NEXT_PUBLIC_WEATHER_KEY);

  // Consulta de datos del clima con React Query
  const { isLoading, error, data } = useQuery<WeatherResponse, AxiosError<APIErrorResponse>>(
    ["repoData", place], // Clave de consulta
    () => fetchWeatherData(place), // Función para obtener los datos
    {
      enabled: !!place, // Solo ejecutar si hay un lugar seleccionado
      staleTime: 5 * 60 * 1000, // 5 minutos antes de marcar datos como obsoletos
      cacheTime: 10 * 60 * 1000, // Mantener datos en caché por 10 minutos
      retry: 2, // Reintentar en caso de error hasta 2 veces
    }
  );

  // Loader mientras se cargan los datos
  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    console.error('Error:', error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.message === "city not found"
        ? "No se encontró la ciudad. Intenta nuevamente."
        : error.response?.data?.message || error.message;

    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-red-500">
          Error: {errorMessage}
        </p>
      </div>
    );
  }

  const firstData = data?.list[0] ?? null;

  // Si no hay datos disponibles
  if (!firstData) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p>No se encontraron datos para la ciudad seleccionada.</p>
      </div>
    );
  }

  // Renderizado principal
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData.dt_txt), "EEEE")}</p>
              <p className="text-lg">{format(parseISO(firstData.dt_txt), "dd.MM.yyyy")}</p>
            </h2>

            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {firstData.main.temp}°C
                </span>
                <p className="text-xs space-x-2">
                  <span>{firstData.main.temp_min}°↓</span>
                  <span>{firstData.main.temp_max}°↑</span>
                </p>
              </div>
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                    <WeatherIcon iconName={getDayAndNightIcon(d.weather[0].icon, d.dt_txt)} />
                    <p>{Math.round(d.main.temp)}°</p>
                  </div>
                ))}
              </div>

            </Container>

            <div className="flex gap-4 w-full">
              <Container className="flex-1 justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">{firstData.weather[0].description}</p>
                <WeatherIcon iconName={getDayAndNightIcon(firstData.weather[0].icon, firstData.dt_txt)} />
              </Container>

              <Container className="bg-blue-200/90 px-10 gap-6 justify-center items-center flex-1">
                <WeatherDetails
                  humidity={`${firstData.main.humidity}`}
                  sea_level={`${firstData.main.sea_level}`}
                />
              </Container>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
