import { Input, InputProps } from "@headlessui/react";

interface InputPrimaryProps extends InputProps {
  isFilled: boolean;
  error?: boolean;
}

export const InputPrimary = ({ isFilled, error, ...props }: InputPrimaryProps) => {
  const baseStyles = "w-full h-60 box-border rounded-m p-s text-fieldtext border-2 border-solid focus:outline-none focus:ring-0";

  const focusStyles = error
    ? "" 
    : "focus:bg-primary_100 focus:text-dark focus:border-primary_100";

  return (
    <Input
      {...props}
      autoComplete="off"
      className={`${baseStyles} ${focusStyles}`}
    />
  );
};
