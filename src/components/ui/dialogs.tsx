"use client";

import { cn } from "@/libs/utils";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  title?: string;
  confirmBtn?: string;
  cancelBtn?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  icon?: any;
  noClass?: boolean;
}

export default function Dialogs({ icon, open, onClose, title, confirmBtn, cancelBtn, onCancel, onConfirm, children, noClass }: Props) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(open);
  }, [open]);
  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} className="tool-bar relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className={cn("bg-white", !noClass ? "px-4 pb-4 pt-5 sm:p-6 sm:pb-4" : "")}>
              <div className="sm:flex sm:items-start">
                {icon && (
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {React.cloneElement(icon, { "aria-hidden": "true", className: "h-6 w-6 text-red-600" })}
                  </div>
                )}
                <div className={cn("mt-3 text-center sm:mt-0 sm:text-left", icon ? "sm:ml-4" : "")}>
                  {title && (
                    <DialogTitle as="h3" className="mb-2 text-base font-semibold leading-6 text-gray-900">
                      {title}
                    </DialogTitle>
                  )}
                  {children}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 bg-gray-50 px-6 py-3">
              {confirmBtn && (
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex w-full justify-center rounded-sm bg-gray-950 px-3 py-2 text-sm text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                >
                  {confirmBtn ? confirmBtn : "确认"}
                </button>
              )}
              <button
                type="button"
                onClick={onCancel ? onCancel : handleClose}
                className="mt-3 inline-flex w-full justify-center rounded-sm bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {cancelBtn ? cancelBtn : "取消"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
