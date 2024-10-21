import { Dev } from "@/common/models/fs";
import ProgressBar from "@/components/admin/ProgressBar";
import clsx from "clsx";

interface Props {
  dev: Dev;
  onClick: () => void;
  isSelected: boolean;
}
const DevButton = ({ dev, onClick, isSelected }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx("flex w-full flex-col gap-1 rounded-sm border border-gray-200 px-3 py-2 pb-3 hover:bg-neutral-50", isSelected ? "border border-gray-400 bg-gray-50" : "")}
    >
      <div className="flex w-full flex-row items-baseline justify-between">
        <span>{dev.dev_name}</span>
        <span className="text-tiny text-gray-500"> 12GB / 200GB</span>
      </div>

      <ProgressBar value={50} className="h-2" />
    </button>
  );
};

export default DevButton;
