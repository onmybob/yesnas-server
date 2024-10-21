"use client";
import { UploadAction } from "@/common/enums";
import { useStore } from "@/store";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useTranslations } from "next-intl";
import { IoMdAdd } from "react-icons/io";

export const AddButton = () => {
  const t = useTranslations("Fs");

  return (
    <Menu
      menuButton={
        <MenuButton>
          <div className="flex h-8 flex-row items-center justify-center gap-1 rounded-sm border border-gray-950 bg-gray-950 px-3 py-1 text-sm font-normal text-white hover:bg-gray-800">
            <IoMdAdd />
            {t("new_upload")}
          </div>
        </MenuButton>
      }
      transition
    >
      <MenuItem onClick={() => useStore.setState({ fsAddAction: UploadAction.NEW_DIR })}>{t("create_folder")}</MenuItem>
      <MenuItem onClick={() => useStore.setState({ fsAddAction: UploadAction.NEW_FILE })}>{t("create_file")}</MenuItem>

      <div className="m-2 border-t border-neutral-200" />

      <MenuItem onClick={() => useStore.setState({ fsAddAction: UploadAction.UPLOAD_FILE })}>{t("upliad_files")}</MenuItem>
      <MenuItem onClick={() => useStore.setState({ fsAddAction: UploadAction.UPLOAD_DIR })}>{t("upliad_folder")}</MenuItem>
    </Menu>
  );
};
