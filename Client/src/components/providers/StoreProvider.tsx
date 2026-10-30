"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { hydrateAuth } from "@/features/auth/authSlice";
import { makeStore, type AppStore } from "@/store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const next = makeStore();
    next.dispatch(hydrateAuth());
    setStore(next);
  }, []);

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050508] text-[14px] text-[#9AA3B5]">
        Booting studio…
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}
