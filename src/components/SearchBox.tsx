import React from "react";
import { text } from "stream/consumers";
import { IoSearch } from "react-icons/io5";
import { wp } from "@/utils/wp";

type Props = {
    className?: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

export default function SearchBox(Props: Props) {
    return (
        <form onSubmit={Props.onSubmit} className={wp("flex relative items-center justify-center h-10", Props.className)}>
            <input type="text"
                value={Props.value}
                onChange={Props.onChange}
                placeholder="Ciudad"
                className="px-4 py-2 w-[230px] border
            border-gray-300 rounded-l-md focus:outline-none
            focus:border-blue-500 h-full"/>
            <button className="px-4 py-2 w-[9px] bg-blue-500
            text-white rounded-r-md focus:outline-none
            hover:bg-blue-600 h-full">
                <IoSearch />
            </button>
            </form>
    )
}