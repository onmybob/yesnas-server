/**
 * Defines the structure of JSON responses for fetch requests.
 * All JSON responses should be returned using the `OK` or `Fail` functions below.
 */

import { NextResponse } from "next/server";

enum RC {
  SUCCESS = 2000,
  UNKNOWN = 3000,
}

interface IResponse<T = any> {
  code: RC;
  msg?: any;
  time: string;
  data?: T;
}

/**
 * Creates a success JSON response.
 * @param data - The data to be included in the response.
 * @param code - The response code, defaulting to RC.SUCCESS.
 * @returns A NextResponse object with a JSON body containing the success response.
 */
export const Ok = (data?: any, code: RC = RC.SUCCESS) => {
  const result: IResponse = {
    code,
    msg: "Success",
    time: new Date().toISOString(),
    data: data,
  };

  return NextResponse.json(result);
};

/**
 * Creates a failure JSON response.
 * @param msg - The error message to be included in the response.
 * @param data - Additional data to be included in the response (optional).
 * @param code - The response code, defaulting to RC.UNKNOWN.
 * @returns A NextResponse object with a JSON body containing the failure response.
 */
export const Fail = (msg: any, data?: any, code: RC = RC.UNKNOWN) => {
  const result: IResponse = {
    code,
    msg,
    time: new Date().toISOString(),
    data: data,
  };

  return NextResponse.json(result);
};
