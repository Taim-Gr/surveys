import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      login: async (credentials) => {
        set({ loading: true, error: null });
        
        try {
          const response = await fetch(
            "https://poll-rs4it-test.rs-developing.com/auth/login/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();
          
          set({
            accessToken: data.access,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
          error: null,
        });
      },

      setUser: (userData) => {
        set({ user: userData });
      },

      clearError: () => {
        set({ error: null });
      },

      getAuthHeaders: () => {
        const { accessToken } = get();
        return {
          'Content-Type': 'application/json',
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        };
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
