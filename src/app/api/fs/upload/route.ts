import { Dev } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import { Fail, Ok } from "../..";
const syspath = require("path");

// 上传文件或者文件夹
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  console.log("上传文件或者文件夹");

  const fields = formData.getAll("field");
  if (!Array.isArray(fields) || fields.length === 0) {
    return Fail("上传的文件无效");
  }
  const file_path = formData.get("file_path") as string;
  const devId = formData.get("dev_id") as string;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);

  for (const field of fields) {
    if (!(field instanceof File)) {
      return Fail("上传的文件无效");
    }
    const fileName = field.name;
    const savePath = syspath.join(syspath.join(dev.location, file_path), fileName);
    try {
      const dirPath = syspath.dirname(savePath);
      await mkdir(dirPath, { recursive: true });

      const arrayBuffer = await field.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uint8Array = new Uint8Array(buffer);

      await writeFile(savePath, uint8Array);
      return Ok();
    } catch (error) {
      console.error(error);
      return Fail(error);
    }
  }
};
