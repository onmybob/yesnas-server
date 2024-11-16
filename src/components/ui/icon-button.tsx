import { cn } from "@/libs/utils";
import React, { MouseEventHandler } from "react";

const IconButton = ({ size = 4, icon, className, onClick }: { size?: number; icon: any; className?: string; onClick?: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button onClick={onClick} className={cn(`h-${size} w-${size} hover:rounded hover:bg-gray-100`, className)}>
      {icon && React.cloneElement(icon, { className: "h-full w-full" })}
    </button>
  );
};

export default IconButton;
