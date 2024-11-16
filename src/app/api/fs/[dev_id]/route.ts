import { Ok } from "@/app/api";
import { TransferAction, TransferStatus } from "@/common/enums";
import { Dev } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { getNanoid } from "@/libs/utils";
const { spawn } = require("child_process");

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
    await exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  });

  return Ok();
};
export const POST = async (req: NextRequest, context: any) => {
  const body = await req.json();

  console.log(body);

  const srcDevId = context.params.dev_id;
  const destDevId = body.dest_dev_id;
  const destPath = body.dest_path;

  const srcDev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(srcDevId);
  const destDev: Dev = db.prepare("SELECT * FROM dev where id = ?").get(destDevId);

  const targetPath = syspath.join(destDev.location, destPath);

  body.paths.forEach(async (item: any) => {
    const srcPath = syspath.join(srcDev.location, item.path);
    db.prepare(
      "INSERT INTO transfer (id, src_dev_id,is_dir,action,src_dir,dest_dir,progress,status,create_time) VALUES (@id,@src_dev_id,@is_dir, @action, @src_dir, @dest_dir, @progress, @status, @create_time)",
    ).run({
      id: getNanoid(),
      src_dev_id: srcDevId,
      is_dir: item.is_dir ? 1 : 0,
      action: TransferAction[TransferAction.COPY],
      src_dir: srcPath,
      dest_dir: targetPath,
      progress: 0,
      status: TransferStatus[TransferStatus.INIT],
      create_time: new Date().toISOString(),
    });
  });
  return Ok();
};
