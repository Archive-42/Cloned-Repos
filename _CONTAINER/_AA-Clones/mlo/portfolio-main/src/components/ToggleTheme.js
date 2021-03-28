import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

function ToggleTheme() {
    const { mode, setMode } = useContext(ThemeContext);
    const toggleTheme = () => {
        mode === 'light' ? setMode('dark') : setMode('light');
    };
    return (
        <p onClick={toggleTheme}>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </p>
    );
}

export default ToggleTheme;
