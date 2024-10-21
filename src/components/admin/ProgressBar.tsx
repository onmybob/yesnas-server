"use client";

import { cn } from "@/libs/utils";

const ProgressBar = ({ value, className }: { value: number; className?: string }) => {
  return (
    <div className={cn("flex h-3 w-full overflow-hidden rounded-sm bg-neutral-200", className)}>
      <div
        className={cn("flex flex-col justify-center overflow-hidden whitespace-nowrap bg-gray-600 text-center text-xs text-white transition duration-500", className)}
        style={{ width: value + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
