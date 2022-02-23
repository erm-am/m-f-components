import styled, { css } from "styled-components";

interface IStyledDay {
  selected: boolean;
  today: boolean;
}
export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.28);
  background-color: #ffffff;
`;
export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  flex-direction: column;
`;

export const Caption = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Body = styled.div`
  flex: 1;
  background: white;
`;
export const WeekDaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 10px;
  border-top: 1px solid rgba(212, 217, 220, 0.5);
  border-bottom: 1px solid rgba(212, 217, 220, 0.5);
`;

export const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 10px;
`;

export const Day = styled.div<IStyledDay>`
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  color: black;

  ${(props) =>
    props.selected &&
    css`
      background: yellow;
    `}
  ${(props) =>
    props.today &&
    css`
      border: 1px solid red;
    `}
`;

export const WeekCell = styled.div`
  width: 100%;
  height: 26px;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.31;
  display: flex;
  justify-content: center;
  user-select: none;
  align-items: center;
`;
