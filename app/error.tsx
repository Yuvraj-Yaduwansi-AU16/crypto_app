/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-2xl font-bold text-red-500 mx-4">
        Error loading data...
        <br />
        {error.message}
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default error;
