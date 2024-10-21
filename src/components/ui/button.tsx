import { cn } from "@/libs/utils";
import { MouseEventHandler } from "react";

interface Props {
  icon?: any;
  title?: string;
  onClick?: MouseEventHandler;
  className?: string;
}

const Button = ({ icon, title, onClick, className }: Props) => {
  const LinkIcon = icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-nomal flex h-8 flex-row items-center justify-center gap-1 rounded-sm border border-none bg-gray-950 px-3 py-1 text-sm font-normal text-white hover:bg-gray-800",
        className,
      )}
    >
      {icon && <LinkIcon className="h-4 w-4" />}

      <span>{title}</span>
    </button>
  );
};

export default Button;
