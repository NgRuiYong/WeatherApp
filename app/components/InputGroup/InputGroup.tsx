"use client";
import {
  InputHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

type TInputGroupProps = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;
const InputGroup: ForwardRefRenderFunction<
  HTMLInputElement,
  TInputGroupProps
> = ({ label, name, errorMessage, ...props }, ref) => {
  return (
    <div className="inputGroup">
      <label htmlFor={name}>{label} </label>
      <div className="relative">
        <input
          ref={ref}
          className="form-input disabled:opacity-30 disabled:cursor-not-allowed"
          id={name}
          name={name}
          {...props}
        />
        <div className="absolute text-xs text-red-600">{errorMessage}</div>
      </div>
    </div>
  );
};

export default forwardRef(InputGroup);
