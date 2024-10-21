import ProgressBar from "@/components/admin/ProgressBar";
import Unuse from "@/components/hd/unuse";
import { BsFillNvmeFill } from "react-icons/bs";
import { TfiHarddrive } from "react-icons/tfi";

function Page() {
  const hd = [
    { brand: "Lexar SSD NM790 1TB", sn: "NHN656W102156P2202", size: "7.5G" },
    { brand: "Micron", sn: "CT2000X9PROSSD9", size: "1.8T" },
    { brand: "USB DISK 2.0", sn: "9000889E8A993974", size: "953.9G" },
    { brand: "Lexar SSD ARES 4TB", sn: "PCQ210R000002P2202", size: "3.7T" },
    { brand: "Lexar", sn: "kjladjskldffdsalj", size: "7.5G" },
  ];

  const storage = [
    {
      name: "SK Hynix Platinum P41",
      used: "100GB / 500GB",
      capital: "100T",
      progress: 1,
      type: "HDD",
      redundancy: "无",
    },
    {
      name: "Ugreen M.2 NVMe",
      used: "100GB / 75GB",
      progress: 20,
      capital: "12T",
      type: "NVME",
      redundancy: "无",
    },
    {
      name: "M.2 NVMe Key M extension ",
      used: "100GB / 75GB",
      progress: 50,
      capital: "10T",
      type: "NVME",
      redundancy: "无",
    },
  ];
  return (
    <div>
      <div className="mt-5 p-5">
        <h1>Unallocated Disks</h1>
        <div className="flex flex-wrap justify-start">
          {hd.map((item, index) => (
            <div className="w-1/3 pb-2 pr-4 pt-5" key={index}>
              <Unuse item={item} />
            </div>
          ))}
        </div>
        <h1 className="mb-5 mt-20">In use Disks</h1>
        <table className="w-full" align="center">
          <thead>
            <tr className="bg-neutral-50 text-center text-sm text-neutral-500">
              <th className="py-2 pl-5 text-left font-normal">Name</th>
              <th className="py-2 font-normal">Capacity</th>
              <th className="py-2 font-normal">Temperature</th>
              <th className="py-2 font-normal">In / Out</th>
              <th className="w-28 py-2 font-normal">Health</th>
              <th className="py-2 font-normal">Used</th>
            </tr>
          </thead>
          <tbody>
            {storage.map((item, index) => (
              <tr key={index} className="border-t border-neutral-100 text-center text-sm text-neutral-800">
                <td valign="top" className="flex items-center gap-1 py-3 pl-5 text-left">
                  <div className="flex flex-row gap-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200">
                      {index === 0 ? <TfiHarddrive className="h-4 w-4 text-white" /> : <BsFillNvmeFill className="h-4 w-4 text-white" />}
                    </div>
                    <div className="ml-1 flex flex-col">
                      <div>{item.name}</div>
                      <div className="text-xs text-neutral-500">Koisdf902390023ksfsdf</div>
                    </div>
                  </div>
                </td>
                <td className="py-2">{item.capital}</td>
                <td className="py-2">56 °C</td>
                <td className="py-2">300 GB / 2.93 TB</td>
                <td className="py-2">100%</td>
                <td className="py-2">
                  <div className="flex flex-col items-start">
                    <ProgressBar value={item.progress} className="h-2" />
                    <div className="flex items-center gap-2 text-xs text-neutral-600">{item.progress} (10 GB)</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
