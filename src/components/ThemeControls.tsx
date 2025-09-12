import React from 'react';
import './ThemeControls.css';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeControlsProps {
    isOpen: boolean;
    onClose: () => void;
}

const ThemeControls: React.FC<ThemeControlsProps> = ({ isOpen, onClose }) => {
    const { hue, isDarkMode, setHue, setIsDarkMode } = useTheme();

    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHue = parseInt(e.target.value);
        setHue(newHue);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(true);
    };

    const toggleLightMode = () => {
        setIsDarkMode(false);
    };

    const copyThemeSettings = () => {
        const themeData = {
            hue,
            isDarkMode,
        };
        navigator.clipboard.writeText(JSON.stringify(themeData, null, 2));
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="theme-controls-overlay" onClick={onClose} />
            <div className="theme-controls">
                <div className="theme-controls-header">
                    <span className="material-symbols-outlined">palette</span>
                    <h3>Theme Controls</h3>
                    <button className="copy-button" title="Copy theme" onClick={copyThemeSettings}>
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                </div>

                <div className="theme-control-section">
                    <label htmlFor="hue-slider">Hue</label>
                    <div className="hue-control">
                        <input
                            id="hue-slider"
                            type="range"
                            min="0"
                            max="360"
                            value={hue}
                            onChange={handleHueChange}
                            className="hue-slider"
                        />
                        <div className="hue-rainbow"></div>
                    </div>
                </div>

                <div className="mode-toggle">
                    <button
                        className={`mode-button ${isDarkMode ? 'active' : ''}`}
                        onClick={toggleDarkMode}
                        title="Dark mode"
                    >
                        <span className="material-symbols-outlined">dark_mode</span>
                    </button>
                    <button
                        className={`mode-button ${!isDarkMode ? 'active' : ''}`}
                        onClick={toggleLightMode}
                        title="White mode"
                    >
                        <span className="material-symbols-outlined">light_mode</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ThemeControls;