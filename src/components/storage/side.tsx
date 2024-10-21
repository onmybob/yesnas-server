import clsx from "clsx";
import Link from "next/link";
import { LuDatabase } from "react-icons/lu";

interface Props {
  name: string;
  capital: string;
  size: number;
}

function Side({ name, capital, size }: Props) {
  return (
    <Link
      href=""
      className={clsx("mt-3 flex items-center justify-center gap-2 rounded-sm border border-neutral-100 text-sm hover:bg-neutral-50 md:flex-none md:justify-start md:p-2 md:px-4")}
    >
      <div className="flex flex-row items-center">
        <LuDatabase className="h-8 w-8 text-neutral-700" />
        <div className="ml-2">
          <div>{name}</div>
          <div className="mt-1 text-xs text-neutral-500">
            {size} disks, capacity {capital}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Side;
