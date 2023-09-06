"use client";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import WeatherInformation from "./components/WeatherInformation/WeatherInformation";

import { FunctionComponent, useState } from "react";
import {
  TReverseGeoCodingResponse,
  TWeatherFormattedResponse,
  getReverseGeoCoding,
  getWeather,
} from "./utils/networkUtils";
import { useForm } from "react-hook-form";
import InputGroup from "./components/InputGroup/InputGroup";

type SearchFormState = {
  city: string;
  countryCode: string;
};

const MainPage: FunctionComponent = () => {
  const { register, handleSubmit, formState } = useForm<SearchFormState>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    TWeatherFormattedResponse | undefined
  >(undefined);

  const submitFn = async (data: SearchFormState) => {
    setIsSearching(true);
    try {
      console.log({ data });

      const geoCodeResponse: TReverseGeoCodingResponse[] =
        await getReverseGeoCoding({
          city: data.city,
          countryCode: data?.countryCode,
        });

      if (geoCodeResponse.length === 0) {
        setIsSearching(false);
        return;
      }

      const geoCode = geoCodeResponse[0];

      const weatherResponse: TWeatherFormattedResponse = await getWeather({
        lat: geoCode.lat,
        lon: geoCode.lon,
      });
      setSearchResult(weatherResponse);
    } catch (e) {}

    setIsSearching(false);
  };

  return (
    <div>
      <section className="mb-7">
        <form
          className="flex flex-wrap gap-3"
          onSubmit={handleSubmit(submitFn)}
        >
          <InputGroup
            label="City: "
            type="text"
            disabled={isSearching}
            required
            {...register("city")}
          />
          <InputGroup
            label="Country: "
            type="text"
            disabled={isSearching}
            required
            {...register("countryCode")}
          />
          <div className="inputGroupButton">
            <Button loading={isSearching} type="submit">
              Search
            </Button>
            <Button disabled={isSearching} type="reset">
              Clear
            </Button>
          </div>
        </form>
      </section>
      <section className="mb-7 pl-6">
        {searchResult && <WeatherInformation {...searchResult} />}
      </section>
      <section className="mb-7">
        <Header underline>Search History</Header>
      </section>
    </div>
  );
};

export default MainPage;
