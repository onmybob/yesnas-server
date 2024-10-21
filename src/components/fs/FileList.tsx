"use client";

import { UploadAction } from "@/common/enums";
import { Dev, File } from "@/common/models/fs";
import Dialogs from "@/components/ui/dialogs";
import { REGEX_FILENAME } from "@/libs/regex";
import { createFile, getDir } from "@/service/fs";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GridShow } from ".";

const FileList = ({ dev }: { dev: Dev }) => {
  const t = useTranslations("Fs");

  const [createModal, setCreateModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [data, setData] = useState<File[]>([]);

  const currentPathList = useStore((store) => store.fsCurrentPathList);
  const isRefresh = useStore((state) => state.fsRefreshButtonClicked);
  const addAction = useStore((state) => state.fsAddAction);
  const orderName = useStore((state) => state.fsOrderName);
  const ascending = useStore((state) => state.fsAscending);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isRefresh) {
      fetchFiles();
    }
    if ([UploadAction.NEW_DIR, UploadAction.NEW_FILE].includes(addAction)) {
      setCreateModal(true);
      setModalTitle(addAction === UploadAction.NEW_FILE ? t("create_file") : t("create_folder"));
    }
    useStore.setState({ fsRefreshButtonClicked: false, fsAddAction: UploadAction.NONE });
  }, [addAction, isRefresh]);

  const fetchFiles = async () => {
    const res = await getDir(dev.id, getCurrentPath());
    setData(res.data);
  };

  const getCurrentPath = () => {
    const filePath = currentPathList.join("/").replace(/\/+/g, "/");
    return filePath.endsWith("/") ? filePath : `${filePath}/`;
  };

  const updateData = (data: File[]) => {
    setData(data);
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPathList, dev]);

  const sortedData = useMemo(() => {
    const orderBy: keyof File = orderName as keyof File;
    return data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return ascending ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return ascending ? 1 : -1;
      return 0;
    });
  }, [data, orderName, ascending]);

  const create = async () => {
    if (inputValue.trim()) {
      const checkFile = data.find((f: any) => f.filename === inputValue);

      if (checkFile) {
        toast.error(t("name_exists"));
        return;
      }
      if (REGEX_FILENAME.test(inputValue)) {
        if (modalTitle == t("create_file")) {
          await createFile(dev.id, getCurrentPath(), inputValue, 0);
        } else {
          await createFile(dev.id, getCurrentPath(), inputValue, 1);
        }
        await fetchFiles();
        toast.success(t("success"));
        setCreateModal(false);
      } else {
        toast.error(t("name_invalid") + inputValue);
      }
    } else {
      setCreateModal(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <Dialogs open={createModal} title={modalTitle} confirmBtn={t("submit")} cancelBtn={t("cancel")} onClose={() => setCreateModal(false)} onConfirm={create}>
        <input type="text" ref={inputRef} onChange={handleInputChange} className="block w-64 rounded-sm border border-gray-300 bg-gray-50 p-2 text-sm outline-none" />
      </Dialogs>

      <div className="flex w-full flex-wrap items-start justify-start px-3 pt-3">
        <GridShow dev={dev} updateData={updateData} data={sortedData} currentPath={getCurrentPath()} />
      </div>
    </div>
  );
};

export default FileList;
