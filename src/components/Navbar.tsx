import React from "react";
import { MdSunny } from "react-icons/md";
import { MdOutlineMyLocation, MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";

type Props = {};

export default function Navbar({ }: Props) {
    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex items-center max-w-7xl px-3 mx-auto">
                {/* Contenedor para los elementos de la izquierda */}
                <div className="flex items-center gap-4">
                    <MdOutlineMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
                    <MdOutlineLocationOn className="text-3xl text-gray-700" />
                    <p className="text-slate-900/80 text-sm">Colombia</p>
                    <div>
                        <SearchBox />
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
