import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
  currentRow: number;
  targetRow?: number;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (data: { name: string; targetRow?: number }) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  incrementRow: (id: string) => void;
  decrementRow: (id: string) => void;
  resetRow: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],

      addProject: (data) =>
        set((state) => ({
          projects: [
            {
              id: crypto.randomUUID(),
              name: data.name,
              currentRow: 0,
              targetRow: data.targetRow,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.projects,
          ],
        })),

      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, ...data, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      incrementRow: (id) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, currentRow: p.currentRow + 1, updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      decrementRow: (id) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, currentRow: Math.max(0, p.currentRow - 1), updatedAt: new Date().toISOString() }
              : p
          ),
        })),

      resetRow: (id) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, currentRow: 0, updatedAt: new Date().toISOString() }
              : p
          ),
        })),
    }),
    {
      name: "knitting-projects",
    }
  )
);
