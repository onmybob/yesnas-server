import { Dev } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { NextRequest } from "next/server";
const syspath = require("path");
const { spawn } = require("child_process");

export async function GET(req: NextRequest) {
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const url = req.nextUrl;
  const params = url.searchParams.get("data") as string;

  try {
    const data = JSON.parse(params);
    const srcDevId = data.src_dev_id;
    const destDevId = data.dest_dev_id;
    const destPath = data.dest_path;
    const paths = data.paths;
    const srcDev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(srcDevId);
    const destDev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(destDevId);
    const targetPath = syspath.join(destDev.location, destPath);
    const stream = new ReadableStream({
      start(controller) {
        paths.forEach(async (item: any) => {
          const srcPath = syspath.join(srcDev.location, item);
          const rsync = spawn("rsync", ["-a", "--delete", "--progress", srcPath, targetPath]);

          rsync.stdout.on("data", (data: any) => {
            const lines = data.toString().split("\n");
            lines.forEach((line: any) => {
              const match = line.match(/(\d+)%/);
              if (match) {
                const percent = parseInt(match[1], 10);
                const progressData = JSON.stringify({ item: item, progress: percent });
                controller.enqueue(`data: ${progressData}\n\n`);
              }
            });
          });

          rsync.stderr.on("data", (errorData: any) => {
            console.error(`Error: ${errorData}`);
          });

          rsync.on("close", (code: any) => {
            console.log(`rsync process exited with code ${code}`);
          });
        });
      },
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.log(error);
    return new Response("Error processing request", { status: 500 });
  }
}
