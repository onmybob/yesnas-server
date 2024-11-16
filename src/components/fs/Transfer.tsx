"use client";

import { Dev, File } from "@/common/models/fs";
import { cn } from "@/libs/utils";
import { getStorage } from "@/service/dev";
import { getDir } from "@/service/fs";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import { LuDatabase } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { PiFolderFill, PiNetworkDuotone } from "react-icons/pi";
import DevButton from "./buttons/DevButton";
import StorageButton from "./buttons/StorageButton";

const Transfer = ({
  length,
  file,
  setTransferDev,
  setTransferPath,
}: {
  length: number;
  setTransferPath: (path: string) => void;
  setTransferDev: (dev: Dev) => void;
  file: Record<string, any> | null;
}) => {
  const t = useTranslations("Fs");
  const [storageList, setStorageList] = useState<Dev[]>([]);
  const [currentPathList, setCurrentPathList] = useState<string[]>([]);
  const [dev, setDev] = useState<Dev | null>(null);
  const [data, setData] = useState<File[]>([]);
  const [selectedButton, setSelectedButton] = useState(t("data_pool"));

  const buttonTypes = [
    { icon: <LuDatabase />, text: t("data_pool") },
    { icon: <BsUsbSymbol />, text: t("usb") },
    { icon: <PiNetworkDuotone />, text: t("cloud_drive") },
    { icon: <MdFavoriteBorder />, text: t("favorite") },
  ];

  const devicesMap = {
    [t("data_pool")]: storageList,
    [t("usb")]: [{ id: "xx", dev_name: "Sandisk", capacity: 3555555, location: "xxx", used_space: 5555555 }],
    [t("favorite")]: [],
    [t("cloud_drive")]: Array.from({ length: 2 }, (_, index) => ({
      id: `xxx${index}`,
      dev_name: `Google ${index}`,
      capacity: 3555555,
      location: "xxx",
      used_space: 5555555,
    })),
  };

  const handleButtonClick = (text: string) => {
    setSelectedButton(text);
  };

  const getCurrentPath = () => {
    const filePath = currentPathList.join("/").replace(/\/+/g, "/");
    return filePath.endsWith("/") ? filePath : `${filePath}/`;
  };

  const fetchFiles = async (dev: Dev) => {
    setDev(dev);
    const res = await getDir(dev.id, getCurrentPath(), 1);
    setData(res.data);
  };

  const updateCurrentPathCut = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, currentPathList.length - 1));
    const newPathHistory = currentPathList.slice(0, newIndex + 1);
    console.log(newPathHistory);
    setCurrentPathList(newPathHistory);
  };

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage();
      setStorageList(storage.data);
    };
    fetchStorage();
  }, []);

  const clickDev = async (dev: Dev) => {
    setTransferDev(dev);
    await fetchFiles(dev);
  };

  const fileClick = async (path: string) => {
    setCurrentPathList((prev) => [...prev, path]);
  };

  useEffect(() => {
    if (dev) {
      fetchFiles(dev);
      setTransferPath(getCurrentPath());
    }
  }, [currentPathList]);

  return (
    <div className="w-[calc(100vw/2.3)]">
      <div className="px-4 pb-2 pt-5">
        <div className="mb-2 flex flex-row items-center gap-1 text-center font-semibold">
          <FiCopy className="h-4 w-4" />
          {file && `${t("copy")} "${length}"`}
        </div>

        {/* select copy to area */}
        {!dev && (
          <>
            <div className="mb-3 flex flex-row border-b-2 border-gray-300 text-sm">
              {buttonTypes.map(({ icon, text }) => (
                <StorageButton key={text} icon={icon} text={text} isSelected={selectedButton === text} onClick={() => handleButtonClick(text)} />
              ))}
            </div>
            <div className="flex flex-wrap">
              {devicesMap[selectedButton].map((device, index) => (
                <div key={index} className={cn("mb-3 h-20 w-1/3 p-1 text-sm", index % 3 === 0 ? "pl-0" : "", index % 3 === 2 ? "pr-0" : "")}>
                  <DevButton dev={device} onClick={() => clickDev(device)} isSelected={false} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* select folder area  */}
      {dev && (
        <>
          <div className="mb-1 flex flex-row items-center gap-1 overflow-hidden whitespace-nowrap bg-gray-100 px-4 py-3 text-sm">
            <button
              onClick={() => {
                setDev(null);
                setData([]);
                setCurrentPathList([]);
              }}
              className="truncate"
            >
              {t("select-device")}
            </button>
            <div className="text-gray-400">/</div>
            <button
              onClick={() => {
                setCurrentPathList([]);
              }}
              className="truncate"
            >
              {dev?.dev_name}
            </button>

            {currentPathList.map(
              (path, index) =>
                path !== "/" && (
                  <div key={index} className="flex flex-row items-center gap-1">
                    <div className="text-gray-400">/</div>
                    <span className="truncate">
                      <button onClick={() => updateCurrentPathCut(index)}>{path}</button>
                    </span>
                  </div>
                ),
            )}
          </div>

          <div className="scrollbar-thin scrollbar h-60 overflow-y-auto">
            <ul>
              {data.map((file, index) => (
                <li
                  onClick={() => fileClick(file.filename)}
                  key={index}
                  className="flex flex-row items-center gap-2 border-b border-gray-100 px-4 py-2 text-sm hover:cursor-pointer hover:bg-gray-50"
                >
                  <PiFolderFill className="h-7 w-7 text-yellow-400" />
                  <span>{file.filename}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Transfer;
