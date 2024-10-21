"use client";

import { useStore } from "@/store";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

export const SortRMenu = () => {
  const ascending = useStore((state) => state.fsAscending);
  const t = useTranslations("Fs");

  const [menu, setMenu] = useState([
    { title: t("order_name"), orderName: "filename", show: false },
    { title: t("order_type"), orderName: "file_type", show: false },
    { title: t("order_modify_time"), orderName: "modify_time", show: true },
    { title: t("order_file_size"), orderName: "size_bytes", show: false },
  ]);

  const handleMenuItem = (orderName: string) => {
    useStore.setState({ fsOrderName: orderName });
    setMenu((prevMenu) =>
      prevMenu.map((item) => ({
        ...item,
        show: item.orderName === orderName,
      })),
    );
  };

  const handleSortOrder = (ascending: boolean) => {
    useStore.setState({ fsAscending: ascending });
  };

  return (
    <Menu
      menuButton={
        <MenuButton>
          <div className="border-nonebg-white flex h-8 flex-row items-center justify-center gap-1 rounded-sm px-3 py-1 text-sm font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
            <HiMiniArrowsUpDown className="h-4 w-4" />
          </div>
        </MenuButton>
      }
      transition
    >
      {menu.map((item, index) => (
        <MenuItem key={index} onClick={() => handleMenuItem(item.orderName)}>
          <div className="mr-1 flex w-4 items-center justify-center">{item.show && <FiCheck />}</div>
          <span>{item.title}</span>
        </MenuItem>
      ))}

      <div className="border-t border-neutral-200" />

      <MenuItem onClick={() => handleSortOrder(true)}>
        <div className="mr-1 flex w-4 items-center justify-center">{ascending && <FiCheck />}</div>
        <span>{t("order_ascending")}</span>
      </MenuItem>

      <MenuItem onClick={() => handleSortOrder(false)}>
        <div className="mr-1 flex w-4 items-center justify-center">{!ascending && <FiCheck />}</div>
        <span>{t("order_descending")}</span>
      </MenuItem>
    </Menu>
  );
};
