"use client";
import { useStore } from "@/store";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

/**
 * Displays the loading icon in the center of the screen when the loading state from Zustand is true.
 */
const Wrap = () => {
  const loading = useStore((state) => state.httpLoading);
  const message = useStore((state) => state.globalErrorMsg);

  useEffect(() => {
    if (message) {
      toast.error(message);
      setTimeout(() => {
        useStore.setState({ globalErrorMsg: "" });
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return useMemo(
    () => (
      <div>
        {loading ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    ),
    [loading, message],
  );
};

export default Wrap;
