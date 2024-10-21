import { API_BASE_URL } from "@/common/constants";
import { get } from "@/libs/httpRequest";

export const getStorage = async () => {
  return get(`${API_BASE_URL}/dev`);
};
