import { screen, render } from "@testing-library/react";
import { Calendar } from ".";
describe("demo test ", () => {
  // Пробный тест
  render(<Calendar onDayClick={() => {}} activeDate={new Date()} />);
  expect(screen.getByText("вс")).toBeTruthy();
});
