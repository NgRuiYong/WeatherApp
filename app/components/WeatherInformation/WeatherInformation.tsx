"use client";
import { FunctionComponent, useMemo } from "react";
import { toDate, utcToZonedTime, format } from "date-fns-tz";
import Image from "next/image";

export type TWeatherInformationProps = {
  city: string;
  countryCode: string;
  weather: string;
  description: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  timestamp: number; // in Unix UTC + 0
  icon: string;
};

const WeatherInformation: FunctionComponent<TWeatherInformationProps> = ({
  city,
  countryCode,
  weather,
  description,
  temperature,
  humidity,
  timestamp,
  icon,
}) => {
  const getFormattedTime = useMemo(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDateTime = toDate(timestamp * 1000);
    const convertedTime = utcToZonedTime(utcDateTime, userTimezone);
    return format(convertedTime, "yyyy-MM-dd hh:mm a");
  }, [timestamp]);

  return (
    <div>
      <div className="text-xs text-gray-600">{`${city}, ${countryCode}`}</div>
      <div className="flex items-center">
        <div className="text-5xl font-bold mb-3 open-sans ">{weather}</div>
        <Image
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
          width={100}
          height={100}
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                width={"135px"}
                height={"12px"}
                className="text-gray-600 tracking-tighter"
              >
                Description:
              </td>
              <td>{description}</td>
            </tr>
            <tr>
              <td className="text-gray-600 tracking-tighter">Temperature:</td>
              <td>{`${temperature.min} °C ~ ${temperature.max}°C`}</td>
            </tr>
            <tr>
              <td className="text-gray-600 tracking-tighter">Humidity:</td>
              <td>{`${humidity}`}%</td>
            </tr>
            <tr>
              <td className="text-gray-600 tracking-tighter">Time:</td>
              <td>{`${getFormattedTime}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherInformation;
