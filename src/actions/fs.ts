/**
 * Deprecated, replaced with API route
 */

"use server";

import { HttpMethods } from "@/common/enums";
import { arrayBufferToBase64, arrayBufferToText } from "@/libs/utils";
import sharp from "sharp";
import { R } from "./result";

// compress image
const compressImage = async (buffer: Buffer, quality: number = 80): Promise<Buffer> => {
  return sharp(buffer).resize({ width: 200 }).jpeg({ quality }).toBuffer();
};

const controller = new AbortController();

// request function
const apiRequest = async (url: string, method: HttpMethods, jsonData?: Record<string, any> | FormData, isFormData: boolean = false, signal?: AbortSignal) => {
  console.log("[request: ]", url, method, jsonData);

  const headers: { [key: string]: string } = {};
  let body: string | FormData | undefined;

  if (isFormData) {
    body = jsonData as FormData;
  } else {
    headers["Content-Type"] = "application/json";
    body = jsonData ? JSON.stringify(jsonData) : undefined;
  }

  try {
    const res = await fetch(url, {
      //TODO
      method: method.toString(),
      headers: headers,
      body: body,
      signal: controller.signal,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Request failed:", errorText);
      throw new Error(`Request failed: ${errorText}`);
    }

    const contentType = res.headers.get("Content-Type");

    let data: any;
    if (contentType?.includes("application/json")) {
      data = await res.json();
    } else if (contentType?.includes("application/octet-stream")) {
      const arrayBuffer = await res.arrayBuffer();
      data = arrayBufferToText(arrayBuffer);
    } else if (contentType?.includes("image/jpeg") || contentType?.includes("image/png") || contentType?.includes("image/gif")) {
      const buffer = Buffer.from(await res.arrayBuffer());
      const compressedBuffer = await compressImage(buffer);
      data = arrayBufferToBase64(compressedBuffer);
    } else {
      data = await res.text();
    }
    //console.log("[response:]", data);
    return R.success(data);
  } catch (error: any) {
    console.error("Error occurred:", error);
    return R.error(error.message);
  }
};

//重命名
export const renameAction = async (devName: string, oldName: string, newName: string, filePath: string) => {
  const payload = {
    dev_name: devName,
    file_path: encodeURIComponent(filePath + oldName),
    file_name: newName,
  };

  const url = `${process.env.API_SERVER_URL}/fs/rename/${payload.dev_name}/${payload.file_path}/${payload.file_name}`;

  return apiRequest(url, HttpMethods.PUT, payload);
};

//创建目录
export const createDirAction = async (devName: string, dirName: string, filePath: string) => {
  const path = encodeURIComponent(filePath + dirName);
  const url = `${process.env.API_SERVER_URL}/fs/create_dir/${devName}/${path}`;

  return apiRequest(url, HttpMethods.POST);
};

//get file from remote
export const viewFileAction = async (devName: string, filePath: string) => {
  const path = encodeURIComponent(filePath);
  const url = `${process.env.API_SERVER_URL}/fs/view/${devName}/${path}`;

  return apiRequest(url, HttpMethods.GET);
};

//upload files
export const uploadFileAction = async (formData: FormData, signal?: any) => {
  console.log("action", signal);
  const url = `${process.env.API_SERVER_URL}/fs/upload`;
  return apiRequest(url, HttpMethods.POST, formData, true);
};

//upload files
export const uploadFileAction2 = async (formData: FormData) => {
  const url = `${process.env.API_SERVER_URL}/fs/upload`;
  return apiRequest(url, HttpMethods.POST, formData, true);
};

export const cancel = () => {
  console.log("cancel");
  controller.abort();
  console.log(controller);

  console.log("cancel");
};
