"use client";

import { ShowKind } from "@/common/enums";
import { cn } from "@/libs/utils";
import { useStore } from "@/store";
import { BiSolidGrid } from "react-icons/bi";
import { LiaListUlSolid } from "react-icons/lia";

export const ListButton = () => {
  const fsShowKind = useStore((store) => store.fsShowKind);

  return (
    <>
      <button
        type="button"
        onClick={() => useStore.setState({ fsShowKind: ShowKind.LIST })}
        className={cn("flex h-8 w-9 items-center justify-center rounded-l-sm border bg-white align-middle text-neutral-500 first:ml-0 first:rounded-l-sm hover:bg-gray-50", {
          "bg-neutral-100 text-neutral-900": fsShowKind === ShowKind.LIST,
        })}
      >
        <LiaListUlSolid className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => useStore.setState({ fsShowKind: ShowKind.GRID })}
        className={cn("-ml-2 flex h-8 w-9 items-center justify-center rounded-r-sm border bg-white align-middle text-neutral-500 hover:bg-gray-50", {
          "bg-neutral-100 text-neutral-900": fsShowKind === ShowKind.GRID,
        })}
      >
        <BiSolidGrid className="h-4 w-4" />
      </button>
    </>
  );
};
