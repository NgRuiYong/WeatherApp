"use client";
import {
  InputHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

type TInputGroupProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;
const InputGroup: ForwardRefRenderFunction<
  HTMLInputElement,
  TInputGroupProps
> = ({ label, name, ...props }, ref) => {
  return (
    <div className="inputGroup">
      <label htmlFor={name}>{label} </label>
      <input
        ref={ref}
        className="form-input disabled:opacity-30 disabled:cursor-not-allowed"
        id={name}
        name={name}
        {...props}
      />
    </div>
  );
};

export default forwardRef(InputGroup);
