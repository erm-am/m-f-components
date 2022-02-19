import styled, { css } from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.28);

  background-color: #ffffff;
  width: calc((100% / 4) - 10px);
  height: calc((100% / 3) - 10px);
  margin: 5px;
  overflow: auto;
`;
export const Header = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
`;

export const Caption = styled.div`
  font-family: ProximaNova;
  display: inline-flex;
  align-items: center;
`;

export const Body = styled.div`
  flex: 1;
  background: white;
`;
export const Week = styled.div`
  border-top: 1px solid rgba(212, 217, 220, 0.5);
  border-bottom: 1px solid rgba(212, 217, 220, 0.5);
`;

export const DaysContainer = styled.div``;

export const Day = styled.div`
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  color: ${(props) => (props.isWeek ? "#6e7478" : null)};

  ${(props) =>
    props.isToday &&
    css`
      box-shadow: 0px 2px 0px 0px #ff7712;
      font-weight: bold;
    `};
`;

export const Row = styled.div`
  /* padding: 0 30px; */
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  /* justify-content: space-between; */
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
  color: ${(props) => (props.isWeekend ? "#F8969B" : "#6e7478")};
`;

export const Cell = styled.div`
  width: 100%;
  height: 26px;
  /* border: solid 1px transparent; */
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) => (props.isWeek ? "#F8969B" : "#6e7478")};

  ${(props) =>
    props.isCurrentMonth &&
    css`
      &:hover {
        border: solid 1px #daecff;
        background-color: #f3f9ff;
        color: #208cff;
        cursor: pointer;
      }
    `};

  ${(props) =>
    props.isSelectedDay &&
    css`
      border: solid 1px #daecff;
      background-color: #f3f9ff;
      color: #208cff;
    `};
`;
