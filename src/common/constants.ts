/**
 * Themes option for the application.
 */
export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const EDIT_EXT = ["conf", "toml", "txt", "yaml", "xml", "sh", "ts", "tsx", "js", "json"];

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_URL;
