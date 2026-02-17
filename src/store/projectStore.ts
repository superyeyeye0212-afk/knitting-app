import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Project {
  id: string;
  name: string;
  currentRow: number;
  targetRow?: number;
  memo?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectStore {
  projects: Project[];
  addProject: (data: { name: string; targetRow?: number }) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  incrementRow: (id: string) => boolean;
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

      incrementRow: (id) => {
        let justCompleted = false;
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== id) return p;
            const newRow = p.currentRow + 1;
            const completed = !p.completedAt && p.targetRow != null && newRow >= p.targetRow;
            if (completed) justCompleted = true;
            return {
              ...p,
              currentRow: newRow,
              updatedAt: new Date().toISOString(),
              ...(completed ? { completedAt: new Date().toISOString() } : {}),
            };
          }),
        }));
        return justCompleted;
      },

      decrementRow: (id) =>
        set((state) => ({
          projects: state.projects.map((p) => {
            if (p.id !== id) return p;
            const newRow = Math.max(0, p.currentRow - 1);
            const shouldClearCompleted = p.completedAt && p.targetRow != null && newRow < p.targetRow;
            return {
              ...p,
              currentRow: newRow,
              updatedAt: new Date().toISOString(),
              ...(shouldClearCompleted ? { completedAt: undefined } : {}),
            };
          }),
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
