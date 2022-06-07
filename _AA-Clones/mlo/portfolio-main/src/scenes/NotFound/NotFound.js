import ToggleThemeButton from '../../components/ToggleTheme';
import NotFoundSty from './NotFoundSty';

function NotFound() {
    return (
        <NotFoundSty>
            <h1>NOT FOUND</h1>
            <ToggleThemeButton />
        </NotFoundSty>
    );
}

export default NotFound;
