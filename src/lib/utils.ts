import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanImageName = (fileName: string) => {
  return fileName.includes("-") ? fileName.split("-").slice(1).join("-") : fileName;
};