import { type ClassValue, clsx } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using `clsx` and resolves conflicts with `tailwind-merge`.
 * @param inputs List of class names to merge.
 * @returns Merged class name string.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Converts a Date object into a human-readable relative time string.
 * @param createdAt The date to compare against the current time.
 * @returns A string representing the time difference in a human-readable format.
 */
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

/**
 * Converts bytes to a human-readable format.
 * @param bytes The number of bytes.
 * @returns A string representing the byte size in a human-readable format.
 */
export const bytesFormat = (bytes: number): string => {
  if (isNaN(bytes) || bytes < 0) return "Invalid bytes";
  const symbols = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = 0;
  while (bytes >= 1024 && i < symbols.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${symbols[i]}`;
};

/**
 * Checks if a given string is a valid URL.
 * @param url The URL string to validate.
 * @returns `true` if the URL is valid, otherwise `false`.
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extracts the file extension from a filename.
 * @param filename The filename from which to extract the extension.
 * @returns The file extension in lowercase.
 */
export const getType = (filename: string) => {
  const data = filename.split(".");
  return (data[data.length - 1] || "")?.toLocaleLowerCase();
};

/**
 * Converts an ArrayBuffer to a Base64 encoded string.
 * @param buffer The ArrayBuffer to convert.
 * @returns The Base64 encoded string.
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * Converts an ArrayBuffer to a text string using UTF-8 encoding.
 * @param buffer The ArrayBuffer to convert.
 * @returns The decoded text string.
 */
export const arrayBufferToText = (buffer: ArrayBuffer): string => {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
};

export const getNanoid = (len = 16): string => {
  return nanoid(len);
};
