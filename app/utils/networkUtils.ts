import { TWeatherInformationProps } from "@/components/WeatherInformation/WeatherInformation";
import ky, { HTTPError } from "ky";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org";

type TWeatherAPIProps = { lat: number; lon: number };
export type TWeatherFormattedResponse = TWeatherInformationProps;
type TWeatherAPIResponse = {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
};

export const getWeather = async ({
  lat,
  lon,
}: TWeatherAPIProps): Promise<TWeatherFormattedResponse> => {
  try {
    const response: TWeatherAPIResponse = await ky
      .get(
        `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
      .json();

    const formattedResponse: TWeatherFormattedResponse = {
      city: response.name,
      countryCode: response.sys.country,
      weather: response.weather[0].main,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      temperature: {
        min: response.main.temp_min,
        max: response.main.temp_max,
      },
      humidity: response.main.humidity,
      timestamp: response.dt,
    };
    return formattedResponse;
  } catch (e) {
    console.error(`API error caught: ${e}`);
    throw new Error("Failed to get weather");
  }
};

type TReverseGeoCodingAPIProps = {
  city: string;
  countryCode: string; // ISO 3166 country codes e.g. KR, MY, JP
};
export type TReverseGeoCodingResponse = {
  country: string;
  lat: number;
  lon: number;
  state: string;
  name: string;
};
export const getReverseGeoCoding = async ({
  city,
  countryCode,
}: TReverseGeoCodingAPIProps): Promise<TReverseGeoCodingResponse[]> => {
  try {
    // Example of url format
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    // State code is only required for US
    const response: TReverseGeoCodingResponse[] = await ky
      .get(
        `${baseUrl}/geo/1.0/direct?q=${city},,${countryCode}&appid=${API_KEY}&limit=1`
      )
      .json();
    return response;
  } catch (e) {
    console.error(`API error caught: ${e}`);
    throw Error("Failed to reverse geo code");
  }
};
