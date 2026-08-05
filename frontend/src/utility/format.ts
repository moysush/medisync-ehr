import { Gender } from "../types";

export const formatDate = (date: string): string => {
  if (!date) return "-";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}.${month}.${year}`;
};

export const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const genderLabel = (gender: Gender): string => capitalize(gender);

export const initialsOf = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
