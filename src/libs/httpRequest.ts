/**
 * Client-side fetch request tools
 * According to https://segmentfault.com/a/1190000043625641
 */

import { useStore } from "@/store";

/**
 * Check response status code
 * @param res Response
 * @returns Response status code is 200, then error message, otherwise response
 */
const checkStatus = (res: Response) => {
  if (res.ok) {
    return res;
  }
  throw new Error(`[${res.status}]网络请求失败`);
};
/**
 * Convert response to JSON, if response content type is application/json.
 * @param res response
 * @returns Parsed JSON or raw response
 */
const toResult = async (res: Response) => {
  if (res.headers.get("Content-Type")?.includes("application/json")) return await res.json();
  return res;
};

/**
 * Judge the response state and handle errors
 * @param res Response
 * @returns Response or throws error if code is not 2000
 */
const judgeOkState = async (res: Response) => {
  if (res.headers.get("Content-Type")?.includes("application/json")) {
    const cloneRes = await res.clone().json();
    // 如果返回的数据是json格式，并且code不为200，就返回json数据
    if (cloneRes.code && cloneRes.code !== 2000) {
      throw new Error(`[${cloneRes.code}]${cloneRes.msg}`);
    }
  }
  return res;
};
/**
 * Handle errors
 * @param error Error
 */
const handleError = (error: Error) => {
  useStore.setState({ globalErrorMsg: error.message });
};
class httpRequest {
  /**
   * Static fetch request method
   * @param url URL
   * @param options Request options
   * @param loading Whether to show loading
   * @returns Response data or error
   */
  static async staticFetch(url = "", options: any = {}, loading: boolean) {
    const defaultOptions = {
      // credentials: "include",
      mode: "cors",
      headers: {
        token: null,
        Authorization: null,
        // "Content-Type": "application/json; charset=utf-8",
      },
    };
    const newOptions = { ...defaultOptions, ...options };
    try {
      if (loading) {
        setTimeout(() => {
          useStore.setState({ httpLoading: true });
        });
      }

      // await new Promise((resolve) => setTimeout(resolve, 500));
      return fetch(url, newOptions).then(checkStatus).then(judgeOkState).then(toResult).catch(handleError);
    } catch (error) {
      handleError(error as Error);
      return { code: -1, data: false };
    } finally {
      if (loading) {
        setTimeout(() => {
          useStore.setState({ httpLoading: false });
        });
      }
    }
  }

  /**
   * GET request method
   * @param url URL
   * @param loading Whether to show loading
   * @returns Response data
   */
  get(url: string, loading: boolean = true) {
    return httpRequest.staticFetch(url, { method: "GET" }, loading);
  }
  /**
   * PUT request method
   * @param url URL
   * @param params Request body
   * @param loading Whether to show loading
   * @returns Response data
   */
  put(url: string, params = {}, loading: boolean = true) {
    const options = Object.assign({ method: "PUT" });
    options.body = JSON.stringify(params);
    return httpRequest.staticFetch(url, options, loading);
  }
  /**
   * POST request method
   * @param url URL
   * @param form Request body
   * @param loading Whether to show loading
   * @returns Response data
   */
  post(url: string, form = {}, loading: boolean = true) {
    const options = Object.assign({ method: "POST" });
    options.body = JSON.stringify(form);
    return httpRequest.staticFetch(url, options, loading);
  }
  /**
   * DELETE request method
   */
  del(url: string, data = {}, loading: boolean = true) {
    const options = Object.assign({ method: "DELETE" });
    options.body = JSON.stringify(data);
    return httpRequest.staticFetch(url, options, loading);
  }
  /**
   * POST request for file upload
   * @param url URL
   * @param formData FormData object
   * @param loading Whether to show loading
   * @returns Response data
   */
  upload(url: string, formData: FormData, loading: boolean = true) {
    const options = Object.assign({ method: "POST" });
    options.body = formData;

    return httpRequest.staticFetch(url, options, loading);
  }
}

const http = new httpRequest();
export const { get, post, put, del, upload } = http;
export default httpRequest;
