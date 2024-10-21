import { TfiHarddrive } from "react-icons/tfi";

interface Props {
  item: { brand: string; sn: string };
  className?: string;
}

function Unuse({ item, className }: Props) {
  return (
    <div
      className={`${className} border shadow-md border-neutral-100 p-5 rounded flex gap-4  text-sm`}
    >
      <div className="w-10 h-10 rounded-full bg-neutral-200 items-center justify-center flex">
        <TfiHarddrive className="w-6 h-6 text-white" />
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between">
          <div>{item.brand}</div>
          <div className="flex items-end">
            <input type="checkbox" id="toggle" className="hidden" />

            <div className="w-4 h-4 border border-gray-400   flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4 hidden pointer-events-none"
                viewBox="0 0 20 20"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
              >
                <path d="M4.5 12.5l2.5 2.5 5-5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-neutral-500 text-xs mt-1">{item.sn}</div>
        <div className="text-neutral-500 text-xs mt-1 flex flex-row gap-1">
          <div className="px-1 text-white bg-neutral-400 rounded-sm">1.8 T</div>
          <div>Hard Driver Disk</div>
        </div>
      </div>
    </div>
  );
}

export default Unuse;
