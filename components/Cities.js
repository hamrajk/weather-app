import React from "react";
import styled, { css } from "styled-components";

const CityWrapper = styled.div`
  display: flex;
  overflow: auto;
  max-width: 95vw;
  margin-bottom: 2.3125rem;
`;

const City = styled.div`
  color: var(--primary);
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1.5rem;
  margin-right: 1.25rem;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background-color: white;
  :hover {
    background-color: var(--freezing);
    transform: scale(1.05);
    transition: all 300ms ease-in-out;
  }

  ${({ option }) => handleOptionType(option)}
`;

const handleOptionType = (option) => {
  switch (option) {
    case "selected":
      return "background-color: var(--selected)";
    default:
      return "background-color: white";
  }
};

const Cities = ({ handleCityChange, updatedCities, selectedCity }) => {
  return (
    <CityWrapper>
      {updatedCities.map((city, index) =>
        selectedCity.name === city.name ? (
          <City
            option="selected"
            onClick={() => handleCityChange(index)}
            key={index}
          >
            {city.name}
          </City>
        ) : (
          <City onClick={() => handleCityChange(index)} key={index}>
            {city.name}
          </City>
        )
      )}
    </CityWrapper>
  );
};

export default Cities;
