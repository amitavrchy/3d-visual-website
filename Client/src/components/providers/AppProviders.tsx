"use client";

import { QueryProvider } from "./QueryProvider";
import { StoreProvider } from "./StoreProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>{children}</QueryProvider>
    </StoreProvider>
  );
}
