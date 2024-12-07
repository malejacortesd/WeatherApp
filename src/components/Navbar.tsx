import React from "react";
import { MdSunny } from "react-icons/md";
import { MdOutlineMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";


type Props = {};

export default function Navbar(Props: Props) {
    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex items-center max-w-7xl px-3 mx-auto gap-2">
                <p className="flex items-center justify-senter gap-2"></p>
                <h2 className="text-gray-500 text-3xl">Clima</h2>
                <MdSunny className="text-3xl text-yellow-400" />
                
                {/* */}
                <section className="flex gap-2 intems-center">
                <MdOutlineMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer"/>
                <MdOutlineLocationOn className="text-3xl"/>
                <p className="text-slate-900/80 text-sm"> Colombia </p>
                <div>{/* Search Box */}
                <SearchBox/>
                </div>                
                </section>
            </div>
        </nav>
    );
}
