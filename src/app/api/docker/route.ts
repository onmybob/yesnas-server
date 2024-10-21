import { NextRequest, NextResponse } from "next/server";
const { networkInterfaces } = require("os");
const si = require("systeminformation");

export const GET = async (request: NextRequest) => {
  const os = require("os");

  const si = require("systeminformation");
  si.mem().then((data: any) => console.log(data));

  si.system().then((data: any) => console.log(data));
  si.bios().then((data: any) => console.log(data));
  si.baseboard().then((data: any) => console.log(data));
  si.cpuTemperature().then((data: any) => console.log(data));

  // promises style - new since version 3
  si.cpu()
    .then((data: { manufacturer: string; brand: string; speed: string; cores: string; physicalCores: string }) => {
      console.log("CPU Information:");
      console.log("- manufacturer: " + data.manufacturer);
      console.log("- brand: " + data.brand);
      console.log("- speed: " + data.speed);
      console.log("- cores: " + data.cores);
      console.log("- physical cores: " + data.physicalCores);

      console.log("...");
    })
    .catch((error: any) => console.error(error));

  console.log(os.hostname());

  // setInterval(function () {
  //   si.networkStats().then((data: any) => {
  //     console.log(data);
  //   });
  // }, 1000);

  return NextResponse.json({ name: "hello", sex: "男" });
};
