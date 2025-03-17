import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cleanImageName = (fileName: string) => {
  return fileName.includes("-") ? fileName.split("-").slice(1).join("-") : fileName;
};

export function shuffle<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array
}