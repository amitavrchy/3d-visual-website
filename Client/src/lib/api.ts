import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("lumen_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  year: number | null;
  clientName: string | null;
  roles: string[];
  tech: string[];
  sceneConfig: {
    camera?: {
      position?: [number, number, number];
      target?: [number, number, number];
      fov?: number;
    };
    modelUrl?: string | null;
    theme?: { primary?: string; secondary?: string; accent?: string };
    hotspotOffsets?: { id: string; position: [number, number, number] }[];
    diorama?: "signal" | "orbit" | "threshold" | string;
  };
  gallery: string[];
  featured: boolean;
  sortOrder: number;
  published: boolean;
  createdAt: string;
};

export type WorldNote = {
  id: string;
  author: string;
  message: string;
  color: string;
  x: number;
  y: number;
  z: number;
  approved: boolean;
  createdAt: string;
};

export type Experiment = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  configJson: Record<string, unknown>;
  published: boolean;
};

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};

export async function fetchProjects() {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}

export async function fetchProject(slug: string) {
  const { data } = await api.get<Project>(`/projects/${slug}`);
  return data;
}

export async function fetchWorldNotes() {
  const { data } = await api.get<WorldNote[]>("/world-notes");
  return data;
}

export async function postWorldNote(
  payload: Omit<WorldNote, "id" | "approved" | "createdAt">,
) {
  const { data } = await api.post<WorldNote>("/world-notes", payload);
  return data;
}

export async function postContact(payload: ContactPayload) {
  const { data } = await api.post("/contact", payload);
  return data;
}

export async function fetchExperiments() {
  const { data } = await api.get<Experiment[]>("/experiments");
  return data;
}

export async function login(email: string, password: string) {
  const { data } = await api.post<{
    accessToken: string;
    user: { id: string; email: string; name: string; role: string };
  }>("/auth/login", { email, password });
  return data;
}
