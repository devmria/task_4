import { Button, ButtonProps } from "@headlessui/react";
import { PropsWithChildren } from "react";

interface ButtonPrimaryProps extends ButtonProps {
  className?: string;
}

export const ButtonPrimary = ({ children, className = '', disabled, ...props }: PropsWithChildren<ButtonPrimaryProps>) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`
        flex justify-center items-center
        rounded-m px-s py-xs
        focus:outline-none
        bg-transparent border-1 border-solid border-base text-base hover:text-light hover:bg-base_dark hover:border-base_dark active:bg-base
        ${className}
      `}
    >
      {children}
    </Button>
  );
};
