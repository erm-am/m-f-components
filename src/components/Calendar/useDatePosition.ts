import { useState, useCallback, useEffect } from "react";
import { getPrevMonth, getNextMonth } from "./utils";

export const useDatePosition = (activeDate: Date) => {
  const [currentMonthPosition, setCurrentMonthPosition] = useState(activeDate);
  const [selectedDay, setSelectedDay] = useState(activeDate);

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
    setSelectedDay(activeDate);
    setCurrentMonthPosition(activeDate);
  }, [activeDate]);

  return {
    currentMonthPosition,
    selectedDay,
    handleClickPrev,
    handleClickNext,
    handleClickToday,
  };
};
