import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function wp(...inputs: ClassValue[]){
    return twMerge(clsx(...inputs));
}