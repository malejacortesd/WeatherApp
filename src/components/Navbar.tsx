'use client';
import React, { useState } from "react";
import { MdSunny } from "react-icons/md";
import { MdOutlineMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { placeAtom } from "@/app/atom";

type Props = {};

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ }: Props) {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [place, setPlace] = useAtom(placeAtom);

    async function handleInputChange(value: string) {
        setCity(value);

        if (value.length >= 3) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find`,
                    {
                        params: {
                            q: value,
                            appid: API_KEY,
                        }
                    }
                );

                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError('');
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
                setError("No se encontraron resultados");
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
        setPlace(value); // Establecer el lugar seleccionado en el estado global
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (suggestions.length === 0) {
            setError("Ciudad no encontrada");
            setPlace(city);
        } else {
            setError('');
            setShowSuggestions(false);
        }
    }

    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex items-center max-w-7xl px-3 mx-auto">
                {/* Contenedor para los elementos de la izquierda */}
                <div className="flex items-center gap-4">
                    <MdOutlineMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
                    <MdOutlineLocationOn className="text-3xl text-gray-700" />
                    <p className="text-slate-900/80 text-sm">Colombia</p>
                    <div className="relative">
                        <SearchBox
                            value={city}
                            onSubmit={(e) => {
                                e.preventDefault(); // Evita el comportamiento predeterminado del formulario.
                                handleSubmitSearch(e); // Llama a la función `handleSubmitSearch`.
                            }}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />

                        <SuggestionsBox {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error
                        }} />
                    </div>
                </div>
                {/* Contenedor para los elementos de la derecha */}
                <div className="ml-auto flex items-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Clima</h2>
                    <MdSunny className="text-3xl text-yellow-400" />
                </div>
            </div>
        </nav>
    );
}

function SuggestionsBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}) {
    return (
        <>
            {(showSuggestions && suggestions.length > 0) || error ? (
                <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
                    {error && suggestions.length < 1 && (<li className="text-red-500 p-1">{error}</li>)}
                    {suggestions.map((item, i) =>
                        (<li key={i}
                            onClick={() => handleSuggestionClick(item)}
                            className="cursor-pointer p-1 rounded hover:bg-gray-200">
                            {item}
                        </li>
                        ))}
                </ul>
            ) : null}
        </>
    );
}
