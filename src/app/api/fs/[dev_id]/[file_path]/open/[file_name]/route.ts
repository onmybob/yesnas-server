import { Fail, Ok } from "@/app/api";
import { Dev } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { NextRequest } from "next/server";
import fs from "node:fs/promises";
const syspath = require("path");

/**
 * Renames a file or directory.
 */
export const PUT = async (_: NextRequest, context: any) => {
  const query = context.params;
  const devId = query.dev_id;
  const filePath = query.file_path;
  const fileName = query.file_name;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  const srcPath = syspath.join(dev.location, filePath);
  const destPath = syspath.join(syspath.resolve(srcPath, ".."), fileName);

  try {
    await fs.rename(srcPath, destPath);
    return Ok();
  } catch (err) {
    console.error(err);
    return Fail(err);
  }
};

export const GET = async (_: NextRequest, context: any) => {
  const query = context.params;
  const devId = query.dev_id;

  const filePath = query.file_path;
  const fileName = query.file_name;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  const srcPath = syspath.join(dev.location, syspath.join(filePath, fileName));

  try {
    const fileBuffer = await fs.readFile(srcPath);
    return Ok({ data: fileBuffer.toString("base64") });
  } catch (error) {
    return Fail(error);
  }
};
