import { Ok } from "@/app/api";
import { Dev } from "@/common/models/fs";
import db from "@/libs/pouchDB";

import { NextRequest } from "next/server";
const syspath = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// Batch delete files or directories
export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const devId = body[0].dev_id;
  const dev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(devId);
  body.forEach(async (item: any) => {
    const srcPath = syspath.join(dev.location, item.path);
    const command = `rm -rf "${srcPath}"`;
    await exec(command);
  });

  return Ok();
};
