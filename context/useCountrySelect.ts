import { useState, useEffect } from 'react';
import countryData from './api/countries.json';

type State = {
  code: string;
  name: string;
  subdivision: string | null;
};

type Country = {
  code: string;
  code2: string;
  code3: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  states: State[];
};

type OptionType = {
  value: string;
  label: string;
};

export const useCountrySelect = () => {
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [states, setStates] = useState<OptionType[]>([]);

  useEffect(() => {
    const initialData = countryData as Country[];

    const formattedCountries = initialData.map((country) => ({
      value: country.code2.toLowerCase(),
      label: country.name,
    }));

    setCountries(formattedCountries);
  }, []);


  const getStatesByCountryName = (countryName: string) => {
    const selectedCountry = (countryData as Country[]).find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

    if (selectedCountry) {
      const formattedStates = selectedCountry.states.map((state) => ({
        value: state.code.toLowerCase(),
        label: state.name,
      }));
      setStates(formattedStates);
    } else {
      setStates([]);
    }
  };

  const countryOptions = () => countries;
  const stateOptions = (selectedCountry: string) => states;

  return {
    countryOptions,
    stateOptions,
    getStatesByCountryName,
  };
};