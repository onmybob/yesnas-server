import { cn } from "@/libs/utils";
import { useState } from "react";
import { FiMaximize, FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import IconButton from "./icon-button";

interface Props {
  title: string;
  onClose?: () => void;
  toggleMin?: (content: boolean) => void;
  children: React.ReactNode;
}
const NotificationBar = ({ title, onClose, toggleMin, children }: Props) => {
  const [visible, setVisible] = useState({ full: true, content: true });
  return (
    <div
      className={cn(
        "absolute bottom-5 right-10 z-50 w-96 break-words rounded border border-gray-200 bg-white shadow-[0px_0px_14px_3px_rgba(0,_0,_0,_0.1)]",
        !visible.full ? "invisible" : "",
      )}
    >
      <div className="flex h-12 flex-row items-center justify-between bg-gray-100 px-3 py-2 text-sm">
        <div>{title}</div>
        <div className="flex flex-row gap-2">
          <IconButton
            onClick={() => {
              setVisible((prev) => ({ ...prev, content: !prev.content }));
              if (toggleMin) toggleMin(visible.content);
            }}
            icon={visible.content ? <FiMinus /> : <FiMaximize />}
            className="hover:bg-gray-200"
          />
          <IconButton
            onClick={() => {
              setVisible({ full: false, content: false });
              if (onClose) onClose();
            }}
            icon={<IoMdClose />}
            className="hover:bg-gray-200"
          />
        </div>
      </div>
      <div className={cn("scrollbar overflow-y-auto transition-all duration-300", !visible.content ? "max-h-0 min-h-0 overflow-y-hidden" : "max-h-96 min-h-20")}>{children}</div>
    </div>
  );
};

export default NotificationBar;
