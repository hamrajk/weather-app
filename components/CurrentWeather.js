import React from "react";
import styled, { css } from "styled-components";

const CurrentWeatherImgContainer = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
  background-color: var(--grayish);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.625rem;

  @media only screen and (max-width: 900px) {
    width: 3.75rem;
    height: 3.75rem;
    margin-right: 1rem;
  }
`;

const CurrentWeatherImg = styled.img`
  width: 3.75rem;
  border-radius: 50%;
  @media only screen and (max-width: 900px) {
    width: 2.25rem;
  }
`;

const CurrentWeatherCity = styled.div`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 900px) {
    font-size: 1.25rem;
  }
`;

const CurrentWeatherDesc = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 5.875rem;
  text-align: center;
  @media only screen and (max-width: 900px) {
    margin-bottom: 0;
    text-align: start;
  }
`;

const CurrentWeatherTempContainer = styled.div`
  position: relative;
  @media only screen and (max-width: 900px) {
    margin-left: auto;
    margin-right: 2.5rem;
  }
`;

const CurrentWeatherTemp = styled.div`
  font-size: 6.25rem;
  font-weight: 500;
  @media only screen and (max-width: 900px) {
    font-size: 3.25rem;
  }
`;

const CurrentWeatherTempDeg = styled.div`
  position: absolute;
  font-size: 2rem;
  top: 0.9375rem;
  right: -2.1875rem;
  @media only screen and (max-width: 900px) {
    right: -1.5625rem;
    top: 0.5rem;
    font-size: 1.25rem;
  }
`;

const CurrentWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  width: 23%;
  padding: 42px 72px;
  margin-right: 20px;

  @media only screen and (max-width: 900px) {
    flex-direction: row;
    width: 100%;
    padding: 16px 25px;
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

const CurrentWeather = ({ chooseIcon, currentData }) => {
  return (
    <CurrentWeatherContainer temp={currentData.temp}>
      <CurrentWeatherImgContainer>
        <CurrentWeatherImg src={chooseIcon(currentData.weatherId)} />
      </CurrentWeatherImgContainer>
      <div>
        <CurrentWeatherCity>{currentData.name}</CurrentWeatherCity>
        <CurrentWeatherDesc>{currentData.desc}</CurrentWeatherDesc>
      </div>
      <CurrentWeatherTempContainer>
        <CurrentWeatherTemp>{currentData.temp}</CurrentWeatherTemp>
        <CurrentWeatherTempDeg>&#176;C</CurrentWeatherTempDeg>
      </CurrentWeatherTempContainer>
    </CurrentWeatherContainer>
  );
};

export default CurrentWeather;
