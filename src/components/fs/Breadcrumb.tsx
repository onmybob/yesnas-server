"use client";
/**
 * Breadcrumb navigation for the file manager module.
 *
 */

import { useStore } from "@/store";
import { useTranslations } from "next-intl";

export const Breadcrumb = () => {
  const t = useTranslations("Fs");
  const currentPathList = useStore((state) => state.fsCurrentPathList);
  const updateCurrentPathCut = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, currentPathList.length - 1));
    const newPathHistory = currentPathList.slice(0, newIndex + 1);

    useStore.setState({ fsCurrentPathList: newPathHistory });
  };
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => updateCurrentPathCut(0)}>{t("all")}</button>
      {currentPathList.map(
        (path, index) =>
          path !== "/" && (
            <div key={index} className="flex flex-row gap-1">
              <div className="text-gray-400">/</div>
              <span>
                <button onClick={() => updateCurrentPathCut(index)}>{path}</button>
              </span>
            </div>
          ),
      )}
    </div>
  );
};
