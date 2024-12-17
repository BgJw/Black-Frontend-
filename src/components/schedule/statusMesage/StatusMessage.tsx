import React, { memo } from "react";
import { Spinner } from "@material-tailwind/react";
import Link from "next/link";

interface StatusMessageProps {
  status: string;
  month?: string;
  year?: number;
}

export const StatusMessage = memo(({ status, month, year }: StatusMessageProps) => {
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full">Failed</div>
      </div>
    );
  }

  if (status === "notFound") {
    return (
      <div className="flex justify-center items-center flex-col gap-6">
        Month with name {month} and year {year} not found
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          href={"schedule/newMonth"}
        >
          Nowy miésiąc
        </Link>
      </div>
    );
  }

  return null;
});
