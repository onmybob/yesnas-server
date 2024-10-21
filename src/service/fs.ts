import { API_BASE_URL } from "@/common/constants";
import { del, get, post, put, upload } from "@/libs/httpRequest";

/**
 * Retrieves files from a specified path on a given device.
 *
 * @param devId - The name of the device where the files are located (e.g., storage pool, network storage).
 * @param path - The directory path from which to retrieve the files.
 * @returns A promise that resolves to the result of the API call.
 */
export const getDir = async (devId: string, path: string) => {
  const file_path = encodeURIComponent(path);
  return get(`${API_BASE_URL}/fs/${devId}/${file_path}`);
};

/**
 * Sends a POST request to a specified path on a given device.
 *
 * @param devId - The name of the device where the file should be created or modified (e.g., storage pool, network storage).
 * @param path - The current directory path where the file should be created or modified.
 * @param name - The name of the file or resource to be created or modified.
 * @param type - 1 folder, 0 file.

 * @returns A promise that resolves when the POST request completes.
 */

export const createFile = async (devId: string, path: string, name: string, type: number) => {
  const newPath = encodeURIComponent(path + name);
  const url = `${API_BASE_URL}/fs/${devId}/${newPath}`;
  post(url, { type: type });
};

/**
 * Rename filename or directory
 */
export const renameFile = async (devId: string, oldFilePath: string, nweName: string) => {
  const filePath = encodeURIComponent(oldFilePath);
  const url = `${API_BASE_URL}/fs/${devId}/${filePath}/${nweName}`;
  put(url);
};
/**
 * Delte filename or directory

 */
export const recycleBin = async (devId: string, data: Record<string, any>) => {
  const url = `${API_BASE_URL}/fs/${devId}`;
  return del(url, data);
};

export const readCode = async (devId: string, filePath: string, fileName: string) => {
  filePath = encodeURIComponent(filePath);
  const url = `${API_BASE_URL}/fs/${devId}/${filePath}/${fileName}`;
  return get(url);
};

export const saveCode = async (formData: FormData) => {
  const url = `${API_BASE_URL}/fs/upload`;
  return upload(url, formData);
};
