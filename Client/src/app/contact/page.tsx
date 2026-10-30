"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postContact, postWorldNote } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more (10+ chars)"),
});

const noteSchema = z.object({
  author: z.string().min(1).max(64),
  message: z.string().min(2).max(280),
  color: z.string().min(4),
});

type ContactForm = z.infer<typeof contactSchema>;
type NoteForm = z.infer<typeof noteSchema>;

const fieldClass =
  "mt-1.5 w-full border border-[#22263A] bg-[#0A0B10] px-3 py-3 text-[15px] text-[#F3F4F7] outline-none transition focus:border-[#4AF2C8]";

export default function ContactPage() {
  const qc = useQueryClient();
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [noteStatus, setNoteStatus] = useState<string | null>(null);

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    },
  });

  const noteForm = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
    defaultValues: { author: "", message: "", color: "#4AF2C8" },
  });

  const contactMutation = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
      setContactStatus("Received — we’ll reply within 2 business days.");
      contactForm.reset();
    },
    onError: () =>
      setContactStatus("API unreachable. Start the Server folder and retry."),
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
      setNoteStatus("Queued. It appears in the atrium after admin approval.");
      noteForm.reset({ author: "", message: "", color: "#4AF2C8" });
      void qc.invalidateQueries({ queryKey: ["world-notes"] });
    },
    onError: () =>
      setNoteStatus("API unreachable. Start the Server folder and retry."),
  });

  return (
    <section className="pb-28 pt-28">
      <div className="mx-auto max-w-5xl px-6">
        <p className="mono-label text-[14px] text-[#4AF2C8]">Brief</p>
        <h1 className="display-font mt-3 max-w-2xl text-[42px] font-semibold leading-[1.02] md:text-[56px]">
          Tell us what you want people to walk into
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#9AA3B5]">
          Product launches, spatial brand lobbies, configurators, or hybrid case
          studies. Send a brief — or leave a note floating in the atrium.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-14 px-6 lg:grid-cols-2">
        <form
          className="space-y-4"
          onSubmit={contactForm.handleSubmit((v) => contactMutation.mutate(v))}
          noValidate
        >
          <h2 className="display-font text-[24px] font-semibold">Project brief</h2>
          {(
            [
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["company", "Company", "text"],
              ["budget", "Budget range", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <label key={key} className="block text-[14px] text-[#9AA3B5]">
              {label}
              <input
                type={type}
                className={fieldClass}
                {...contactForm.register(key)}
              />
              {contactForm.formState.errors[key] ? (
                <span className="mt-1 block text-[14px] text-[#FF5C7A]">
                  {contactForm.formState.errors[key]?.message}
                </span>
              ) : null}
            </label>
          ))}
          <label className="block text-[14px] text-[#9AA3B5]">
            What are we building?
            <textarea
              rows={5}
              className={fieldClass}
              placeholder="Audience, launch date, must-have interactions…"
              {...contactForm.register("message")}
            />
            {contactForm.formState.errors.message ? (
              <span className="mt-1 block text-[14px] text-[#FF5C7A]">
                {contactForm.formState.errors.message.message}
              </span>
            ) : null}
          </label>
          <button
            type="submit"
            disabled={contactMutation.isPending}
            className="rounded bg-[#4AF2C8] px-5 py-3 text-[15px] font-semibold text-[#050508] disabled:opacity-60"
          >
            {contactMutation.isPending ? "Sending…" : "Send brief"}
          </button>
          {contactStatus ? (
            <p className="text-[14px] text-[#9AA3B5]">{contactStatus}</p>
          ) : null}
        </form>

        <form
          className="space-y-4 border-t border-[#22263A] pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          onSubmit={noteForm.handleSubmit((v) => noteMutation.mutate(v))}
        >
          <h2 className="display-font text-[24px] font-semibold">
            Leave a world note
          </h2>
          <p className="text-[15px] leading-relaxed text-[#9AA3B5]">
            Drops a floating message mesh in the atrium. Public until an admin
            approves it — useful for demos and soft feedback.
          </p>
          <label className="block text-[14px] text-[#9AA3B5]">
            Your name
            <input className={fieldClass} {...noteForm.register("author")} />
          </label>
          <label className="block text-[14px] text-[#9AA3B5]">
            Note
            <textarea
              rows={4}
              className={fieldClass}
              maxLength={280}
              {...noteForm.register("message")}
            />
          </label>
          <label className="block text-[14px] text-[#9AA3B5]">
            Accent color
            <input
              type="color"
              className="mt-1.5 h-11 w-full cursor-pointer border border-[#22263A] bg-transparent"
              {...noteForm.register("color")}
            />
          </label>
          <button
            type="submit"
            disabled={noteMutation.isPending}
            className="rounded border border-[#6B8CFF] px-5 py-3 text-[15px] text-[#F3F4F7] transition hover:bg-[#6B8CFF]/15 disabled:opacity-60"
          >
            {noteMutation.isPending ? "Dropping…" : "Drop into atrium"}
          </button>
          {noteStatus ? (
            <p className="text-[14px] text-[#9AA3B5]">{noteStatus}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
