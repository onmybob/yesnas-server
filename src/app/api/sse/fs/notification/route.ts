import { TransferAction, TransferStatus } from "@/common/enums";
import { TransferNotification } from "@/common/models/fs";
import db from "@/libs/sqlite3";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        const list: TransferNotification[] = db
          .prepare("SELECT * FROM transfer WHERE action = ? AND status = ?")
          .all(TransferAction[TransferAction.COPY], TransferStatus[TransferStatus.INIT]);

        controller.enqueue(`data: ${JSON.stringify(list)}\n\n`);
      };
      send();
      const intervalId = setInterval(send, 1000);
      req.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
}
