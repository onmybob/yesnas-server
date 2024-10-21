import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function PageContainer({ children, scrollable = false }: { children: React.ReactNode; scrollable?: boolean }) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100vh-11rem)]">
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      ) : (
        <div className="h-full p-4 md:px-8">{children}</div>
      )}
    </>
  );
}
