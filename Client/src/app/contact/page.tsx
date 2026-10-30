"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postContact, postWorldNote } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

const noteSchema = z.object({
  author: z.string().min(1).max(64),
  message: z.string().min(2).max(280),
  color: z.string().min(4),
});

type ContactForm = z.infer<typeof contactSchema>;
type NoteForm = z.infer<typeof noteSchema>;

export default function ContactPage() {
  const qc = useQueryClient();
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [noteStatus, setNoteStatus] = useState<string | null>(null);

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", budget: "", message: "" },
  });

  const noteForm = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: { author: "", message: "", color: "#4AF2C8" },
  });

  const contactMutation = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      setContactStatus("Message stored. We’ll reply soon.");
      contactForm.reset();
    },
    onError: () =>
      setContactStatus("Could not reach API — start Server and try again."),
  });

  const noteMutation = useMutation({
    mutationFn: (values: NoteForm) =>
      postWorldNote({
        author: values.author,
        message: values.message,
        color: values.color,
        x: (Math.random() - 0.5) * 3,
        y: 1.2 + Math.random() * 1.2,
        z: (Math.random() - 0.5) * 2.5,
      }),
    onSuccess: () => {
      setNoteStatus("Note queued — visible after admin approval.");
      noteForm.reset({ author: "", message: "", color: "#4AF2C8" });
      void qc.invalidateQueries({ queryKey: ["world-notes"] });
    },
    onError: () =>
      setNoteStatus("Could not reach API — start Server and try again."),
  });

  const fieldClass =
    "mt-1 w-full rounded border border-[#22263A] bg-[#0F1118] px-3 py-2.5 text-[15px] text-[#F3F4F7] outline-none focus:border-[#4AF2C8]";

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 pt-28 lg:grid-cols-2">
      <div>
        <p className="mono-label text-[14px] text-[#4AF2C8]">Contact</p>
        <h1 className="display-font mt-2 text-[40px] font-semibold md:text-[48px]">
          Start a brief
        </h1>
        <p className="mt-3 text-[16px] text-[#9AA3B5]">
          Tell us about the spatial experience you want to ship.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={contactForm.handleSubmit((v) => contactMutation.mutate(v))}
        >
          {(
            [
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["company", "Company", "text"],
              ["budget", "Budget", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <label key={key} className="block text-[14px] text-[#9AA3B5]">
              {label}
              <input
                type={type}
                className={fieldClass}
                {...contactForm.register(key)}
              />
            </label>
          ))}
          <label className="block text-[14px] text-[#9AA3B5]">
            Message
            <textarea
              rows={5}
              className={fieldClass}
              {...contactForm.register("message")}
            />
          </label>
          <button
            type="submit"
            disabled={contactMutation.isPending}
            className="rounded bg-[#4AF2C8] px-4 py-2.5 text-[15px] font-semibold text-[#050508] disabled:opacity-60"
          >
            {contactMutation.isPending ? "Sending…" : "Send message"}
          </button>
          {contactStatus ? (
            <p className="text-[14px] text-[#9AA3B5]">{contactStatus}</p>
          ) : null}
        </form>
      </div>

      <div>
        <p className="mono-label text-[14px] text-[#6B8CFF]">World note</p>
        <h2 className="display-font mt-2 text-[32px] font-semibold">
          Leave a note in space
        </h2>
        <p className="mt-3 text-[16px] text-[#9AA3B5]">
          Drops a floating mesh in the atrium after an admin approves it.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={noteForm.handleSubmit((v) => noteMutation.mutate(v))}
        >
          <label className="block text-[14px] text-[#9AA3B5]">
            Author
            <input className={fieldClass} {...noteForm.register("author")} />
          </label>
          <label className="block text-[14px] text-[#9AA3B5]">
            Note
            <textarea
              rows={4}
              className={fieldClass}
              {...noteForm.register("message")}
            />
          </label>
          <label className="block text-[14px] text-[#9AA3B5]">
            Color
            <input
              type="color"
              className="mt-1 h-10 w-full cursor-pointer rounded border border-[#22263A] bg-transparent"
              {...noteForm.register("color")}
            />
          </label>
          <button
            type="submit"
            disabled={noteMutation.isPending}
            className="rounded border border-[#6B8CFF] px-4 py-2.5 text-[15px] text-[#F3F4F7] hover:bg-[#6B8CFF]/15 disabled:opacity-60"
          >
            {noteMutation.isPending ? "Dropping…" : "Drop note"}
          </button>
          {noteStatus ? (
            <p className="text-[14px] text-[#9AA3B5]">{noteStatus}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
