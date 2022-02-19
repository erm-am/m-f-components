/* eslint-disable max-len */
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import checkDate from "date-fns/isDate";
import getDate from "date-fns/getDate";

import eachDay from "date-fns/eachDayOfInterval";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import getISODay from "date-fns/getISODay";
import checkWeekend from "date-fns/isWeekend";
import format from "date-fns/format";
import checkCurrentDay from "date-fns/isToday";
import getDayOfYear from "date-fns/getDayOfYear";
import { MONTHS } from "./data";

export const getMonthNameByDate = (dateValue) => {
  // Получаем название месяца из Date
  const monthNumber = checkDate(dateValue) ? getMonth(dateValue) : null;
  return MONTHS[monthNumber];
};

export const getYearNameByDate = (dateValue) => {
  // Получаем название года из Date
  const yearNumber = checkDate(dateValue) ? getYear(dateValue) : null;
  return yearNumber;
};

const getAlldaysPrevMonth = (dateValue) =>
  eachDay({
    start: startOfMonth(subMonths(dateValue, 1)),
    end: endOfMonth(subMonths(dateValue, 1)),
  }); // Получить все дни предыдущего месяца

const getAlldaysCurrentMonth = (dateValue) =>
  eachDay({
    start: startOfMonth(dateValue),
    end: endOfMonth(dateValue),
  }); // Получить все дни текущего месяца
const getAlldaysNextMonth = (dateValue) =>
  eachDay({
    start: startOfMonth(addMonths(dateValue, 1)),
    end: endOfMonth(addMonths(dateValue, 1)),
  }); // Получить все дни следующего месяца

export const getCalendarData = (dateValue = new Date()) => {
  // Получить предыдущий текущий и будущий месяц
  const prevMonthData = getAlldaysPrevMonth(dateValue);
  const currentMonthData = getAlldaysCurrentMonth(dateValue);
  const nextMonthData = getAlldaysNextMonth(dateValue);
  return [prevMonthData, currentMonthData, nextMonthData];
};
export const checkSelectedDay = (date, selectedDay) => format(selectedDay, "dd.MM.yyyy") === format(date, "dd.MM.yyyy"); // Выбранный день пользователя?
export const getPrevMonth = (dateValue) => subMonths(dateValue, 1);
export const getNextMonth = (dateValue) => addMonths(dateValue, 1);

const prepareDay = (date) => {
  // Создаем расшщиренную инфомрацию о переданном дне
  const day = getDate(date);
  const month = getMonth(date);
  const year = getYear(date);
  const dayIndex = getISODay(date);
  const isWeekend = checkWeekend(date);
  const isToday = checkCurrentDay(date);
  const text = format(date, "dd.MM.yyyy");
  const dayOfYear = getDayOfYear(date);
  return {
    date,
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

export const getJoinedMonths = (calendarData) => {
  // объеденяем месяца + оставляем тоьлко нужные дни
  const allDaysCount = 42; // фиксированное кол-во дней в календаре (7 * 6)
  const [prevMonthData, currentMonthData, nextMonthData] = calendarData;

  const [firstDay] = currentMonthData;
  const firstDayIndex = getISODay(firstDay);
  const left = firstDayIndex - 1; // кол-во дней от предыдущего месяца

  const offsetDays = allDaysCount - left;
  const contDayOfMonth = currentMonthData.length;
  const right = offsetDays - contDayOfMonth; // кол-во дней от следующего месяца

  const prevDays = left > 0 ? prevMonthData.slice(-left) : []; // отрезаем последние N дней из предыдущего месяца
  const nextDays = right > 0 ? nextMonthData.slice(0, right) : []; // отрезаем первые N дней из следующего месяца

  const currentMonthDays = currentMonthData.map((item) => ({ ...prepareDay(item), isCurrentMonth: true }));
  const previousMonthDays = prevDays.map((item) => ({ ...prepareDay(item), isPreviousMonth: true }));
  const nextMonthDays = nextDays.map((item) => ({ ...prepareDay(item), isNextMonth: true }));

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export const getFullCalendarData = (datePosition) => {
  // Получаем все необхдимые данные которые нужны для нашего календаря
  const monthName = getMonthNameByDate(datePosition);
  const yearName = getYearNameByDate(datePosition);
  const data = getJoinedMonths(getCalendarData(datePosition));
  return {
    monthName,
    yearName,
    data,
  };
};
