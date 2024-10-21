/**
 * Deprecated, replaced with API route
 */
import { ErrorResponse, SuccessResponse } from "@/types";

const SUCCESS_NUMBER = 10000;
const ERROR_NUMBER = 100001;

export class R {
  public static error(message: string): ErrorResponse {
    return {
      code: ERROR_NUMBER,
      message,
    };
  }

  public static success<T>(data: T, message?: string): SuccessResponse<T> {
    return {
      code: SUCCESS_NUMBER,
      message,
      data,
    };
  }
}
