import { IWeekDay } from "./types";
export const MONTH_NAMES: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
export const WEEK_DAYS: IWeekDay[] = [
  { id: 1, shortName: "пн", name: "Понедельник" },
  { id: 2, shortName: "вт", name: "Вторник" },
  { id: 3, shortName: "ср", name: "Среда" },
  { id: 4, shortName: "чт", name: "Четверг" },
  { id: 5, shortName: "пт", name: "Пятница" },
  { id: 6, shortName: "сб", name: "Суббота" },
  { id: 7, shortName: "вс", name: "Воскресенье" },
];
