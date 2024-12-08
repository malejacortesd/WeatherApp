import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`w-full bg-white border rounded-xl flex py-4 shadow-sm ${props.className || ""}`}
        />
    );
}
