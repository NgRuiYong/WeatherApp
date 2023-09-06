"use client";
import { FunctionComponent } from "react";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import { useForm } from "react-hook-form";

type SearchFormState = {
  city: string;
  countryCode: string;
};

const MainPage: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormState>();

  const submitFn = async (data: SearchFormState) => {
    console.log({ data });
  };

  return (
    <div>
      <section className="mb-7">
        <form
          className="flex flex-wrap gap-3"
          onSubmit={handleSubmit(submitFn)}
        >
          <div className="inputGroup">
            <label htmlFor="city">City: </label>
            <input
              className="form-input"
              id="city"
              type="text"
              {...register("city")}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="min-w-[65px] sm:min-w-fit" htmlFor="country">
              Country:
            </label>
            <input
              className="form-input"
              id="countryCode"
              {...register("countryCode")}
              type="text"
              required
            />
          </div>
          <div className="inputGroupButton">
            <Button type="submit">Search</Button>
            <Button type="reset">Clear</Button>
          </div>
        </form>
      </section>
      <section className="mb-7">Insert loaded data Here</section>
      <section className="mb-7">
        <Header underline>Search History</Header>
      </section>
    </div>
  );
};

export default MainPage;
