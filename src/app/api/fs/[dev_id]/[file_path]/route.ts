import { Fail, Ok } from "@/app/api";
import { Dev } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { NextRequest } from "next/server";
import fs from "node:fs/promises";
const syspath = require("path");

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
