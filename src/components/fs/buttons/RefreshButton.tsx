"use client";

import Button from "@/components/ui/button";
import { useStore } from "@/store";
import { TbRefresh } from "react-icons/tb";

export const RefreshButton = () => {
  const refresh = () => {
    useStore.setState({ fsRefreshButtonClicked: true });
  };
  return <Button icon={TbRefresh} onClick={refresh} className="bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900" />;
};
