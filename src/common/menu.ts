import { BsHddRack } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GrUpdate, GrVirtualMachine } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import { IoLogoDocker } from "react-icons/io5";
import { LuDatabase } from "react-icons/lu";
import { MdOutlineLanguage } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCloudNetwork, TbLogs } from "react-icons/tb";
import { TfiFiles } from "react-icons/tfi";
import { VscTerminalPowershell } from "react-icons/vsc";

export const links = (t: any) => {
  return [
    { name: t("monitor"), href: "/admin", icon: RxDashboard },
    { name: t("vm"), href: "#", icon: GrVirtualMachine },
    { name: t("docker"), href: "#", icon: IoLogoDocker },
  ];
};

export const subLinks = (t: any) => {
  return [
    {
      name: t("data_center"),
      children: [
        { name: t("data_pool"), href: "/admin/storage", icon: LuDatabase },
        { name: t("hard_drive"), href: "/admin/hd", icon: BsHddRack },
        { name: t("fs"), href: "/admin/file", icon: TfiFiles },
      ],
    },
    {
      name: t("admin"),
      children: [
        {
          name: t("user"),
          href: "#",
          icon: FaRegUser,
        },
        {
          name: t("service"),
          href: "#",
          icon: TbCloudNetwork,
        },
        { name: t("logs"), href: "/dashboard/customers", icon: TbLogs },
        {
          name: t("network"),
          href: "#",
          icon: IoIosSettings,
        },
        {
          name: t("time"),
          href: "#",
          icon: MdOutlineLanguage,
        },
        {
          name: t("shell"),
          href: "#",
          icon: VscTerminalPowershell,
        },
        { name: t("update"), href: "#", icon: GrUpdate },
      ],
    },
  ];
};
