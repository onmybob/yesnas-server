"use client";

import { useEffect, useState } from "react";

interface Message {
  timestamp: number;
  message: string;
}

function Page() {
  const [messages, setMessages] = useState<Message[]>([]); // 明确类型为 Message[]

  useEffect(() => {
    const eventSource = new EventSource("/api/sse/fs/copymove?data=" + JSON.stringify({ name: "text" }));

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    // 清理函数
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <div>
        <h1>SSE Messages</h1>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              {msg.timestamp}: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
