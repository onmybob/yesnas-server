"use client";

import { AddButton, Breadcrumb, ListButton, RefreshButton, SortRMenu } from "@/components/fs";
import SideNav from "@/components/layout/sidenav";
import { useStore } from "@/store";
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { startTransition, useEffect, useRef, useState } from "react";

import { languageMap, Locale } from "@/i18n/config";
import { cn } from "@/libs/utils";
import { getUserLocale, setUserLocale } from "@/service/local";
import { MdKeyboardArrowDown, MdLanguage } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Wrap from "./wrap";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const navTitle = useStore((state) => state.navTitle);
  const showTitle = pathname === "/admin/file";
  const showLanguage = pathname === "/admin";
  const [lang, setLang] = useState<string>();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);

  const switchLanguage = (lang: string) => {
    const locale = lang as Locale;
    startTransition(() => {
      setUserLocale(locale);
      setLang(lang);
    });
  };

  useEffect(() => {
    const fetchLocale = async () => {
      const locale = await getUserLocale();
      setLang(locale);
    };
    fetchLocale();
  }, [lang]);
  return (
    <>
      <Wrap />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full flex-none border-r border-gray-200 md:w-56">
          <SideNav />
        </div>
        <div className="flex-grow">
          <div className="border-gary-100 flex h-16 items-center justify-between border-b px-5 text-center">
            <div className="flex items-center gap-2">
              <RxDashboard />
              {showTitle ? <Breadcrumb /> : navTitle}
            </div>
            <div className="flex items-center gap-1 text-sm">
              {showTitle && (
                <>
                  <SortRMenu />
                  <RefreshButton />
                  <ListButton />
                  <AddButton />
                </>
              )}
              {showLanguage && (
                <div>
                  <button className="group relative flex flex-row items-center gap-1" ref={ref} {...anchorProps}>
                    <MdLanguage className="h-5 w-5" /> {languageMap[lang as Locale]}
                    <MdKeyboardArrowDown className={cn("h-5 w-5")} />
                  </button>
                  <ControlledMenu {...hoverProps} state={isOpen ? "open" : "closed"} anchorRef={ref} onClose={() => setOpen(false)}>
                    {Object.keys(languageMap).map((key) => (
                      <MenuItem key={key} onClick={() => switchLanguage(key)}>
                        <div className={cn("mr-2 h-2 w-2 rounded-full bg-gray-300", lang === key ? "bg-gray-950" : "")}></div>
                        {languageMap[key as Locale]}
                      </MenuItem>
                    ))}
                  </ControlledMenu>
                </div>
              )}
            </div>
          </div>

          <div>
            <NextTopLoader showSpinner={false} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
