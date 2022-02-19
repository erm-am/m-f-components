import React from "react";

import { Row, Cell, Day } from "./styled";
import { checkSelectedDay } from "./utils";

const Days = ({ data, selectedDay, onChange, renderer }) => {
  let startDay = 0; // Проходимся по массиву  ( data - список всех дней)
  return [1, 2, 3, 4, 5, 6].map((week) => (
    <Row key={week}>
      {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
        const currentIterationDay = data[startDay++];
        const { date, day, isWeekend, isToday, isPreviousMonth, isCurrentMonth, isNextMonth, dayOfYear } = currentIterationDay;
        const isSelectedDay = checkSelectedDay(date, selectedDay);
        return (
          <Cell key={index} onClick={(event) => onChange(currentIterationDay, event)}>
            {renderer ? renderer(currentIterationDay) : <Day isWeek={isWeekend}>{day}</Day>}
          </Cell>
        );
      })}
    </Row>
  ));
};

export default Days;
