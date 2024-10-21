"use client";

import { cn } from "@/libs/utils";
import React from "react";

const StorageButton = ({ text, isSelected, onClick, icon }: { icon: any; text: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mr-1 flex translate-y-[2px] flex-row items-center gap-1 border-b-2 border-gray-300 px-3 py-2 text-gray-500 first:pl-0 hover:border-b-2 hover:border-gray-950 hover:text-gray-950",
        isSelected ? "hover: border-gray-950 text-gray-950" : "",
      )}
    >
      {React.cloneElement(icon, { className: "h-4 w-4" })}
      {text}
    </button>
  );
};

export default StorageButton;
