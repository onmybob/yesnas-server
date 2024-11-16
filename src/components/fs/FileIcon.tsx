"use client";
import { get } from "@/libs/httpRequest";
import { arrayBufferToBase64, getType } from "@/libs/utils";
import { useStore } from "@/store";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaFileAlt } from "react-icons/fa";
import { getIconMap } from "./Icons";

const FileIcon = ({ filename, devId, className, loadingImg = true }: { loadingImg?: boolean; filename: string; devId: string; className?: string }) => {
  const fsCurrentPathList = useStore((state) => state.fsCurrentPathList);
  let file_path = fsCurrentPathList.join("/").replace(/\/+/g, "/");
  if (!file_path.endsWith("/")) {
    file_path += "/";
  }

  const [data, setData] = useState<string>("");
  const [iconMap, setIconMap] = useState<{ icon: IconType; color: string }>({
    icon: FaFileAlt,
    color: "text-gray-600",
  });

  const type = getType(filename);

  useEffect(() => {
    if (loadingImg && ["png", "jpg", "jpeg", "gif"].includes(type)) {
      const fetchData = async () => {
        try {
          const param = encodeURIComponent(file_path + filename);
          const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/fs/view/${devId}/${param}`;

          const res = await get(url, false);
          const buffer = Buffer.from(await res.arrayBuffer());
          const data = arrayBufferToBase64(buffer);
          setData(`data:image/jpeg;base64,${data}`);
        } catch (err: any) {
        } finally {
        }
      };
      fetchData();
    } else {
      setIconMap(getIconMap(type));
    }
  }, []);
  return (
    <>
      {["png", "jpg", "jpeg", "gif"].includes(type) && data ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Image src={data} alt={filename} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "contain" }} loading="lazy" />
        </div>
      ) : (
        <>
          {React.createElement(iconMap.icon, {
            className: className ? clsx(className) : clsx("h-8 w-8"),
            style: {
              color: iconMap.color,
            },
          })}
        </>
      )}
    </>
  );
};

export default React.memo(FileIcon);
