import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set, get) => ({
            theme: 'dark',

            toggleTheme: () =>
                set((state) => {
                    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
                    // Immediately apply class to <html> globally
                    if (nextTheme === 'light') {
                        document.documentElement.classList.add('light');
                        document.documentElement.classList.remove('dark');
                    } else {
                        document.documentElement.classList.remove('light');
                        document.documentElement.classList.add('dark');
                    }
                    return { theme: nextTheme };
                }),

            initTheme: () => {
                // Called on app boot — reads persisted Zustand state and applies class
                const theme = get().theme;
                if (theme === 'light') {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                }
            },
        }),
        {
            name: 'cv-theme-store',
        }
    )
);

export default useThemeStore;
