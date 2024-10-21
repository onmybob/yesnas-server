import ProgressBar from "@/components/admin//ProgressBar";
import Fn from "@/components/admin/Fn";
import GaugeChart from "@/components/admin/GaugeChart";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BiHdd } from "react-icons/bi";
import { BsGpuCard, BsMotherboard, BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowDown, FaArrowUp, FaMemory } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { GrServerCluster } from "react-icons/gr";
import { ImPower } from "react-icons/im";
import { IoMdTime } from "react-icons/io";
import { PiMarkdownLogo } from "react-icons/pi";
import System from "../../components/monitor/system";

function Page() {
  const t = useTranslations("Monitor");

  const chartData = [50, 30];
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const data = [
    ["2000-06-11", 73, getRandomNumber(50, 150)],
    ["2000-06-12", 68, getRandomNumber(50, 150)],
    ["2000-06-13", 92, getRandomNumber(50, 150)],
    ["2000-06-14", 130, getRandomNumber(50, 150)],
    ["2000-06-15", 245, getRandomNumber(50, 150)],
    ["2000-06-16", 139, getRandomNumber(50, 150)],
    ["2000-06-17", 115, getRandomNumber(50, 150)],
    ["2000-06-18", 111, getRandomNumber(50, 150)],
    ["2000-06-19", 309, getRandomNumber(50, 150)],
    ["2000-06-20", 206, getRandomNumber(50, 150)],
    ["2000-06-21", 137, getRandomNumber(50, 150)],
    ["2000-06-22", 128, getRandomNumber(50, 150)],
    ["2000-06-23", 85, getRandomNumber(50, 150)],
    ["2000-06-24", 94, getRandomNumber(50, 150)],
    ["2000-06-25", 71, getRandomNumber(50, 150)],
    ["2000-06-26", 106, getRandomNumber(50, 150)],
    ["2000-06-27", 84, getRandomNumber(50, 150)],
    ["2000-06-28", 93, getRandomNumber(50, 150)],
    ["2000-06-29", 85, getRandomNumber(50, 150)],
    ["2000-06-30", 73, getRandomNumber(50, 150)],
    ["2000-07-01", 83, getRandomNumber(50, 150)],
    ["2000-07-02", 125, getRandomNumber(50, 150)],
    ["2000-07-03", 107, getRandomNumber(50, 150)],
    ["2000-07-04", 82, getRandomNumber(50, 150)],
    ["2000-07-05", 44, getRandomNumber(50, 150)],
    ["2000-07-06", 72, getRandomNumber(50, 150)],
    ["2000-07-07", 106, getRandomNumber(50, 150)],
    ["2000-07-08", 107, getRandomNumber(50, 150)],
    ["2000-07-09", 66, getRandomNumber(50, 150)],
    ["2000-07-10", 91, getRandomNumber(50, 150)],
    ["2000-07-11", 92, getRandomNumber(50, 150)],
    ["2000-07-12", 113, getRandomNumber(50, 150)],
    ["2000-07-13", 107, getRandomNumber(50, 150)],
    ["2000-07-14", 131, getRandomNumber(50, 150)],
    ["2000-07-15", 111, getRandomNumber(50, 150)],
    ["2000-07-16", 64, getRandomNumber(50, 150)],
    ["2000-07-17", 69, getRandomNumber(50, 150)],
    ["2000-07-18", 88, getRandomNumber(50, 150)],
    ["2000-07-19", 77, getRandomNumber(50, 150)],
    ["2000-07-20", 83, getRandomNumber(50, 150)],
    ["2000-07-21", 111, getRandomNumber(50, 150)],
    ["2000-07-22", 57, getRandomNumber(50, 150)],
    ["2000-07-23", 55, getRandomNumber(50, 150)],
    ["2000-07-24", 60, getRandomNumber(50, 150)],
  ];

  const info = [
    { title: t("host_name"), value: "Yes", icon: GrServerCluster },
    { title: t("soft_ver"), value: "V 1.1", icon: PiMarkdownLogo },
    { title: t("cpu"), value: "Intel N100", icon: FiCpu },
    { title: t("gpu"), value: "NVIDIA GeForce GTX 1050Ti", icon: BsGpuCard },
    {
      title: t("board"),
      value: "Gigabyte Technology Co, Ltd. B85-HD3",
      icon: BsMotherboard,
    },
    { title: t("boot"), value: "Kingston M2.NVME 1T", icon: BiHdd },
    { title: t("mem"), value: "Kingston PC3-14200", icon: FaMemory },
    { title: t("uptime"), value: "30 days", icon: IoMdTime },
  ];

  const storage = [
    {
      name: "Test",
      used: "100GB / 500GB",
      progress: 0,
      redundancy: "无",
    },
    {
      name: "Test1",
      used: "100GB / 75GB",
      progress: 20,
      redundancy: "无",
    },
    {
      name: "Test2",
      used: "100GB / 75GB",
      progress: 50,
      redundancy: "无",
    },
  ];

  const docker = [
    {
      name: "Tomcat",
      status: t("docker_running_tip", { time: "2" }),
      logo: "https://djeqr6to3dedg.cloudfront.net/repo-logos/library/tomcat/live/logo-1720462300603.png",
    },
    {
      name: "postgres",
      status: t("docker_running_tip", { time: "4" }),
      logo: "https://djeqr6to3dedg.cloudfront.net/repo-logos/library/postgres/live/logo-1720462257907.png",
    },
  ];

  return (
    <div>
      <div className="flex flex-row border-b border-neutral-200 pl-6">
        <div className="w-2/6 border-r border-neutral-200 pb-5">
          <h4 className="flex flex-row items-center gap-1 py-5">{t("server")}</h4>
          <System data={info} />
        </div>
        <div className="w-4/6 pr-6">
          <h4 className="flex flex-row items-center justify-between gap-1 py-5 pl-6">
            <div className="flex flex-row gap-1">
              {t("network_speed")} <p className="text-sm text-neutral-600">(bit/s)</p>
            </div>
            <div className="flex flex-row gap-4 text-xs">
              <p className="flex flex-row items-center gap-1 text-neutral-600">
                <FaArrowUp />
                10MB/s
              </p>
              <p className="flex flex-row items-center gap-1 text-neutral-600">
                <FaArrowDown />
                110MB/s
              </p>
            </div>
          </h4>
          <Fn />
        </div>
      </div>

      <div className="flex flex-row border-b border-neutral-200 pl-6">
        <div className="w-2/6 border-r border-neutral-200 pb-5">
          <h4 className="flex flex-row items-center gap-1 py-5">{t("load")}</h4>

          <div className="mr-6 flex flex-row items-end justify-between gap-2">
            <GaugeChart value={0} height="100px" width="100px" name={t("cpu")} />
            <div>
              <GaugeChart value={30} height="100px" width="100px" name={t("mem")} />
            </div>
            <div>
              <GaugeChart value={30} height="100px" width="100px" name={t("gpu")} />

              {/* <ProgressBar value={100} /> */}
            </div>
          </div>
          <div className="mr-10 mt-3 flex flex-row items-center justify-end gap-1 text-right text-xs text-neutral-500">
            <ImPower className="text-red-600" />
            {t("power_consumption")} ≈ 10W
          </div>
        </div>
        <div className="w-4/6 pb-5">
          <h4 className="flex flex-row items-center gap-1 py-5 pl-6">{t("data_pool")}</h4>

          <div className="mx-5">
            <table className="w-full" align="center">
              <thead>
                <tr className="bg-neutral-100 text-center text-sm text-neutral-500">
                  <th className="py-2 pl-5 text-left font-normal">{t("name")}</th>
                  <th className="py-2 font-normal">
                    {t("used")} / {t("capacity")}
                  </th>
                  <th className="py-2 text-left font-normal">{t("capacity")}</th>
                  <th className="w-28 py-2 font-normal">{t("backup")}</th>
                </tr>
              </thead>
              <tbody>
                {storage.map((item, index) => (
                  <tr key={index} className="text-center text-sm text-neutral-800">
                    <td className="py-2 pl-5 text-left">{item.name}</td>
                    <td className="py-2">{item.used}</td>
                    <td className="flex items-center gap-1 py-2 text-left">
                      <ProgressBar value={item.progress} />
                      <div className="w-3 text-xs text-neutral-600">{item.progress}</div>
                    </td>
                    <td className="py-2">{item.redundancy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="pl-6">
        <h4 className="gap-1 py-5">{t("docker_name")}</h4>

        <div className="mb-6 flex w-40 items-center">
          <button className="flex-1 rounded-l-sm bg-gray-200 px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 focus:outline-none">{t("all")}</button>

          <button className="flex-1 rounded-r-sm bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700 focus:outline-none">{t("running")}</button>
        </div>

        <div className="flex flex-row flex-wrap gap-3">
          {docker.map((item, index) => (
            <div key={index} className="flex flex-row gap-2">
              <div className="flex w-60 flex-col gap-3 rounded-sm border border-neutral-100">
                <div className="flex w-full flex-row justify-between p-3">
                  <div className="flex flex-row gap-2">
                    <div className="w-10">
                      <Image src={item.logo} width={50} height={50} className="flex items-center text-center" alt="Picture of the author" />
                    </div>

                    <div className="text-sm">
                      <div>{item.name}</div>
                      <div className="text-xs text-neutral-600">{item.status}</div>
                    </div>
                  </div>
                  <div>
                    <BsThreeDotsVertical className="text-neutral-500" />
                  </div>
                </div>

                <div className="mb-4 ml-3 mr-3 flex flex-row gap-2 text-sm">
                  <button className="w-1/2 rounded-sm border border-neutral-100 bg-neutral-50 px-2 py-1 text-neutral-500">{t("view_logs")}</button>
                  <button className="w-1/2 rounded-sm border border-neutral-100 bg-neutral-50 px-2 py-1 text-neutral-700">{t("web")}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
