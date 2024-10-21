import { Fail, Ok } from "@/app/api";
import { Dev, File } from "@/common/models/fs";
import db from "@/libs/pouchDB";
import { NextRequest } from "next/server";
import fs from "node:fs/promises";
const syspath = require("path");

/**
 * List files in a directory.
 */
export const GET = async (req: NextRequest, context: any) => {
  const query = context.params;
  const devId = query.dev_id;
  console.log("devId", devId);

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

/**
 * Create a new directory.
 */
export const POST = async (req: NextRequest, context: any) => {
  const data = await req.json();

  const query = context.params;
  const filePath = query.file_path;
  const devId = query.dev_id;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  const dpath = syspath.join(dev.location, filePath);

  console.log(query);
  try {
    if (data.type === 1) {
      await fs.mkdir(dpath);
    } else {
      await fs.writeFile(dpath, "");
    }

    return Ok();
  } catch (err) {
    console.error(err);
    return Fail(err);
  }
};
