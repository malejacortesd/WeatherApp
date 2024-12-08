import React from "react";
import { IoSearch } from "react-icons/io5";
import { wp } from "@/utils/wp";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({ className, value, onChange, onSubmit }: Props) {
    return (
        <form
            onSubmit={onSubmit}
            className={wp("flex relative items-center h-10", className)}
        >
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Ciudad"
                className="px-4 py-2 w-[220px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
            />
            <button
                className="px-4 bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full flex items-center justify-center"
            >
                <IoSearch />
            </button>
        </form>
    );
}
