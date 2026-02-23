import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: {
    type: "total_rows" | "project_count";
    value: number;
  };
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AchievementProgress {
  totalRows: number;
  projectCount: number;
}

// English translations for achievements (not persisted)
export const achievementTranslationsEn: Record<string, { titleEn: string; descriptionEn: string }> = {
  "1": { titleEn: "Knitting Debut", descriptionEn: "Created your first project" },
  "2": { titleEn: "10 Rows Done", descriptionEn: "Knit a total of 10 rows" },
  "3": { titleEn: "50 Rows Done", descriptionEn: "Knit a total of 50 rows" },
  "4": { titleEn: "100 Rows Done", descriptionEn: "Knit a total of 100 rows" },
  "5": { titleEn: "500 Rows Done", descriptionEn: "Knit a total of 500 rows" },
  "6": { titleEn: "1000 Rows Done", descriptionEn: "Knit a total of 1000 rows! Amazing!" },
  "7": { titleEn: "3 Projects Complete", descriptionEn: "Completed 3 projects" },
  "8": { titleEn: "5 Projects Complete", descriptionEn: "Completed 5 projects" },
  "9": { titleEn: "10 Projects Complete", descriptionEn: "Completed 10 projects!" },
  "10": { titleEn: "Knitting Master", descriptionEn: "A legendary knitter with 2000 total rows" },
};

const initialAchievements: Achievement[] = [
  {
    id: "1",
    title: "編み物デビュー",
    description: "初めてのプロジェクトを作成",
    icon: "🎉",
    condition: { type: "project_count", value: 1 },
    unlocked: false,
  },
  {
    id: "2",
    title: "10段達成",
    description: "累計10段を編む",
    icon: "🌱",
    condition: { type: "total_rows", value: 10 },
    unlocked: false,
  },
  {
    id: "3",
    title: "50段達成",
    description: "累計50段を編む",
    icon: "🌿",
    condition: { type: "total_rows", value: 50 },
    unlocked: false,
  },
  {
    id: "4",
    title: "100段達成",
    description: "累計100段を編む",
    icon: "🎋",
    condition: { type: "total_rows", value: 100 },
    unlocked: false,
  },
  {
    id: "5",
    title: "500段達成",
    description: "累計500段を編む",
    icon: "🌳",
    condition: { type: "total_rows", value: 500 },
    unlocked: false,
  },
  {
    id: "6",
    title: "1000段達成",
    description: "累計1000段を編む！すごい！",
    icon: "🏆",
    condition: { type: "total_rows", value: 1000 },
    unlocked: false,
  },
  {
    id: "7",
    title: "3プロジェクト完成",
    description: "3つのプロジェクトを完成させる",
    icon: "⭐",
    condition: { type: "project_count", value: 3 },
    unlocked: false,
  },
  {
    id: "8",
    title: "5プロジェクト完成",
    description: "5つのプロジェクトを完成させる",
    icon: "✨",
    condition: { type: "project_count", value: 5 },
    unlocked: false,
  },
  {
    id: "9",
    title: "10プロジェクト完成",
    description: "10個のプロジェクトを完成！",
    icon: "🎊",
    condition: { type: "project_count", value: 10 },
    unlocked: false,
  },
  {
    id: "10",
    title: "編み物マスター",
    description: "累計2000段を編む伝説の編み手",
    icon: "👑",
    condition: { type: "total_rows", value: 2000 },
    unlocked: false,
  },
];

interface AchievementStore {
  achievements: Achievement[];
  progress: AchievementProgress;
  checkAchievements: () => Achievement[];
  incrementTotalRows: (rows: number) => Achievement[];
  incrementProjectCount: () => Achievement[];
}

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,
      progress: {
        totalRows: 0,
        projectCount: 0,
      },

      checkAchievements: () => {
        const { achievements, progress } = get();
        const newlyUnlocked: Achievement[] = [];

        const updated = achievements.map((a) => {
          if (a.unlocked) return a;

          const { type, value } = a.condition;
          let isUnlocked = false;

          if (type === "total_rows" && progress.totalRows >= value) {
            isUnlocked = true;
          } else if (type === "project_count" && progress.projectCount >= value) {
            isUnlocked = true;
          }

          if (isUnlocked) {
            const unlocked = { ...a, unlocked: true, unlockedAt: new Date().toISOString() };
            newlyUnlocked.push(unlocked);
            return unlocked;
          }

          return a;
        });

        if (newlyUnlocked.length > 0) {
          set({ achievements: updated });
        }
        return newlyUnlocked;
      },

      incrementTotalRows: (rows: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalRows: state.progress.totalRows + rows,
          },
        }));
        return get().checkAchievements();
      },

      incrementProjectCount: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            projectCount: state.progress.projectCount + 1,
          },
        }));
        return get().checkAchievements();
      },
    }),
    {
      name: "achievement-storage",
    }
  )
);
