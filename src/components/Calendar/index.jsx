/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */

import React, { useCallback, useMemo } from "react";
import Days from "./Days";

import {
  Container,
  Header,
  ControlSection,
  Body,
  Caption,
  Month,
  Year,
  ButtonContainer,
  Prev,
  Today,
  Next,
  LeftButton,
  RightButton,
  Week,
  WeekCell,
  Row,
  DaysContainer,
} from "./styled";
import { checkSelectedDay, getFullCalendarData } from "./utils";
import { WEEK_DAYS } from "./data";

import { useDatePosition } from "./useDatePosition";

export const Calendar = React.memo(({ className, style, onDayClick, activeDate, renderer, currentMonth }) => {
  const { currentMonthPosition, selectedDay, handleClickPrev, handleClickNext, handleClickToday, hasHeader } = useDatePosition(activeDate);

  const { data, monthName, yearName } = useMemo(() => getFullCalendarData(currentMonthPosition), [currentMonthPosition]);
  const handleClickOnday = useCallback((data) => onDayClick && onDayClick(data), [onDayClick]);
  return (
    <Container className={className} style={style}>
      <Header>
        <Caption>{monthName}</Caption>
      </Header>
      <Body>
        <Week>
          <Row>
            {WEEK_DAYS.map((day) => (
              <WeekCell key={day.id} isWeekend={day.isWeekend}>
                {day.name}
              </WeekCell>
            ))}
          </Row>
        </Week>
        <DaysContainer>
          <Days renderer={renderer} data={data} selectedDay={selectedDay} onChange={handleClickOnday} />
        </DaysContainer>
      </Body>
    </Container>
  );
});
