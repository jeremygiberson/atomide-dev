import { create } from 'zustand';

export interface File {
  id: string;
  name: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  files: File[];
}

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setLoading: (loading: boolean) => void;
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setLoading: (loading) => set({ isLoading: loading }),
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      set({ projects: data as Project[] });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProject: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/projects/${id}`);
      const data = await response.json();
      set({ currentProject: data as Project });
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
