import { Dev } from "@/common/models/fs";
import db from "@/libs/pouchDB";
import { NextRequest } from "next/server";
import { Ok } from "..";

export const GET = async (req: NextRequest) => {
  const dev: Dev[] = db.prepare("SELECT * FROM dev  ").all();

  return Ok(dev);
};
