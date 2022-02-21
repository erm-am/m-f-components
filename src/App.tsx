import * as React from "react";
import { Calendar } from "./components/Calendar";

export const App = () => {
  const [status, setStatus] = React.useState(1);

  const [selectedDay, setSelectedDay] = React.useState(new Date(2022, 1, 1));
  const handleClickOnDay = ({ date }) => {
    setSelectedDay(date);
  };
  return (
    <div>
      <Calendar onDayClick={handleClickOnDay} activeDate={selectedDay} />
    </div>
  );
};
