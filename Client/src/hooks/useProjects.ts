"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProject, fetchProjects, type Project } from "@/lib/api";
import { FALLBACK_PROJECTS } from "@/lib/fallback-data";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      try {
        return await fetchProjects();
      } catch {
        return FALLBACK_PROJECTS;
      }
    },
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: async (): Promise<Project> => {
      try {
        return await fetchProject(slug);
      } catch {
        const fallback = FALLBACK_PROJECTS.find((p) => p.slug === slug);
        if (!fallback) throw new Error("Project not found");
        return fallback;
      }
    },
    enabled: Boolean(slug),
  });
}
