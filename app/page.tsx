"use client";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import WeatherInformation from "./components/WeatherInformation/WeatherInformation";
import { toast, ToastContainer } from "react-toastify";
import { FunctionComponent, useState } from "react";
import {
  TReverseGeoCodingResponse,
  TWeatherFormattedResponse,
  getReverseGeoCoding,
  getWeather,
} from "./utils/networkUtils";
import { useForm } from "react-hook-form";
import InputGroup from "./components/InputGroup/InputGroup";
import { convertUTCToTimeZone } from "./utils/utils";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";

type SearchFormState = {
  city: string;
  countryCode: string;
};

type TSearchHistory = {
  searchForm: SearchFormState;
  timestamp: number;
};

const MainPage: FunctionComponent = () => {
  const { register, handleSubmit } = useForm<SearchFormState>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasNoResults, setHasNoResults] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    TWeatherFormattedResponse | undefined
  >(undefined);
  const [searchHistory, setSearchHistory] = useState<TSearchHistory[]>([]);

  const submitFn = async (data: SearchFormState) => {
    setHasNoResults(false);
    setSearchResult(undefined);
    const formattedSearchHistory: TSearchHistory = {
      searchForm: data,
      timestamp: Date.now(),
    };
    setSearchHistory([formattedSearchHistory, ...searchHistory]);
    await getWeatherInformation(data);
  };

  const getWeatherInformation = async (data: SearchFormState) => {
    setIsSearching(true);
    try {
      const geoCodeResponse: TReverseGeoCodingResponse[] =
        await getReverseGeoCoding({
          city: data.city,
          countryCode: data?.countryCode,
        });

      if (geoCodeResponse.length === 0) {
        setHasNoResults(true);
        setIsSearching(false);
        return;
      }

      const geoCode = geoCodeResponse[0];

      const weatherResponse: TWeatherFormattedResponse = await getWeather({
        lat: geoCode.lat,
        lon: geoCode.lon,
      });
      setSearchResult(weatherResponse);
    } catch (e) {
      toast.error("Error! Failed to get weather information.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setHasNoResults(true);
      setIsSearching(false);
    }
    setIsSearching(false);
  };

  const handleOnClickSearchHistory = async (
    searchFormData: SearchFormState
  ) => {
    await submitFn(searchFormData);
  };

  const handleOnDeleteSearchHistory = (index: number) => {
    const updatedArray: TSearchHistory[] = [
      ...searchHistory.slice(0, index),
      ...searchHistory.slice(index + 1),
    ];
    setSearchHistory(updatedArray);
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <section className="mb-4">
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
            label="Country Code: "
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
      <section className="mb-7 mt-2">
        {searchResult && (
          <div className="pl-6">
            <WeatherInformation {...searchResult} />
          </div>
        )}
        {hasNoResults && (
          <div className="border-red-600 border-2 bg-red-100 pl-2">
            Not found
          </div>
        )}
      </section>
      <section className="mb-7 mt-2">
        <Header underline>Search History</Header>
        <div className="flex flex-col">
          {searchHistory.length === 0 ? (
            <div className="w-full h-24 flex items-center justify-center">
              No Record
            </div>
          ) : (
            searchHistory.map(({ searchForm, timestamp }, index) => (
              <div
                key={index}
                className="flex justify-between border-b-2 border-gray-200 py-3"
              >
                <div>{`${index + 1}. ${searchForm.city}, ${
                  searchForm.countryCode
                }`}</div>
                <div className="flex items-center gap-2">
                  <span>{convertUTCToTimeZone(timestamp, "hh:mm:ss a")}</span>
                  <span>
                    <Button
                      rounded
                      className="bg-gray-200 aspect-square px-2 py-2"
                      onClick={() => handleOnClickSearchHistory(searchForm)}
                    >
                      <MagnifyingGlassIcon className="h-4 w-4" />
                    </Button>
                  </span>
                  <span>
                    <Button
                      rounded
                      className="bg-gray-200 aspect-square px-2 py-2"
                      onClick={() => handleOnDeleteSearchHistory(index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
