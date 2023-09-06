import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

type TButtonProps = {
  children: ReactNode;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<TButtonProps> = ({
  children,
  loading,
  disabled,
  ...buttonProps
}) => {
  return (
    <button
      className="rounded py-2 px-3 shadow-lg disabled:opacity-10 disabled:cursor-not-allowed active:shadow-inner flex items-center "
      disabled={loading || disabled}
      {...buttonProps}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 border-solid border-2 border-b-0 border-r-0 border-black rounded-full"
          viewBox="0 0 24 24"
        ></svg>
      )}
      {children}
    </button>
  );
};

export default Button;
