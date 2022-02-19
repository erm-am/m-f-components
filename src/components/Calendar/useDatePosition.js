import { useState, useCallback, useEffect } from "react";
import { getPrevMonth, getNextMonth } from "./utils";

export const useDatePosition = (currentDay) => {
  const [currentMonthPosition, setCurrentMonthPosition] = useState(currentDay);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const handleClickPrev = useCallback(() => {
    const newDate = getPrevMonth(currentMonthPosition);
    setCurrentMonthPosition(newDate);
  }, [currentMonthPosition]);

  const handleClickNext = useCallback(() => {
    const newDate = getNextMonth(currentMonthPosition);
    setCurrentMonthPosition(newDate);
  }, [currentMonthPosition]);

  const handleClickToday = useCallback(() => {
    setCurrentMonthPosition(new Date());
    setSelectedDay(new Date());
  }, []);

  useEffect(() => {
    setSelectedDay(currentDay);
    setCurrentMonthPosition(currentDay);
  }, [currentDay]);

  return {
    currentMonthPosition,
    selectedDay,
    handleClickPrev,
    handleClickNext,
    handleClickToday,
  };
};
