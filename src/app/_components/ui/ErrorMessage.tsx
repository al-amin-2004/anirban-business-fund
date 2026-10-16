import { FC } from "react";

const ErrorMessage: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-destructive text-xs">{children}</p>;
};

export default ErrorMessage;
