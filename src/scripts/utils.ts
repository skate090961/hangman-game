type Modes = 'dark' | 'light';

export const darkModeHandle = () => {
    const darkModeSwitcher = document.getElementById('toggleDarkMode') as HTMLInputElement;
    const htmlElement = document.documentElement;
    const modeKey = 'mode';
    const modes = {
        DARK: 'dark',
        LIGHT: 'light'
    } as const;

    const setInitialMode = () => {
        const mode = localStorage.getItem(modeKey);
        if (mode === modes.DARK) {
            htmlElement.classList.add(modes.DARK);
            darkModeSwitcher.checked = true;
        }
    };

    const updateModeInLS = (mode: Modes) => {
        localStorage.setItem(modeKey, mode);
    };

    const toggleDarkMode = () => {
        const isDarkMode = htmlElement.classList.toggle(modes.DARK);
        updateModeInLS(isDarkMode ? modes.DARK : modes.LIGHT);
    };

    setInitialMode();
    darkModeSwitcher.addEventListener('input', toggleDarkMode);
};