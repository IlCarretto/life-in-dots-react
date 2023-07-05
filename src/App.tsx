import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dots from "./components/Dots";
import axios from "axios";
import { Country, CountryData, fetchCountryData } from "./types/Country";

function App() {
  const [birthDate, setBirthDate] = useState("2001-12-04");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gender, setGender] = useState("Male");
  const [lifeExpectancy, setLifeExpectancy] = useState(90);
  const [country, setCountry] = useState<Country>({
    country: "Italy",
    cca2: "IT",
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      console.log(response.data);

      const countryData = response.data.map((country: CountryData) => {
        return {
          country: country.name.common,
          countryCode: country.cca2,
        };
      });
      setCountries(countryData);
    } catch (error) {
      console.error("Error calling countries API", error);
    }
  };

  const fetchLifeExpectancy = async (countryCode: string, gender: string) => {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.DYN.LE00.${gender}?format=json`
      );
      console.log(response);

      // const lifeExpectancyData = response.data[1];
      // console.log(lifeExpectancyData);

      // const lifeExpectancy = lifeExpectancyData[0].value;
      // console.log(lifeExpectancy);
    } catch (error) {
      console.error("Error calling life expectancy API", error);
      return null;
    }
  };

  useEffect(() => {
    fetchCountries();
    console.log(country.cca2, gender);

    fetchLifeExpectancy(country.cca2, gender);
    const today = new Date().getTime();
    const bDate = new Date(birthDate).getTime();
    setElapsedTime((today - bDate) / 1000);
    console.log(countries);
  }, [birthDate, country, gender]);

  return (
    <div className="container">
      <h1 className="title">Your Life in Dots</h1>
      <input
        type="date"
        name="birthDate"
        id="birthDate"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <select
        value={country.country}
        onChange={(e) => {
          const selectedCountry = countries.find(
            (c) => c.country === e.target.value
          );
          if (selectedCountry) {
            setCountry(selectedCountry);
          }
        }}
      >
        {countries.map((country, index) => {
          return (
            <option value={country.country} key={index}>
              {country.country}
            </option>
          );
        })}
      </select>
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        value="Male"
        onChange={(e) => setGender(e.target.value)}
        id="male"
        name="gender"
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        value="Female"
        onChange={(e) => setGender(e.target.value)}
        id="female"
        name="gender"
      />
      {!isNaN(elapsedTime) && <Dots elapsedTime={elapsedTime} />}
    </div>
  );
}

export default App;
