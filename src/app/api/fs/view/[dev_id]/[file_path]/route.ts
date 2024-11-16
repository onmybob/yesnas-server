import { Dev } from "@/common/models/fs";
import { compressImage } from "@/libs/serverUtils";
import db from "@/libs/sqlite3";
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "path";
const mime = require("mime-types");

/**
 * Requests to serve files, with optional image compression.
 * @param _: Unused request parameter.
 * @param context `dev_name` and `file_path`
 * @returns Buffer
 */
export const GET = async (_: NextRequest, context: any) => {
  const query = context.params;
  const file_path = query.file_path as string;
  const devId = query.dev_id;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  const fullPath = path.join(dev.location!, file_path);
  const filename = path.basename(fullPath);
  const ext = path.extname(fullPath).toLowerCase().slice(1);

  let fileContents = await fs.readFile(fullPath);
  const contentType = mime.lookup(ext) || "application/octet-stream";
  if (contentType.includes("image")) {
    fileContents = await compressImage(fileContents, 300);
  }
  const encodedFilename = encodeURIComponent(filename);

  const headers = {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`,
  };

  return new NextResponse(fileContents, {
    headers,
  });
};
