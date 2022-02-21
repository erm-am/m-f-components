import * as React from "react";
import { Calendar } from "./components/Calendar";

export const App = () => {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  const handleClickOnDay = (params) => setSelectedDay(params.date);
  return (
    <>
      <Calendar onDayClick={handleClickOnDay} activeDate={selectedDay} />
    </>
  );
};
