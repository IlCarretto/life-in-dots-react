export interface CountryData {
  name: {
    common: string;
  };
  cca2: string;
}

export interface Country {
  country: string;
  cca2: string;
}

export interface fetchCountryData {
  countryCode: string;
  gender: string;
}
