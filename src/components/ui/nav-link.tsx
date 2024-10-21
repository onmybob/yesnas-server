import clsx from "clsx";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface Props {
  icon?: any;
  pathname?: string;
  href: string;
  name: string;
  onClick?: MouseEventHandler;
}

{
  /* <Link
href={href}
passHref
className={clsx("flex h-9 items-center justify-center gap-2 rounded-md text-sm md:flex-none md:justify-start md:p-2 md:px-1", {
  "bg-gray-200 text-gray-950": pathname === href,
  "text-gray-500 hover:text-gray-950": pathname !== href,
})}
onClick={onClick}
>
<LinkIcon className="w-6" />
<p className="hidden md:block">{name}</p>
</Link> */
}

const NavLink = ({ href, pathname, icon, name, onClick }: Props) => {
  const LinkIcon = icon;

  return (
    <Link
      href={href}
      passHref
      className={clsx("flex h-9 items-center justify-between gap-2 pl-6 text-sm", {
        "bg-gray-100 text-gray-950": pathname === href,
        "text-gray-600 hover:bg-gray-100 hover:text-gray-950": pathname !== href,
      })}
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2 text-center">
        <LinkIcon className="w-6" />
        <p className="hidden md:block">{name}</p>
      </div>

      <div className={clsx("h-full w-1 rounded-l-lg bg-black", { hidden: pathname !== href })}></div>
    </Link>
  );
};

export default NavLink;
