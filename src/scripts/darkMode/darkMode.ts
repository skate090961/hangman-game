enum Modes {
  DARK = 'dark',
  LIGHT = 'light',
}

export const darkModeHandle = () => {
  const darkModeSwitcher = document.getElementById(
    'toggleDarkMode'
  ) as HTMLInputElement;
  const htmlElement = document.documentElement;
  const MODE_KEY = 'mode';

  const setInitialMode = () => {
    const mode = localStorage.getItem(MODE_KEY);
    if (mode === Modes.DARK) {
      htmlElement.classList.add(Modes.DARK);
      darkModeSwitcher.checked = true;
    }
  };

  const updateModeInLS = (mode: Modes) => {
    localStorage.setItem(MODE_KEY, mode);
  };

  const toggleDarkMode = () => {
    const isDarkMode = htmlElement.classList.toggle(Modes.DARK);
    updateModeInLS(isDarkMode ? Modes.DARK : Modes.LIGHT);
  };

  setInitialMode();
  darkModeSwitcher.addEventListener('input', toggleDarkMode);
};