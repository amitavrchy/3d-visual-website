"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api, login } from "@/lib/api";
import { setCredentials, logout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type WorldNoteAdmin = {
  id: string;
  author: string;
  message: string;
  approved: boolean;
  createdAt: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const qc = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({ defaultValues: { email: "", password: "" } });

  const notesQuery = useQuery({
    queryKey: ["admin-notes"],
    enabled: Boolean(auth.token),
    queryFn: async () => {
      const { data } = await api.get<WorldNoteAdmin[]>("/world-notes/admin/all");
      return data;
    },
  });

  const contactsQuery = useQuery({
    queryKey: ["admin-contacts"],
    enabled: Boolean(auth.token),
    queryFn: async () => {
      const { data } = await api.get<ContactRow[]>("/contact");
      return data;
    },
  });

  const approve = useMutation({
    mutationFn: (id: string) => api.patch(`/world-notes/${id}/approve`),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["admin-notes"] });
      void qc.invalidateQueries({ queryKey: ["world-notes"] });
    },
  });

  if (!auth.token) {
    return (
      <section className="mx-auto max-w-md px-6 pb-24 pt-28">
        <h1 className="display-font text-[36px] font-semibold">Admin</h1>
        <p className="mt-2 text-[15px] text-[#9AA3B5]">
          Sign in to moderate world notes and view contact messages.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={form.handleSubmit(async (values) => {
            try {
              setError(null);
              const data = await login(values.email, values.password);
              dispatch(
                setCredentials({ token: data.accessToken, user: data.user }),
              );
            } catch {
              setError("Login failed — check credentials and API.");
            }
          })}
        >
          <label className="block text-[14px] text-[#9AA3B5]">
            Email
            <input
              className="mt-1 w-full rounded border border-[#22263A] bg-[#0F1118] px-3 py-2.5 text-[15px]"
              {...form.register("email")}
            />
          </label>
          <label className="block text-[14px] text-[#9AA3B5]">
            Password
            <input
              type="password"
              className="mt-1 w-full rounded border border-[#22263A] bg-[#0F1118] px-3 py-2.5 text-[15px]"
              {...form.register("password")}
            />
          </label>
          <button
            type="submit"
            className="rounded bg-[#4AF2C8] px-4 py-2.5 text-[15px] font-semibold text-[#050508]"
          >
            Sign in
          </button>
          {error ? <p className="text-[14px] text-[#FF5C7A]">{error}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="display-font text-[36px] font-semibold">CMS</h1>
          <p className="text-[15px] text-[#9AA3B5]">
            Signed in as {auth.user?.email}
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(logout())}
          className="rounded border border-[#22263A] px-3 py-2 text-[14px]"
        >
          Log out
        </button>
      </div>

      <h2 className="mono-label mt-12 text-[14px] text-[#4AF2C8]">
        World notes
      </h2>
      <ul className="mt-4 space-y-3">
        {(notesQuery.data ?? []).map((note) => (
          <li
            key={note.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded border border-[#22263A] bg-[#0F1118] p-4"
          >
            <div>
              <p className="text-[15px] font-medium">
                {note.author}{" "}
                <span className="text-[#9AA3B5]">
                  {note.approved ? "· approved" : "· pending"}
                </span>
              </p>
              <p className="mt-1 text-[14px] text-[#9AA3B5]">{note.message}</p>
            </div>
            {!note.approved ? (
              <button
                type="button"
                onClick={() => approve.mutate(note.id)}
                className="rounded bg-[#4AF2C8] px-3 py-2 text-[14px] font-semibold text-[#050508]"
              >
                Approve
              </button>
            ) : null}
          </li>
        ))}
      </ul>

      <h2 className="mono-label mt-12 text-[14px] text-[#6B8CFF]">
        Contact inbox
      </h2>
      <ul className="mt-4 space-y-3">
        {(contactsQuery.data ?? []).map((row) => (
          <li
            key={row.id}
            className="rounded border border-[#22263A] bg-[#0F1118] p-4"
          >
            <p className="text-[15px] font-medium">
              {row.name} · {row.email}
            </p>
            {row.company ? (
              <p className="text-[14px] text-[#9AA3B5]">{row.company}</p>
            ) : null}
            <p className="mt-2 text-[15px]">{row.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
