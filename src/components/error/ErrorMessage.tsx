import React from "react";
import { AiOutlineIssuesClose } from "react-icons/ai";

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="w-full border rounded border-red-500 bg-red-200 py-1 px-3 flex space-x-2">
      <div className="my-auto">
        <AiOutlineIssuesClose color="red" />
      </div>
      <p className="text-sm text-red-500">{children}</p>
    </div>
  );
};

export default ErrorMessage;
