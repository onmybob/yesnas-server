"use client";

import { Dev } from "@/common/models/fs";
import { cn } from "@/libs/utils";
import { getStorage } from "@/service/dev";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { LuDatabase } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { PiNetworkDuotone } from "react-icons/pi";
import DevButton from "./buttons/DevButton";
import StorageButton from "./buttons/StorageButton";

const Transfer = () => {
  const t = useTranslations("Fs");

  const [storageList, setStorageList] = useState<Dev[]>([]);

  const [selectedButton, setSelectedButton] = useState(t("data_pool"));
  const handleButtonClick = (text: string) => {
    setSelectedButton(text);
  };

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage();
      setStorageList(storage.data);
    };
    fetchStorage();
  }, []);

  return (
    <div className="w-[calc(100vw/2.3)]">
      <div className="mb-2 flex flex-row items-center gap-1 text-center font-semibold">
        {/* <FiCopy className="h-4 w-4" /> */}
        {t("copy_to")}
      </div>
      <div>
        <div className="mb-3 flex flex-row border-b-2 border-gray-300 text-sm">
          <StorageButton icon={<LuDatabase />} text={t("data_pool")} isSelected={selectedButton === t("data_pool")} onClick={() => handleButtonClick(t("data_pool"))} />
          <StorageButton icon={<BsUsbSymbol />} text={t("usb")} isSelected={selectedButton === t("usb")} onClick={() => handleButtonClick(t("usb"))} />
          <StorageButton icon={<PiNetworkDuotone />} text={t("cloud_drive")} isSelected={selectedButton === t("cloud_drive")} onClick={() => handleButtonClick(t("cloud_drive"))} />
          <StorageButton icon={<MdFavoriteBorder />} text={t("favorite")} isSelected={selectedButton === t("favorite")} onClick={() => handleButtonClick(t("favorite"))} />
        </div>
      </div>
      <div className="flex flex-wrap">
        {selectedButton === t("data_pool") &&
          storageList.map((device, index) => (
            <div key={index} className={cn("mb-3 h-20 w-1/3 p-1 text-sm", index % 3 === 0 ? "pl-0" : "", index % 3 === 2 ? "pr-0" : "")}>
              <DevButton dev={device} onClick={() => {}} isSelected={false} />
            </div>
          ))}

        {selectedButton === t("usb") &&
          Array.from({ length: 1 }).map((device, index) => (
            <div key={index} className={cn("mb-3 h-20 w-1/3 p-1 text-sm", index % 3 === 0 ? "pl-0" : "", index % 3 === 2 ? "pr-0" : "")}>
              <DevButton dev={{ id: "xx", dev_name: "Sandisk", capacity: 3555555, location: "xxx", used_space: 5555555 }} onClick={() => {}} isSelected={false} />
            </div>
          ))}
        {selectedButton === t("cloud_drive") &&
          Array.from({ length: 2 }).map((device, index) => (
            <div key={index} className={cn("mb-3 h-20 w-1/3 p-1 text-sm", index % 3 === 0 ? "pl-0" : "", index % 3 === 2 ? "pr-0" : "")}>
              <DevButton dev={{ id: "xxx", dev_name: "Google" + index, capacity: 3555555, location: "xxx", used_space: 5555555 }} onClick={() => {}} isSelected={false} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Transfer;
