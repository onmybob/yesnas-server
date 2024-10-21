/**
 * Deprecated, replaced with API route
 */

"use client";

import type { ErrorResponse, SuccessResponse } from "@/types";
import { useCallback, useState } from "react";

type ErrorResult = {
  error: true;
  message: string;
  data?: null;
};

type SuccessResult<T> = {
  error: false;
  message?: string;
  data: T;
};

export default function useAction<T extends (...args: any) => Promise<ErrorResponse | SuccessResponse<unknown>>>(handler: T) {
  const [data, setData] = useState<Awaited<ReturnType<T>>["data"] | undefined>();
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const controller = new AbortController();
  const { signal } = controller;

  const action = useCallback(
    async (...args: Parameters<T>): Promise<ErrorResult | SuccessResult<Awaited<ReturnType<T>>["data"]>> => {
      try {
        setLoading(true);
        setError(false);
        setData(void 0);
        setMessage(void 0);

        const data = await handler(...args);
        console.log("===");

        // console.log("data", data);
        setMessage(data.message);
        setData(data.data);

        if (data.code === 10000) {
          setError(false);
          return {
            data: data.data,
            error: false,
            message: data.message,
          };
        } else {
          setError(true);
          return {
            error: true,
            message: data.message,
          };
        }
      } catch (error: any) {
        console.log(error.message);
        setMessage(error?.message);
        setError(true);
        return {
          error: true,
          message: "Error: " + error.message,
        };
      } finally {
        setLoading(false);
      }
    },
    [handler],
  );

  return {
    data,
    error,
    message,
    run: action,
    loading,
  };
}
