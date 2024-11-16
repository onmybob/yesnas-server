import { Fail, Ok } from "@/app/api";
import { Dev, File } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { NextRequest } from "next/server";
import fs from "node:fs/promises";
const syspath = require("path");

/**
 * List files in a directory.
 */
export const GET = async (req: NextRequest, context: any) => {
  const query = context.params;
  const devId = query.dev_id;
  //0 all 1 directory
  const type = query.type;

  console.log("devId", devId);
  console.log("type", type);

  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  const data = [];
  const dpath = syspath.join(dev.location, query.file_path);
  try {
    const files = await fs.readdir(dpath, "utf8");
    for (const file of files) {
      const fullPath = syspath.join(dpath, file);
      const stats = await fs.stat(fullPath);
      const fileType = stats.isDirectory() ? "folder" : syspath.extname(file).toLowerCase().slice(1);

      const fileInfo: File = {
        filename: file,
        file_type: fileType,
        dev_name: query.dev_name,
        file_path: query.file_path,
        is_dir: stats.isDirectory(),
        modify_time: stats.mtime.toISOString(),
        size_bytes: stats.size,
      };
      data.push(fileInfo);
    }

    return Ok(data);
  } catch (err) {
    console.error(err);
    return Fail(err);
  }
};
