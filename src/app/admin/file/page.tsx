"use client";

import { Dev } from "@/common/models/fs";
import DevButton from "@/components/fs/buttons/DevButton";
import FileList from "@/components/fs/FileList";
import { getStorage } from "@/service/dev";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { LuDatabase } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { PiNetworkDuotone } from "react-icons/pi";

/**
 *  File Manager, including local filesystem, and network management, and usb device storage.
 */
function Page() {
  const [storageList, setStorageList] = useState<Dev[]>([]);
  const [selectDev, setSelectDev] = useState<Dev>();
  const t = useTranslations("Fs");
  const devClick = (dev: Dev) => {
    // useStore.setState({ fsDevName: devName, fsDevId: devId });
    setSelectDev(dev);
    useStore.setState({ fsCurrentPathList: ["/"] });
  };
  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage();
      setStorageList(storage.data);
      //default dev
      if (storage.data.length > 0) {
        setSelectDev(storage.data[0]);
        useStore.setState({ fsDevName: storage.data[0].dev_name, fsDevId: storage.data[0].id });
      }
    };
    fetchStorage();

    useStore.setState({ fsCurrentPathList: ["/"] });
  }, []);

  return (
    <div className="flex flex-row text-sm">
      <div className="flex h-[calc(100vh-4rem)] w-72 flex-col border-r border-neutral-100">
        <p className="mb-3 mt-10 flex flex-row items-center gap-2 pl-5 pr-5 text-neutral-500">
          <LuDatabase className="h-4 w-4" />
          {t("data_pool")}
        </p>
        <div className="flex flex-col gap-2 pb-8 pl-5 pr-5">
          {storageList.map((item, index) => (
            <DevButton key={index} dev={item} onClick={() => devClick(item)} isSelected={selectDev?.id === item.id} />
          ))}
        </div>
        <p className="mb-5 mt-3 flex flex-row items-center gap-2 pl-5 pr-5 text-neutral-500">
          <BsUsbSymbol className="h-4 w-4" />
          {t("usb")}
        </p>

        <p className="mb-5 mt-3 flex flex-row items-center gap-2 pl-5 pr-5 text-neutral-500">
          <PiNetworkDuotone className="h-4 w-4" />
          {t("cloud_drive")}
        </p>
        <p className="mb-5 mt-3 flex flex-row items-center gap-2 pl-5 pr-5 text-neutral-500">
          <MdFavoriteBorder className="h-4 w-4" />
          {t("favorite")}
        </p>
      </div>

      <div className="h-[calc(100vh-4rem)] w-full overflow-y-auto">{selectDev && <FileList dev={selectDev} />}</div>
    </div>
  );
}

export default Page;
