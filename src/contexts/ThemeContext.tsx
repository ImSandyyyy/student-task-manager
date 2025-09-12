import React, { createContext, useContext, useState, useEffect } from 'react';

export const setThemeMode = (mode: "white" | "dark") => {
    const root = document.documentElement;

    if (mode == "white") {
        root.style.setProperty('--md-sys-color-background', '#f7f9ff');
        root.style.setProperty('--md-sys-color-surface', '#ebeef3');
        root.style.setProperty('--md-sys-color-text', '#000000');
        root.style.setProperty('--option-cover-color', '#dbe3ed');
        root.style.setProperty('--small-text-color', '#000000');
        root.style.setProperty('--selected', '#dbe3ed');
        root.style.setProperty('--hover-color', `var(--md-sys-color-primary)`);
        root.style.setProperty(`--link-color`, `#ffffff`);
        root.style.setProperty('--note-border-color-hover', `var(--md-sys-color-text)`);
        root.style.setProperty('--link-decoration', `underline`);
    } else {
        root.style.setProperty('--md-sys-color-background', '#10131b');
        root.style.setProperty('--md-sys-color-surface', '#1c1f28');
        root.style.setProperty('--md-sys-color-text', '#ffffff');
        root.style.setProperty('--option-cover-color', '#414755');
        root.style.setProperty('--small-text-color', '#e0e2ed');
        root.style.setProperty('--selected', '#33353a');
        root.style.setProperty('--hover-color', `#2c2f38`);
        root.style.setProperty(`--link-color`, `var(--md-sys-color-primary)`);
        root.style.setProperty('--note-border-color-hover', `var(--md-sys-color-primary)`);
        root.style.setProperty('--link-decoration', `none`);
    }
}

interface ThemeContextType {
    hue: number;
    isDarkMode: boolean;
    setHue: (hue: number) => void;
    setIsDarkMode: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [hue, setHue] = useState(() => {
        const saved = localStorage.getItem('theme-hue');
        return saved ? parseInt(saved) : 223; // Default to current blue hue
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        const saturation = isDarkMode ? '85%' : '80%';
        const lightness = isDarkMode ? '60%' : '50%';
        const primaryColor = `hsl(${hue}, ${saturation}, ${lightness})`;

        document.documentElement.style.setProperty('--md-sys-color-primary', primaryColor);

        setThemeMode(isDarkMode ? 'dark' : 'white');

        localStorage.setItem('theme-hue', hue.toString());
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'white');
    }, [hue, isDarkMode]);

    const value = {
        hue,
        isDarkMode,
        setHue,
        setIsDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};