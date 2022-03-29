import React from "react";
import styled from "styled-components";

const HourlyWeather = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 900px) {
    width: 100%;
    max-width: 100%;
    flex-shrink: 0;
    overflow: auto;
    margin-bottom: 2rem;
  }
`;

const HourlyWeatherCard = styled.div`
  display: flex;
  margin-top: 2.5rem;
  flex-direction: column;
  width: 18%;
  align-items: center;
  @media only screen and (max-width: 900px) {
    width: 9.375rem;
    margin: 2.5rem 1.25rem 0rem;
  }
`;

const HourlyWeatherTime = styled.div`
  color: var(--secondary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
`;

const HourlyWeatherImg = styled.img`
  width: 3.75rem;
  border-radius: 50%;
`;

const HourlyWeatherTempContainer = styled.div`
  display: flex;
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
`;

const HourlyWeatherImgContainer = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

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

const Hourly = ({ chooseIcon, currentData, hourlyData }) => {
  return (
    <HourlyWeather>
      <HourlyWeatherCard>
        <HourlyWeatherTime>{currentData.hour}</HourlyWeatherTime>
        <HourlyWeatherImgContainer temp={currentData.temp}>
          <HourlyWeatherImg src={chooseIcon(currentData.weatherId)} />
        </HourlyWeatherImgContainer>
        <HourlyWeatherTempContainer>
          <div>{currentData.temp} </div>
          <div>&#176;C</div>
        </HourlyWeatherTempContainer>
      </HourlyWeatherCard>
      {hourlyData.map((data, index) => (
        <HourlyWeatherCard key={index}>
          <HourlyWeatherTime>{data.hour}</HourlyWeatherTime>
          <HourlyWeatherImgContainer temp={data.temp}>
            <HourlyWeatherImg src={chooseIcon(data.weatherId)} />
          </HourlyWeatherImgContainer>
          <HourlyWeatherTempContainer>
            <div>{data.temp} </div>
            <div>&#176;C</div>
          </HourlyWeatherTempContainer>
        </HourlyWeatherCard>
      ))}
    </HourlyWeather>
  );
};

export default Hourly;
