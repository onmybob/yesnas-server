"use client";

import { links, subLinks } from "@/common/menu";
import { useStore } from "@/store";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NavLink from "../ui/nav-link";

export default function NavLinks() {
  const pathname = usePathname();
  const title = useStore((state) => state.navTitle);
  const t = useTranslations("Menu");

  const topMenus = links(t);
  const subMenus = subLinks(t);

  const handleLinkClick = (name: string) => {
    useStore.setState({ navTitle: name }); // Update Zustand state with the link name
  };

  useEffect(() => {
    // On component mount or when pathname changes, update Zustand title if it exists
    if (title === "") {
      let currentLink = topMenus.find((link) => link.href === pathname) || subMenus.flatMap((category) => category.children).find((subLink) => subLink.href === pathname);

      if (currentLink) {
        useStore.setState({ navTitle: currentLink.name }); // Update Zustand state with the link name
      }
    }
  }, [pathname, title]);

  return (
    <>
      <div>
        {/* Render main links */}
        {topMenus.map((link) => {
          return <NavLink pathname={pathname} key={link.name} href={link.href} icon={link.icon} name={link.name} onClick={() => handleLinkClick(link.name)} />;
        })}
      </div>

      {/* Render sublinks */}
      {subMenus.map((category, index) => (
        <div key={index}>
          <p className="mb-3 mt-5 pl-6 text-xs text-gray-950">{category.name}</p>
          {category.children.map((link, index2) => {
            return <NavLink pathname={pathname} key={index2} href={link.href} icon={link.icon} name={link.name} onClick={() => handleLinkClick(link.name)} />;
          })}
        </div>
      ))}
    </>
  );
}
