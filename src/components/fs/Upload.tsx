"use client";
import { cancel, uploadFileAction } from "@/actions/fs";
import useAction from "@/actions/useAction";
import { UploadAction } from "@/common/enums";
import Dialogs from "@/components/ui/dialogs";
import Loading from "@/components/ui/loading";
import { bytesFormat, getType } from "@/libs/utils";
import { useStore } from "@/store";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { getIconMap } from "./Icons";

export const Upload = ({ path, updateData, createFolder }: { path: string; updateData: () => void; createFolder: () => void }) => {
  const inputFolder = useRef<HTMLInputElement | null>(null);

  const [dialogs, setDialogs] = useState(false);
  const [directoryMode, setDirectoryMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dev_name = "test";
  const [uploadQueue, setUploadQueue] = useState<any[]>([]);
  const [files, setFiles] = useState<Array<{ file: File; progress: number; status: string }>>([]);
  const fsAction = useStore((state) => state.fsAddAction);

  // Memoized status message
  const statusMessage = useMemo(() => {
    const pendingCount = files.filter((file) => file.status === "pending" || file.status === "uploading").length;

    return pendingCount > 0 ? `正在上传文件` : "所有文件已上传";
  }, [files]);

  // Update file status
  const updateFileStatus = useCallback((file: File, status: string, progress = 0) => {
    setFiles((prevFiles) => prevFiles.map((f) => (f.file === file ? { ...f, status, progress } : f)));
  }, []);

  // Handle file or directory selection
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []).map((file) => ({
      file,
      progress: 0,
      status: "pending",
    }));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleFileClick = () => {
    setDirectoryMode(false);
    setTimeout(() => {
      if (inputFolder.current) {
        inputFolder.current.value = ""; // Reset the file input, twice onChange event can be called
        inputFolder.current.click();
      }
    }, 0);
  };

  const handleDirectoryClick = () => {
    setDirectoryMode(true);
    setTimeout(() => {
      if (inputFolder.current) {
        inputFolder.current.value = ""; // Reset the file input, twice onChange event can be called
        inputFolder.current.click();
      }
    }, 0);
  };
  const { run } = useAction(uploadFileAction);

  const uploadFile = async (file: File, index: number) => {
    let file_path = path;
    if (file.webkitRelativePath) {
      let p = file.webkitRelativePath;
      p = p.slice(0, p.lastIndexOf("/"));
      file_path = file_path + p;
    }

    const formData = new FormData();
    formData.append("field", file);
    formData.append("dev_name", dev_name);
    formData.append("file_path", file_path);

    try {
      updateFileStatus(file, "uploading", 0);
      await run(formData);
      updateFileStatus(file, "success", 100);
    } catch (error) {
      console.error(`Failed to upload file: ${file.name}`, error);
      updateFileStatus(file, "error");
    } finally {
      setUploadQueue((queue) => queue.slice(1));
    }
  };
  useEffect(() => {
    if (uploadQueue.length > 0) {
      const { file, index } = uploadQueue[0];
      uploadFile(file, index);
    }
  }, [uploadQueue]);

  useEffect(() => {
    const pendingFiles = files.filter((file) => file.status === "pending");
    if (pendingFiles.length > 0 && uploadQueue.length === 0) {
      const newQueue = pendingFiles.map((file, index) => ({
        file: file.file,
        index,
      }));
      setUploadQueue(newQueue);
      setUploading(true);
    }
  }, [files, uploadQueue]);

  useEffect(() => {
    if (inputFolder.current) {
      (inputFolder.current as any).webkitdirectory = directoryMode ? "true" : undefined;
    }
  }, [directoryMode]);

  //monitor button click on the layout
  useEffect(() => {
    if (fsAction == UploadAction.UPLOAD_DIR) {
      handleDirectoryClick();
    } else if (fsAction == UploadAction.UPLOAD_FILE) {
      handleFileClick();
    }
    useStore.setState({ fsAddAction: UploadAction.NONE });
  }, [fsAction]);
  const close = () => {
    alert("s");
    cancel();
    // const pendingFiles = files.filter(
    //   (file) => file.status === "pending" || file.status === "uploading",
    // );

    // if (pendingFiles.length > 0) {
    //   setDialogs(true);
    // } else {
    //   setFiles([]);
    //   updateData();
    //   setUploading(false);
    // }
  };

  return (
    <>
      <Dialogs
        open={dialogs}
        title="要取消上传吗？"
        confirmBtn="确认取消"
        cancelBtn="继续上传"
        onClose={() => {
          setDialogs(false);
        }}
        onConfirm={() => {
          setFiles([]);
          setUploadQueue([]);
          setUploading(false);
          setDialogs(false);
        }}
      >
        仍有文件在上传中，确认取消吗？
      </Dialogs>
      <Menu
        menuButton={
          <MenuButton>
            <div className="flex h-8 flex-row items-center justify-center gap-1 rounded-sm border border-neutral-300 bg-white px-3 py-1 text-sm font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900">
              <IoMdAdd />
              新建或上传
            </div>
          </MenuButton>
        }
        transition
      >
        <MenuItem onClick={createFolder}>新建文件夹</MenuItem>
        <div className="m-2 border-t border-neutral-200" />

        <MenuItem onClick={handleFileClick}>上传文件</MenuItem>
        <MenuItem onClick={handleDirectoryClick}>上传文件夹</MenuItem>
      </Menu>
      <input type="file" multiple onChange={handleUpload} ref={inputFolder} style={{ display: "none" }} />

      {uploading && (
        <div className="fixed bottom-0 right-8 animate-slideUp rounded bg-white shadow-lg shadow-neutral-300">
          <div className="flex flex-row items-center justify-between gap-1 rounded-tl-lg rounded-tr-lg bg-gray-100 px-4 py-3 text-base font-medium text-neutral-800">
            {statusMessage}

            <IoClose className="h-5 w-5 cursor-pointer" onClick={close} />
          </div>

          <div className="mt-1 max-h-[30vh] w-96 overflow-auto pb-3">
            {files.map((data, index) => {
              const fileType = getType(data.file.name);
              const { icon: Icon = FaFileAlt, color = "text-red-600" } = getIconMap(fileType) || {};
              const className = `w-7 h-7 ${color}`;
              return (
                <div key={index} className="m-1 flex flex-row items-center rounded bg-blue-50 p-3">
                  <div>
                    <Icon className={className} />
                  </div>
                  <div className="ml-2 flex w-full flex-row items-center justify-between">
                    <div>
                      <div className="line-clamp-1 w-full text-neutral-700">{data.file.name}</div>
                      <div className="text-xs text-neutral-500">{bytesFormat(data.file.size)}</div>
                    </div>
                    <div>
                      {data.status === "uploading" && <Loading className=" " />}
                      {data.status === "success" && <FaCheckCircle className="h-5 w-5 text-green-600" />}
                      {data.status === "error" && <div className="text-red-600">上传失败</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
