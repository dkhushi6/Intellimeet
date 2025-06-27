// app/providers.tsx
"use client";

import SessionWrapper from "../SessionWrapper/page";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionWrapper>{children}</SessionWrapper>;
}
