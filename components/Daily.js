import React from "react";
import styled from "styled-components";

const DailyWeather = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const DailyWeatherImg = styled.img`
  width: 3.75rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  @media only screen and (max-width: 900px) {
    margin-bottom: 0px;
    margin-right: 1.25rem;
  }
`;

const DailyWeatherDay = styled.div`
  color: var(--primary);
  font-size: 1.125rem;
  font-weight: 600;
`;

const DailyWeatherDesc = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 1.5rem;
  text-align: center;
  @media only screen and (max-width: 900px) {
    margin-bottom: 0rem;
    text-align: start;
  }
`;

const DailyWeatherTempContainer = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);

  @media only screen and (max-width: 900px) {
    margin-left: auto;
    margin-right: 2.5rem;
  }
`;

const DailyWeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.875rem;
  padding: 0.9375rem 2.1875rem;
  width: 18%;
  align-items: center;

  @media only screen and (max-width: 900px) {
    width: 100%;
    flex-direction: row;
    padding: 1rem 1.5625rem;
    margin-bottom: 1rem;
  }
  ${({ temp }) => chooseColor(temp)}
`;

//Map temperatures numbers to a temperature name, and pass to handleColorType function.
const chooseColor = (temp) => {
  if (temp < 0) {
    return `background-color: var(--freezing)`;
  } else if (temp < 7) {
    return `background-color: var(--cold)`;
  } else if (temp < 15) {
    return `background-color: var(--warm)`;
  } else if (temp < 25) {
    return `background-color: var(--hot)`;
  } else {
    return `background-color: var(--burning)`;
  }
};

const Daily = ({ chooseIcon, dailyData }) => {
  return (
    <DailyWeather>
      {dailyData.map((data, index) => (
        <DailyWeatherCard key={index} temp={data.temp}>
          <DailyWeatherImg src={chooseIcon(data.weatherId)} />
          <div>
            <DailyWeatherDay>{data.dayOfWeek}</DailyWeatherDay>
            <DailyWeatherDesc>{data.desc}</DailyWeatherDesc>
          </div>
          <DailyWeatherTempContainer>
            <div>{data.temp}</div>
            <div>&#176;C</div>
          </DailyWeatherTempContainer>
        </DailyWeatherCard>
      ))}
    </DailyWeather>
  );
};

export default Daily;
