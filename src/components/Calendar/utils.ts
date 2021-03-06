import {
  getMonth,
  getYear,
  isDate as checkDate,
  getDate,
  eachDayOfInterval as eachDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getISODay,
  isWeekend as checkWeekend,
  format,
  isToday as checkCurrentDay,
  getDayOfYear,
} from "date-fns";

import { MONTH_NAMES } from "./constants";
import { ICalendarDay, RawCalendarDay, DayType, CombinedCalendarDays } from "./types";

export const getMonthNameByDate = (dateValue: Date) => {
  // Получаем название месяца из Date
  const monthNumber = checkDate(dateValue) ? getMonth(dateValue) : null;
  return getMonthNameByMonthNumber(monthNumber);
};
export const getMonthNameByMonthNumber = (monthNumber: number) => {
  // Получаем название месяца по номеру месяца
  return MONTH_NAMES[monthNumber];
};

export const getYearNameByDate = (dateValue: Date): number => {
  // Получаем название года из Date
  const yearNumber = checkDate(dateValue) ? getYear(dateValue) : null;
  return yearNumber;
};

export const getAlldaysPrevMonth = (dateValue: Date): Date[] => {
  // Получить все дни предыдущего месяца
  return eachDay({
    start: startOfMonth(subMonths(dateValue, 1)),
    end: endOfMonth(subMonths(dateValue, 1)),
  });
};

export const getAlldaysCurrentMonth = (dateValue: Date): Date[] => {
  // Получить все дни текущего месяца
  const daysOfCurrentMonth = eachDay({
    start: startOfMonth(dateValue),
    end: endOfMonth(dateValue),
  });
  return daysOfCurrentMonth;
};

export const getAlldaysNextMonth = (dateValue: Date): Date[] => {
  // Получить все дни следующего месяца
  const daysOfNextMonth = eachDay({
    start: startOfMonth(addMonths(dateValue, 1)),
    end: endOfMonth(addMonths(dateValue, 1)),
  });
  return daysOfNextMonth;
};

export const getCombinedCalendarDays = (dateValue: Date = new Date()): CombinedCalendarDays => {
  // Получить дни текущего, предыдущего и следующего месяца
  const prevMonthData: RawCalendarDay<"prevMonth">[] = getAlldaysPrevMonth(dateValue).map((date) => ({ date, dayType: "prevMonth" }));
  const currentMonthData: RawCalendarDay<"currentMonth">[] = getAlldaysCurrentMonth(dateValue).map((date) => ({ date, dayType: "currentMonth" }));
  const nextMonthData: RawCalendarDay<"nextMonth">[] = getAlldaysNextMonth(dateValue).map((date) => ({ date, dayType: "nextMonth" }));
  return [prevMonthData, currentMonthData, nextMonthData];
};
export const checkSelectedDay = (date: Date, selectedDay: Date) => format(selectedDay, "dd.MM.yyyy") === format(date, "dd.MM.yyyy");
export const getPrevMonth = (dateValue: Date) => subMonths(dateValue, 1);
export const getNextMonth = (dateValue: Date) => addMonths(dateValue, 1);

const prepareDay = (calendarDate: RawCalendarDay<DayType>): ICalendarDay => {
  // Создаем расширенную информацию о переданном дне
  const day = getDate(calendarDate.date);
  const month = getMonth(calendarDate.date);
  const year = getYear(calendarDate.date);
  const dayIndex = getISODay(calendarDate.date);
  const isWeekend = checkWeekend(calendarDate.date);
  const isToday = checkCurrentDay(calendarDate.date);
  const text = format(calendarDate.date, "dd.MM.yyyy");
  const dayOfYear = getDayOfYear(calendarDate.date);
  return {
    date: calendarDate.date,
    dayType: calendarDate.dayType,
    day,
    month,
    year,
    dayIndex,
    isWeekend,
    isToday,
    text,
    dayOfYear,
  };
};

export const prepareCalendarDays = (calendarData: CombinedCalendarDays) => {
  // Объеденяем 3 месяца в 1 набор данных (текущий месяц, предыдущий и следующий)
  const allDaysCount = 7 * 6; // фиксированное кол-во дней в календаре
  const [prevMonthData, currentMonthData, nextMonthData] = calendarData;
  const [firstDay] = currentMonthData;
  const firstDayIndex = getISODay(firstDay.date);
  const left = firstDayIndex - 1; // кол-во дней от предыдущего месяца

  const offsetDays = allDaysCount - left;
  const contDayOfMonth = currentMonthData.length;
  const right = offsetDays - contDayOfMonth; // кол-во дней от следующего месяца

  const prevDays = left > 0 ? prevMonthData.slice(-left) : []; // отрезаем последние N дней из предыдущего месяца
  const nextDays = right > 0 ? nextMonthData.slice(0, right) : []; // отрезаем первые N дней из следующего месяца

  const currentMonthDays = currentMonthData.map((day) => prepareDay(day));
  const previousMonthDays = prevDays.map((day) => prepareDay(day));
  const nextMonthDays = nextDays.map((day) => prepareDay(day));

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export const getFullCalendarData = (datePosition: Date) => {
  // Получаем все необхдимые данные которые нужны для нашего календаря
  const monthName = getMonthNameByDate(datePosition);
  const yearName = getYearNameByDate(datePosition);
  const calendarData = getCombinedCalendarDays(datePosition);
  const days = prepareCalendarDays(calendarData);
  return {
    monthName,
    yearName,
    days,
  };
};
