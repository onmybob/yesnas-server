"use client";
import { EDIT_EXT } from "@/common/constants";
import { Dev, File } from "@/common/models/fs";
import Dialogs from "@/components/ui/dialogs";
import useClickOutside from "@/hooks/useClickOutside";
import { REGEX_FILENAME } from "@/libs/regex";
import { cn } from "@/libs/utils";
import { readCode, recycleBin, renameFile, saveCode, transfer } from "@/service/fs";
import { useStore } from "@/store";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { PiFolderFill } from "react-icons/pi";
import { CodeEditor } from "./CodeEditor";
import FileIcon from "./FileIcon";
import Transfer from "./Transfer";

interface Props {
  data: File[];
  updateData: (data: File[]) => void;
  currentPath: string;
  dev: Dev;
}

const GridShow = ({ data, dev, currentPath, updateData }: Props) => {
  const t = useTranslations("Fs");

  const [modalState, setModalState] = useState({
    del: false,
    copy: false,
    move: false,
    rename: false,
    editor: false,
  });

  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<string[]>([]);
  const [dataRender, setDataRender] = useState<Record<string, any>[]>([]);
  const [currentItem, setCurrentItem] = useState<Record<string, any> | null>(null);
  const [code, setCode] = useState<string>("");
  const [transferDev, setTransferDev] = useState<Dev | null>(null);
  const [transferPath, setTransferPath] = useState("");
  const [eventSource, setEventSource] = useState<EventSource | null>(null); // 用于存储 EventSource 实例
  const [transferMsg, setTransferMsg] = useState();
  const [icons, setIcons] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  useMemo(() => {
    const generatedIcons = data.map((item) =>
      !item.is_dir ? <FileIcon devId={dev.id} key={item.filename} filename={item.filename} /> : <PiFolderFill key={item.filename} className="h-10 w-10 text-yellow-400" />,
    );
    setIcons(generatedIcons);
    setDataRender(data);
  }, [data]);

  const getData = useCallback(
    async (item: Record<string, any>) => {
      const res = await readCode(dev.id, item.file_path, item.filename);
      const buffer = Buffer.from(res.data.data, "base64");
      const decodedString = buffer.toString("utf-8");
      setCode(decodedString);
    },
    [dev.id],
  );

  const editClick = async (item: Record<string, any>) => {
    if (!EDIT_EXT.includes(item.file_type)) {
      return;
    }
    setCurrentItem(item);
    getData(item);
    setModalState((prev) => ({ ...prev, editor: true }));
  };

  const renameClick = (item: Record<string, any>) => {
    setCurrentItem(item);
    setInputValue(item.filename);
    setModalState((prev) => ({ ...prev, rename: true }));
  };

  const removeClick = async (item: Record<string, any>) => {
    setModalState((prev) => ({ ...prev, del: true }));
    setCurrentItem(item);
  };
  const copyClick = async (item: Record<string, any>) => {
    setTransferDev(null);
    setTransferPath("");
    setModalState((prev) => ({ ...prev, copy: true }));
    setCurrentItem(item);
  };
  const moveClick = async (item: Record<string, any>) => {
    setModalState((prev) => ({ ...prev, move: true }));
    setCurrentItem(item);
  };

  const handleCopy = async () => {
    const paths = [{ path: currentItem?.file_path + currentItem?.filename, is_dir: currentItem?.is_dir }];

    selectedIndices.forEach((filename) => {
      if (currentItem?.filename !== filename) {
        data.map((item: File) => {
          if (item.filename == filename) {
            paths.push({ path: currentItem?.file_path + filename, is_dir: item.is_dir });
          }
        });
      }
    });

    const jsonStr = { src_dev_id: dev.id, paths: paths, dest_dev_id: transferDev?.id, dest_path: transferPath };
    // const newEventSource = new EventSource("/api/sse/fs/copymove?data=" + JSON.stringify(jsonStr));

    // newEventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log(data);
    //   setTransferMsg(event.data);
    // };
    // setEventSource(newEventSource); // 保存 EventSource 实例

    // getNotification("copy", "running");

    await transfer(dev.id, { paths: paths, dest_dev_id: transferDev?.id, dest_path: transferPath });
  };

  const handleSelClick = (event: React.MouseEvent, item: Record<string, any>) => {
    const target = event.target as HTMLElement;
    const menuButton = target.closest(".operator");

    if (menuButton) {
      return;
    }
    setSelectedIndices([]);
    if (item.is_dir) {
      //updateCurrentPath(item.filename);
      useStore.setState((state) => ({
        fsCurrentPathList: [...state.fsCurrentPathList, item.filename],
      }));
      return;
    }
    editClick(item);
  };
  const handleRename = async () => {
    if (inputValue.trim()) {
      const checkFile = data.find((f: any) => f.filename === inputValue);

      if (checkFile) {
        toast.error(t("name_exists"));
        return;
      }
      //正则表达式判断文件名字是否符合
      if (REGEX_FILENAME.test(inputValue)) {
        await renameFile(dev.id, currentPath + currentItem?.filename, inputValue);
        const updatedData = data.map((d) => (d.filename === currentItem?.filename ? { ...d, filename: inputValue } : d));
        updateData(updatedData);
        toast.success(t("success"));
        setModalState((prev) => ({ ...prev, rename: false }));
      } else {
        toast.error(t("name_invalid") + inputValue);
      }
    } else {
      setModalState((prev) => ({ ...prev, rename: false }));
    }
  };

  const handleDelete = async () => {
    if (!currentItem) return;
    const body = [
      {
        dev_id: dev.id,
        path: currentItem.file_path + currentItem.filename,
      },
    ];

    selectedIndices.forEach((filename) => {
      if (currentItem.filename !== filename) {
        body.push({
          dev_id: currentItem.dev_name,
          path: currentItem.file_path + filename,
        });
      }
    });
    const res = await recycleBin(dev.id, body);
    if (res.code === 2000) {
      toast.success(t("success"));
      setSelectedIndices([]);
      const newData = data.filter((d) => !selectedIndices.includes(d.filename)).filter((d) => d.filename !== currentItem.filename);
      updateData(newData);
    } else {
      toast.error(res.msg);
    }

    setModalState((prev) => ({ ...prev, del: false }));
    setCurrentItem(null);
  };

  const toggleSelected = (filename: string) => {
    setSelectedIndices((prev) => (prev.includes(filename) ? prev.filter((f) => f !== filename) : [...prev, filename]));
  };

  useClickOutside({
    refs: buttonRefs.current.map((ref) => ({ current: ref }) as React.RefObject<HTMLElement>),
    callback: () => {
      setSelectedIndices([]);
      setModalState((prev) => ({ ...prev, rename: false }));
    },
    className: "tool-bar",
  });
  const downloadClick = (item: Record<string, any>) => {
    const file_path = encodeURIComponent(item.file_path + item.filename);
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/fs/view/${dev.id}/${file_path}`;
    window.location.href = url;
  };
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("field", new Blob([code], { type: "text/plain" }), currentItem?.filename);
    formData.append("dev_id", dev.id);
    formData.append("file_path", currentItem?.file_path);
    const res = await saveCode(formData);
    if (res.code != 2000) {
      toast.error(res.data.msg);
    } else {
      toast.success(t("success"));
    }
    setModalState((prev) => ({ ...prev, editor: false }));
  };

  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, []);
  // useEffect(() => {
  //   if (inputRef.current && renameModal) {
  //     if (inputValue.indexOf(".") > -1) {
  //       inputRef.current.selectionStart = 0;
  //       inputRef.current.selectionEnd = inputValue.lastIndexOf(".");
  //       inputRef.current.focus();
  //     }
  //   }
  // }, [inputValue, renameModal]);

  return (
    <>
      <Dialogs
        open={modalState.del}
        title={t("warning")}
        confirmBtn={t("submit")}
        icon={<ExclamationTriangleIcon />}
        cancelBtn={t("cancel")}
        onClose={() => {
          setCurrentItem(null);
          setModalState((prev) => ({ ...prev, del: false }));
        }}
        onConfirm={handleDelete}
      >
        <div className="mt-1 text-sm text-gray-700">文件删除后不可恢复，确定吗？</div>
      </Dialogs>

      <Dialogs
        open={modalState.editor}
        title=""
        confirmBtn={t("save")}
        cancelBtn={t("cancel")}
        onClose={() => setModalState((prev) => ({ ...prev, editor: false }))}
        onConfirm={handleSave}
      >
        {currentItem && (
          <div>
            <div className="mb-3 flex flex-row">
              <MdOutlineEditNote className="h-6 w-6" />
              {dev.dev_name} {currentItem?.file_path + "" + currentItem?.filename}
            </div>
            <CodeEditor file_type={currentItem!.file_type} dev={dev} data={code} setCode={setCode} />
          </div>
        )}
      </Dialogs>

      <Dialogs
        open={modalState.rename}
        title={t("rename")}
        confirmBtn={t("submit")}
        cancelBtn={t("cancel")}
        onClose={() => setModalState((prev) => ({ ...prev, rename: false }))}
        onConfirm={handleRename}
      >
        <input
          type="text"
          ref={inputRef}
          onChange={handleInputChange}
          defaultValue={currentItem?.filename}
          className="block w-64 rounded-sm border border-gray-300 bg-gray-50 p-2 text-sm outline-none"
        />
      </Dialogs>

      <Dialogs
        noClass={true}
        open={modalState.copy}
        {...(transferDev ? { confirmBtn: t("copy_here") } : {})}
        cancelBtn={t("cancel")}
        onClose={() => {
          setModalState((prev) => ({ ...prev, copy: false }));
          if (eventSource) {
            eventSource.close();
            setEventSource(null);
          }
        }}
        onConfirm={handleCopy}
      >
        <Transfer file={currentItem} length={selectedIndices.length} setTransferDev={setTransferDev} setTransferPath={setTransferPath} />
      </Dialogs>

      {dataRender.map((item, index) => (
        <div
          key={index}
          onClick={(e) => handleSelClick(e, item)}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          className={cn("group mb-2 mr-2 h-36 w-32 cursor-pointer text-center hover:bg-gray-50", selectedIndices.includes(item.filename) ? "bg-gray-50" : "")}
        >
          <div className="flex flex-col items-center justify-between">
            <div
              className={cn(
                "pointer-events-none flex w-full items-center justify-between p-2 pr-0 group-hover:pointer-events-auto group-hover:opacity-100",
                selectedIndices.includes(item.filename) ? "group-hover:opacity-100" : "opacity-0",
              )}
            >
              <div>
                <div className="operator">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelected(item.filename)}
                      checked={selectedIndices.includes(item.filename)}
                      className="form-checkbox h-4 w-4 accent-gray-500 transition duration-150 ease-in-out"
                    />
                  </label>
                </div>
              </div>

              <div className="operator">
                <Menu
                  menuButton={
                    <MenuButton className="flex w-7 flex-col items-end pr-2">
                      <BsThreeDotsVertical />
                    </MenuButton>
                  }
                  transition
                >
                  <MenuItem onClick={EDIT_EXT.includes(item.file_type) ? () => editClick(item) : undefined} disabled={!EDIT_EXT.includes(item.file_type)}>
                    {t("open")}
                  </MenuItem>

                  <div className="border-t border-neutral-200" />
                  <MenuItem onClick={item.file_type !== "folder" ? () => downloadClick(item) : undefined} disabled={item.file_type === "folder"}>
                    {t("download")}
                  </MenuItem>
                  <MenuItem disabled={selectedIndices.length > 1} onClick={() => renameClick(item)}>
                    {t("rename")}
                  </MenuItem>
                  <MenuItem onClick={() => {}}>{t("favorite")}</MenuItem>
                  <div className="border-t border-neutral-200" />
                  <MenuItem onClick={() => copyClick(item)}>{t("copy")}</MenuItem>
                  <MenuItem onClick={() => moveClick(item)}>{t("move")}</MenuItem>
                  <MenuItem className="text-red-500" onClick={() => removeClick(item)}>
                    {t("delete")}
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="flex h-14 w-full items-center justify-center text-center">{icons[index]}</div>
            <div className="mt-1 flex w-32 items-end justify-center break-words">
              <p className="line-clamp-2">{item.filename}</p>
            </div>
            <div className="mb-2 text-tiny text-neutral-600">{dayjs(item.modify_time).format("YYYY-MM-DD")}</div>
          </div>
        </div>
      ))}
    </>
  );
};

const MemoizedGridShow = memo(GridShow);
export { MemoizedGridShow as GridShow };
