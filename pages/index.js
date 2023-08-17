/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";

import Cities from "../components/Cities";
import CurrentWeather from "../components/CurrentWeather";
import Hourly from "../components/Hourly";
import Daily from "../components/Daily";

// City metadata for search functionality.
import cityData from "../public/city_data.js";

/** Styled-Components **/

const PageLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  height: 100vh;
`;

const Greeting = styled.div`
  font-size: 3.5rem;
  font-weight: 600;
  padding-bottom: 3rem;

  @media only screen and (max-width: 800px) {
    font-size: 2.25rem;
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

// Search bar styles
const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.25rem;
  align-items: center;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Search = styled.input`
  font-size: 1rem;
  width: 37.5rem;
  border: none;
  background: var(--grayish);
  padding: 0.625rem 1.25rem;
  border-radius: 0.625rem;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: 900px) {
    width: 92vw;
  }
`;

const SearchMessage = styled.div`
  color: var(--primary);
  font-size: 1rem;
  font-weight: 600;
  margin-left: 10px;
  @media only screen and (max-width: 900px) {
    margin-top: 10px;
    height: 1rem;
  }
`;

//Page wrapper to center the content
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 68.75rem;
  width: 100%;
  padding: 2.25rem 1.25rem 0;
  margin: 1.25rem;
  @media only screen and (max-width: 900px) {
    padding: 1.25rem 1rem;
  }
`;

//Holds current, hourly and daily elements
const AllWeatherContainer = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

//Holds hourly and daily elements
const OtherWeather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

//Initial City Data to load
const initialCities = [
  { name: "Toronto", lat: "43.65", lon: "-79.34" },
  {
    name: "Vancouver",
    lat: "49.29",
    lon: "-129.13",
  },
  {
    name: "Montreal",
    lat: "45.63",
    lon: "73.51",
  },
  {
    name: "Edmonton",
    lat: "53.52",
    lon: "-113.62",
  },
];

//Based on the weatherId from API response, dynamically choose svg path.
//Simplified some categories together, e.g all id's from 600-622 have general icon "snow.svg".
const chooseIcon = (id) => {
  if (id >= 200 && id <= 232) {
    return "/weather/thunderstorm.svg";
  } else if (id >= 300 && id <= 321) {
    return "/weather/drizzle.svg";
  } else if (id >= 500 && id <= 531) {
    return "/weather/rain.svg";
  } else if (id >= 600 && id <= 622) {
    return "/weather/snow.svg";
  } else if (id === 781) {
    return "/weather/tornado.svg";
  } else if (id === 800) {
    return "/weather/cloudy.svg";
  } else if (id === 801) {
    return "/weather/clear-cloudy.svg";
  } else if (id === 802) {
    return "/weather/partly-cloudy.svg";
  } else if (id === 803) {
    return "/weather/mostly-cloudy.svg";
  } else {
    return "/weather/cloudy.svg";
  }
};

export default function Home() {
  //Initially render first city as the selectedCity
  const [selectedCity, setSelectedCity] = useState(initialCities[0]);
  //Store initial cities in state, incase we add a new one
  const [updatedCities, setUpdatedCities] = useState(initialCities);
  //When search value changes
  const [searchValue, setSearchValue] = useState("");
  //For search bar messages
  const [message, setMessage] = useState("");

  const handleCityChange = (index) => {
    setSelectedCity(updatedCities[index]);
  };

  //Define API call for fetching weather data for selectedCity
  const fetchData = (city) => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=minutely,alerts&appid=${process.env.APIKey}`
    );
  };

  //Define query hook using useQuery
  const { isLoading, data, isError, error } = useQuery(
    ["data", selectedCity],
    () => fetchData(selectedCity)
  );

  if (isLoading) {
    return <PageLoading>Loading...</PageLoading>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  // Define current weather data object
  const currentData = {
    weatherId: data.data.current.weather[0].id,
    temp: Math.round(data.data.current.temp - 273.15),
    desc: data.data.current.weather[0].main,
    name: selectedCity.name,
    hour: "Now",
  };

  // Define array of hourly data objects
  let hourlyData = [];
  const fillHourlyData = () => {
    for (let i = 1; i < 5; i++) {
      let unixTime = data.data.hourly[i].dt;
      let time = new Date(unixTime * 1000);
      let timeConvention = "";
      if (time.getHours() <= 11) {
        timeConvention = "AM";
      } else {
        timeConvention = "PM";
      }
      let timeToDisplay = time.getHours() % 12;
      if (timeToDisplay === 0) {
        timeToDisplay = 12;
      }
      let hourlyObject = {
        weatherId: data.data.hourly[i].weather[0].id,
        temp: Math.round(data.data.hourly[i].temp - 273.15),
        hour: `${timeToDisplay} ${timeConvention}`,
      };
      hourlyData.push(hourlyObject);
    }
  };
  //Define array of daily data objects
  let dailyData = [];
  const fillDailyData = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < 5; i++) {
      let unixTime = data.data.daily[i].dt; //Time value from API response is unix time (seconds)
      let time = new Date(unixTime * 1000); //Convert seconds to milliseconds
      let day = "";
      if (i === 0) {
        day = "Today";
      } else if (i === 1) {
        day = "Tomorrow";
      } else {
        day = weekday[time.getDay()];
      }
      let dailyObject = {
        weatherId: data.data.daily[i].weather[0].id,
        temp: Math.round(data.data.daily[i].temp.day - 273.15), //Convert temp from kelvin to celcius
        desc: data.data.daily[i].weather[0].main,
        dayOfWeek: day,
      };
      dailyData.push(dailyObject);
    }
  };

  //Function for search input
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent for submitting
    for (let i = 0; i < cityData.length; i++) {
      if (cityData[i].city_name.toLowerCase() === searchValue.toLowerCase()) {
        //Check if search is in city metadata file
        for (let j = 0; j < updatedCities.length; j++) {
          //If search is valid, check if city already added
          if (
            updatedCities[j].name.toLowerCase() === searchValue.toLowerCase()
          ) {
            setMessage("City already added.");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            return;
          }
        }
        //If city is valid (not already added), add to updatedCities
        {
          const newCity = {
            name: cityData[i].city_name,
            lat: cityData[i].lat,
            lon: cityData[i].lon,
          };
          setSearchValue("");
          setUpdatedCities([...updatedCities, newCity]);
          setMessage("City added!");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          return;
        }
      }
    }
    setMessage("City not found.");
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  //Call functions to populate the hourly and daily arrays with data objects
  fillHourlyData();
  fillDailyData();

  return (
    <div>
      <Head>
        <title>Weather App Project</title>
        <meta
          name="description"
          content="Weather web application generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <PageWrapper>
        <ContentWrapper>
          <Greeting>City Weather Around the World</Greeting>
          <SearchContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Search
                type="text"
                value={searchValue}
                placeholder="Search for a city"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            <SearchMessage>{message}</SearchMessage>
          </SearchContainer>
          <Cities
            updatedCities={updatedCities}
            handleCityChange={handleCityChange}
            selectedCity={selectedCity}
          />
          <AllWeatherContainer>
            <CurrentWeather chooseIcon={chooseIcon} currentData={currentData} />
            <OtherWeather>
              <Hourly
                currentData={currentData}
                hourlyData={hourlyData}
                chooseIcon={chooseIcon}
              />
              <Daily dailyData={dailyData} chooseIcon={chooseIcon} />
            </OtherWeather>
          </AllWeatherContainer>
        </ContentWrapper>
      </PageWrapper>
    </div>
  );
}
