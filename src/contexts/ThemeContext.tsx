import React, { createContext, useContext, useState, useEffect } from 'react';

export const setThemeMode = (mode: "white" | "dark") => {
    const root = document.documentElement;

    if (mode == "white") {
        // Enhanced white/light theme with better contrast and interactivity
        root.style.setProperty('--md-sys-color-background', '#ffffff');
        root.style.setProperty('--md-sys-color-surface', '#f8f9fa');
        root.style.setProperty('--md-sys-color-text', '#1a1a1a');
        root.style.setProperty('--option-cover-color', '#e9ecef');
        root.style.setProperty('--small-text-color', '#495057');
        root.style.setProperty('--selected', '#dee2e6');
        root.style.setProperty('--hover-color', 'rgba(var(--primary-rgb), 0.08)');
        root.style.setProperty('--link-color', 'var(--md-sys-color-primary)');
        root.style.setProperty('--note-border-color-hover', 'var(--md-sys-color-primary)');
        root.style.setProperty('--link-decoration', 'none');
        
        // Interactive elements for light theme
        root.style.setProperty('--button-hover-bg', 'rgba(var(--primary-rgb), 0.12)');
        root.style.setProperty('--card-shadow', 'var(--card-shadow-light)');
        root.style.setProperty('--card-hover-shadow', 'var(--card-hover-shadow-light)');
        root.style.setProperty('--input-border', '#ced4da');
        root.style.setProperty('--input-focus-border', 'var(--md-sys-color-primary)');
        root.style.setProperty('--overlay-bg', 'rgba(0, 0, 0, 0.5)');
        root.style.setProperty('--container-shadow', '0 2px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)');
        root.style.setProperty('--subtle-border', '1px solid #e9ecef');
    } else {
        // Enhanced dark theme
        root.style.setProperty('--md-sys-color-background', '#0f1419');
        root.style.setProperty('--md-sys-color-surface', '#1a202c');
        root.style.setProperty('--md-sys-color-text', '#f7fafc');
        root.style.setProperty('--option-cover-color', '#2d3748');
        root.style.setProperty('--small-text-color', '#a0aec0');
        root.style.setProperty('--selected', '#2d3748');
        root.style.setProperty('--hover-color', 'rgba(var(--primary-rgb), 0.12)');
        root.style.setProperty('--link-color', 'var(--md-sys-color-primary)');
        root.style.setProperty('--note-border-color-hover', 'var(--md-sys-color-primary)');
        root.style.setProperty('--link-decoration', 'none');
        
        // Interactive elements for dark theme
        root.style.setProperty('--button-hover-bg', 'rgba(var(--primary-rgb), 0.16)');
        root.style.setProperty('--card-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--card-hover-shadow', '0 8px 24px rgba(0, 0, 0, 0.4)');
        root.style.setProperty('--input-border', '#4a5568');
        root.style.setProperty('--input-focus-border', 'var(--md-sys-color-primary)');
        root.style.setProperty('--overlay-bg', 'rgba(0, 0, 0, 0.7)');
        root.style.setProperty('--container-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--subtle-border', '1px solid #2d3748');
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
        const saturation = isDarkMode ? '85%' : '75%';
        const lightness = isDarkMode ? '60%' : '45%';
        const primaryColor = `hsl(${hue}, ${saturation}, ${lightness})`;

        // Convert HSL to RGB for opacity-based interactions
        const tempDiv = document.createElement('div');
        tempDiv.style.color = primaryColor;
        document.body.appendChild(tempDiv);
        const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
        document.body.removeChild(tempDiv);
        
        if (rgb) {
            document.documentElement.style.setProperty('--primary-rgb', `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`);
        }

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