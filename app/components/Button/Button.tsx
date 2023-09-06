import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

type TButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<TButtonProps> = ({
  children,
  ...buttonProps
}) => {
  return (
    <button
      className="rounded py-2 px-3 shadow-md active:shadow-none   flex items-center "
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
