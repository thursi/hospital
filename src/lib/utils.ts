import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime24to12(time: any) {
  // Split the time into hours and minutes
  let [hours, minutes, seconds] = time.split(":");

  // Convert hours from string to number
  hours = parseInt(hours);

  // Determine the period (AM or PM)
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  // Return formatted time
  return `${hours}:${minutes}:${seconds} ${period}`;
}
