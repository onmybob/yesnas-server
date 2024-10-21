import clsx from "clsx";
import { IconType } from "react-icons";

interface SystemProps {
  data?: { title: string; icon: IconType; value: string | number }[];
}

function System({ data }: SystemProps) {
  return (
    <div className="flex flex-col text-sm text-neutral-500">
      {data && data.length > 0 ? (
        data.map((item, index) => {
          const LinkIcon = item.icon;
          return (
            <div key={index} className={clsx("flex h-8 flex-row items-center", {})}>
              <div className="flex w-32 flex-row items-center gap-2">
                <LinkIcon />
                {item.title}
              </div>
              <div className="w-full items-end justify-end text-left text-gray-950">{item.value}</div>
            </div>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </div>
  );
}

export default System;
