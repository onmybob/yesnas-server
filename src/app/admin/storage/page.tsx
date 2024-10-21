import ProgressBar from "@/components/admin/ProgressBar";
import Side from "@/components/storage/side";
import { BsFillNvmeFill } from "react-icons/bs";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import { TfiHarddrive } from "react-icons/tfi";

const pools = [
  {
    title: "Data Pool",
    items: [
      { name: "Test", capital: "1T", size: 2 },
      { name: "Test1", capital: "3T", size: 12 },
      { name: "Test2", capital: "23T", size: 3 },
    ],
  },
  {
    title: "Backup",
    items: [{ name: "Backup1", capital: "1T", size: 2 }],
  },
  {
    title: "Cached",
    items: [
      // Add cache items if needed
    ],
  },
];

const storage = [
  {
    name: "SK Hynix Platinum P41",
    used: "100GB / 500GB",
    capital: "100T",
    progress: 1,
    type: "HDD",
    redundancy: "NONE",
  },
  {
    name: "Ugreen M.2 NVMe",
    used: "100GB / 75GB",
    progress: 20,
    capital: "12T",
    type: "NVME",
    redundancy: "NONE",
  },
  {
    name: "M.2 NVMe Key M extension ",
    used: "100GB / 75GB",
    progress: 50,
    capital: "10T",
    type: "NVME",
    redundancy: "NONE",
  },
];

function Page() {
  return (
    <div className="flex flex-row">
      <div className="flex w-72 flex-col border-r border-neutral-100 pl-5 pr-5 md:flex-col md:overflow-hidden" style={{ height: "calc(100vh - 4rem)" }}>
        {pools.map((pool, index) => (
          <div key={index}>
            <p className="mb-2 mt-10 text-sm text-neutral-500">{pool.title}</p>

            {pool.items.length === 0 ? (
              <p className="ml-5 text-sm text-neutral-500">Empty</p>
            ) : (
              pool.items.map((item, idx) => <Side key={idx} name={item.name} capital={item.capital} size={item.size} />)
            )}
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col">
        <div className="border-neutral-150 flex h-48 w-full flex-col border-b bg-neutral-50 p-5">
          <div className="h-18 flex flex-row items-center justify-between">
            <h1>TEST</h1>
            <div className="rounded border border-neutral-600 px-3 py-1 font-semibold text-neutral-600">100.36 GB</div>
          </div>
          <div className="mt-4 text-neutral-500">
            <ProgressBar value={30} />
            <div className="mt-1 flex flex-row justify-between text-sm">
              <div>Used 30% (100 GB)</div>
            </div>
          </div>
          <div className="mt-7 flex flex-row gap-3">
            <button className="font-nomal flex flex-row items-center gap-1 rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
              <RiArrowDownDoubleLine />
              Backup (1)
            </button>
            <button className="font-nomal flex flex-row items-center gap-1 rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
              <RiArrowDownDoubleLine />
              Cached (0)
            </button>
            <button className="font-nomal rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
              Extend
            </button>
            <button className="font-nomal rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
              Remove
            </button>
            <button className="font-nomal rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
              Format
            </button>
          </div>
        </div>

        <div>
          <table className="w-full" align="center">
            <thead>
              <tr className="bg-neutral-50 text-center text-sm text-neutral-500">
                <th className="py-2 pl-5 text-left font-normal">Name</th>
                <th className="py-2 font-normal">Capacity</th>
                <th className="py-2 font-normal">SN</th>
                <th className="py-2 font-normal">Temperature</th>
                <th className="py-2 font-normal">Used</th>
                <th className="w-28 py-2 font-normal">Health</th>
                <th className="py-2 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {storage.map((item, index) => (
                <tr key={index} className="border-t border-neutral-100 text-center text-sm text-neutral-800">
                  <td valign="top" className="flex items-center gap-1 py-2 pl-5 text-left">
                    <div className="flex flex-row gap-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200">
                        {index === 0 ? <TfiHarddrive className="h-4 w-4 text-white" /> : <BsFillNvmeFill className="h-4 w-4 text-white" />}
                      </div>
                      <div className="ml-2 flex flex-col">
                        <div>{item.name}</div>
                        <div className="text-neutral-500">Koisdf902390023ksfsdf</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2">{item.capital}</td>
                  <td className="py-2">56 °C</td>
                  <td className="py-2">ABC-abc-123ABC-abc-12344</td>
                  <td className="py-2">
                    <div className="flex flex-col items-start">
                      <ProgressBar value={item.progress} className="h-2" />
                      <div className="flex items-center gap-2 text-xs text-neutral-600">{item.progress} (10 GB)</div>
                    </div>
                  </td>
                  <td className="text-bar py-2">100%</td>
                  <td className="text-bar py-2">
                    <button className="font-nomal rounded-sm border border-neutral-300 bg-transparent bg-white px-4 py-1 text-sm text-neutral-700 hover:border-transparent hover:bg-neutral-500 hover:text-white">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
