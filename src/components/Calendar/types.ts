export interface IWeekDay {
  id: number;
  shortName: string;
  name: string;
}
export type DayType = "prevMonth" | "currentMonth" | "nextMonth"; // Тип дня в календаре относительно текущего месяца (на экране отображения участвует 3 месяца (предыдущий, текущий, следующий) )
export type CombinedCalendarDays = [CalendarDay<"prevMonth">[], CalendarDay<"currentMonth">[], CalendarDay<"nextMonth">[]];
export type CalendarDay<T extends DayType> = { date: Date; dayType: T };
export interface ICalendarDay extends CalendarDay<DayType> {
  day: number;
  dayIndex: number;
  dayOfYear: number;
  isToday: boolean;
  isWeekend: boolean;
  month: number;
  text: string;
  year: number;
}
