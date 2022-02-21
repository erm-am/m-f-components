/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */

import React, { useCallback, useMemo } from "react";
import { Container, Header, Body, Caption, WeekDaysContainer, WeekCell, DaysContainer, StyledDay } from "./styled";
import { checkSelectedDay, getFullCalendarData } from "./utils";
import { WEEK_DAYS } from "./constants";

import { useDatePosition } from "./useDatePosition";
import { ICalendarDay } from "./types";
interface ICalendarProps {
  activeDate: Date;
  onDayClick: (day: ICalendarDay) => void;
  className?: string;
}

export const Calendar: React.FC<ICalendarProps> = React.memo((props) => {
  const { className, onDayClick, activeDate } = props;
  const { currentMonthPosition, selectedDay, handleClickPrev, handleClickNext, handleClickToday } = useDatePosition(activeDate);
  const { days, monthName, yearName } = useMemo(() => getFullCalendarData(currentMonthPosition), [currentMonthPosition]);
  const handleClickOnDay = useCallback((data) => onDayClick && onDayClick(data), [onDayClick]);
  return (
    <Container className={className}>
      <Header>
        <Caption>{monthName}</Caption>
      </Header>
      <Body>
        <WeekDaysContainer>
          {WEEK_DAYS.map((weekDay) => (
            <WeekCell key={weekDay.id}>{weekDay.shortName}</WeekCell>
          ))}
        </WeekDaysContainer>
        <DaysContainer>
          {days.map((day: ICalendarDay, index) => {
            const isSelectedDay = checkSelectedDay(day.date, selectedDay);
            const isToday = day.isToday;
            console.log({ Day: day.day, selectedDay, isSelectedDay });
            return (
              <StyledDay today={isToday} selected={isSelectedDay} onClick={() => handleClickOnDay(day)} key={index}>
                {day.day}
              </StyledDay>
            );
          })}
        </DaysContainer>
      </Body>
    </Container>
  );
});
