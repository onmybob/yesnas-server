import Image from "next/image";
import Link from "next/link";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="border-gary-100 mb-5 h-16 border-b">
        <Link className="flex flex-col items-center justify-start p-4 pr-8 text-center" href="/">
          <Image src="/logo.png" width={130} height={0} priority alt="Yes NAS" className="flex items-center text-center" />
        </Link>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
