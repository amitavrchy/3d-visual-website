"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { hydrateAuth } from "@/features/auth/authSlice";
import { makeStore, type AppStore } from "@/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (typeof window !== "undefined") {
      storeRef.current.dispatch(hydrateAuth());
    }
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
