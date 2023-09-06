"use client";
import { FunctionComponent, ReactNode } from "react";

type THeaderProps = {
  underline: boolean;
  children: ReactNode;
};
const Header: FunctionComponent<THeaderProps> = ({ underline, children }) => {
  return (
    <h1
      className={`pb-1 mb-4 sm:pb-2 ${
        underline ? "border-b-2 border-b-black" : ""
      }`}
    >
      {children}
    </h1>
  );
};

export default Header;
